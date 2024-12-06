import { NextFunction, Request, Response } from "express";
import { PrismaClient, role, Status } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, userpass, role} = req.body
        const findUser = await prisma.user.findFirst({ where: { username } })

        if (findUser) {
            res.status(400).json({
                Status: `failed`,
                message: `email alreadt exist`
            })
        }

        const hashPassword = await bcrypt.hash(userpass, 10)
        const newuser = await prisma.user.create({
            data: {

                username,
                userpass: hashPassword,
                role: role
            }
        })
        res.status(200).json({
            message: `User has been Created`,
            Status: `success`,
            data: newuser

        })

    } catch (error) {
        console.log(error);
        
        res.status(500).json(error)
    }

}

const readUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const search = req.query.search
        const user = await prisma.user.findMany({
            where: {
                OR: [{
                    username: {
                        contains: search?.toString() || ``
                    }
                }]
            }
        })

        res.status(200).json({
            message: `admin has been retrivied`,
            status: Status.success,
            data: user

        })

    } catch (error) {
        Status: `failed`
        res.status(500).json(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id
        const findUser = await prisma.user.findUnique({
            where: { Id: Number(id) }
        })
        const { username, userpass } = req.body

        const user = await prisma.user.update({
            where: { Id: Number(id) },
            data: {
                username: username || findUser?.username,
                userpass: userpass || findUser?.userpass
            }
        })

        res.status(200).json({
            message: `user has been updated`,
            Status: Status.success,
            data: user,
            
        })


    } catch (error) {
        res.status(500).json(error)
    }
}

const delUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const id = req.params.id
        await prisma.user.delete({
            where: { Id: Number(id) }
        })
        res.status(200).json({
            message: `user has been deleted`
        })

    } catch (error) {
        res.status(500).json(error)
    }
}

const login = async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, userpass, role } = req.body;
      const findUser = await prisma.user.findFirst({ where: { username } });
      if (!findUser) {
        return res.status(200).json({ message: "Username not registered" });
      }
      const isMatchPassword = await bcrypt.compare(userpass, findUser.userpass);
      if (!isMatchPassword) {
        return res.status(200).json({ message: "Invalid Password" });
      }
  
      if (findUser.role !== "admin") {
        return res.status(200).json({ message: "Access restricted to admin only" });
      }
  
      const payload = {
        username: findUser.username,
      };
      const signature = process.env.SECRET || ``;
  
      const token = jwt.sign(payload, signature);
  
      return res.status(200).json({ status: `success`, logged: true, token, id: findUser.Id, username: findUser.username });
    } catch (error) {
      console.log(error);
  
      return res.status(500).json(error);
    }
  };

export {createUser, readUser, updateUser, delUser, login}