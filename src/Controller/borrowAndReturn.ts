import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { date } from "joi";
import { stat } from "fs";
const prisma = new PrismaClient


const createBorrow = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, itemId } = req.body
        const borrowDate : Date = new Date(req.body.borrowDate)
        const returnDate : Date = new Date(req.body.returnDate)

        const findUser = await prisma.user.findFirst({
            where: { Id: userId }
        })

        if(!findUser) {
            res.status(404).json({ 
                message: "User not found" 
            })
            return
        }

        const findItem = await prisma.item.findFirst({
            where: { Id: itemId }
        })

        if(!findItem) {
            res.status(404).json({
                message: "Item not found"
            })
            return
        }

        const borrow = await prisma.borrowRecord.create({
            data: {
                userId: userId,
                itemId: itemId,
                borrowDate,
                returnDate
            }
        })

        res.status(201).json({
            status: `succes`,
            message: `Loan has been created`,
            data: borrow
        })
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const returnItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const borrowId = req.body.borrowId

        const findBorrow = await prisma.borrowRecord.findFirst({
            where: {borrowId: Number(borrowId) }
        })

        if(!findBorrow) {
            res.status(404).json({
                message: `Record loan not found`
            })
            return
        }

        const returnDate : Date = new Date(req.body.returnDate)

        const createReturnRecord = await prisma.returnRecord.create({
            data: {
                borrowId: Number(borrowId),
                actualReturnDate: returnDate,
                userId: findBorrow.userId,
                itemId: findBorrow.itemId
            }
        })

        res.status(200).json({
            status: `success`,
            message: `Return has successful`,
            data: createReturnRecord
        })
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const analysis = async (req: Request, res: Response): Promise<void> => {
    try {
        const {startDate, endDate, groupBy} = req.body

        const borrowData = await prisma.borrowRecord.findMany({ 
            where: {
                borrowDate: { 
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            },
            include: {
                ItemId: true
            }
        })

        const returnData = await prisma.returnRecord.findMany({
            where: {
                actualReturnDate: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)

                    
                }

                
            }
        })

        const groupedData = borrowData.reduce((acc: Record<string, any>, borrow) => {
            const group = borrow.ItemId[groupBy as keyof typeof borrow.ItemId] as string
        if (!acc[group]) {


            acc[group] = {
                group,
                totalBorrow: 0,
                TotalReturn: 0,
                itemsInUse: 0

                

            }
        }
        acc[group].totalBorrow ++
        if (returnData.find((ret) => ret.borrowId === borrow.borrowId)) {
                acc[group].TotalReturn++
        }
        else {
            acc[group].itemInUse
        }

        return acc
    }, {})

    const usageAnalysis = Object.values(groupedData)

    res.status(200).json({
        status: `success`,
        data: {
            analysisPeriod: {
                startDate,
                endDate
            },
            analysisPeroid: usageAnalysis
        }
    })

    } catch (error) {
        res.status(500).json(error)
    }
}



export { createBorrow, returnItem, analysis };