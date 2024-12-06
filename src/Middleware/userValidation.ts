import { role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { it } from "node:test";

const createScheme = Joi.object({
    role: Joi.string().required(),
    username: Joi.string().required(),
    userpass: Joi.string().required()
})

const createValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = createScheme.validate(req.body)
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(item => item.message).join()
        })
    }
    next()
}

const updateScheme = Joi.object({

    username: Joi.string().optional(),
    userpass: Joi.string().optional()
    
})

const updateValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = updateScheme.validate(req.body)

    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(item => item.message).join(
                
            )
        })
    } next()
}

const loginScheme = Joi.object({
    role: Joi.string().valid(role.admin).required(),
    username: Joi.string().required(),
    userpass: Joi.string().required()
})

const loginValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = loginScheme.validate(req.body)

    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(item => item.message).join()
        })
    } next()
}

export { createValidation, updateValidation, loginValidation }