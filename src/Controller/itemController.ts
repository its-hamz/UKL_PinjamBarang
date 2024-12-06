import { Request, Response, NextFunction } from 'express';
import { PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: `minimal` })

const createItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string = req.body.name
        const category: string = req.body.category
        const location: string = req.body.location
        const qty: number = Number(req.body.qty)

        const newItem = await prisma.item.create({
            data: {
                name: name,
                category: category,
                location: location,
                qty: qty
            },
        });

        res.status(201).json({
            Status: `success`,
            message: 'New item has been created',
            data: newItem,
        });
    } catch (error) {
        res.status(500).json(error)
    }
};

const readItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const search = req.query.search;
        const allItem = await prisma.item.findMany({
            where: {
                OR: [
                    { name: { contains: search?.toString() || '' } },
                ],
            },
        });
        Status: `success`
        res.status(200).json({
            Status: Status.success,
            message: 'All item have been retrieved',
            data: allItem,
        });
    } catch (error) {
        next(error);
    }
};
const updateItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const Id = req.params.id

        const findItem = await prisma.item.findFirst({
            where: { Id: Number(Id) }
        })

        if (!findItem) {
            res.status(200).json({
                message: `Item not found`
            })
        }

        const { name, category, location, qty } = req.body

        const saveItem = await prisma.item.update({
            where: { Id: Number(Id) },
            data: {
                name: name ?? findItem?.name,
                qty: qty ? Number(qty) : findItem?.qty,
                location: location ? location : findItem?.location,
                category: category ? category : findItem?.category
            }
        })

        res.status(200)
            .json({
                Status: `success`,
                massage: `item has been updated`,
                data: saveItem
            })

    } catch (error) {
        console.log(error);

        res.status(500)
            .json(error)
    }
}

const delItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const Id = req.params.id
        const findItem = await prisma.item.findFirst({
            where: { Id: Number(Id) }
        })

        if (!findItem) {
            res.status(404)
                .json({
                    massage: `Item not found`
                })
            }
            const saveItem = await prisma.item.delete({
                where: { Id: Number(Id) }
            })
            res.status(200)
                .json({
                    Status: `success`,
                    massge: `Item has been deleted`
                })

        }catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
        
    }

export { createItem, readItem, updateItem, delItem };