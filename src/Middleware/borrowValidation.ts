import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { start } from "repl";

const createSchema = Joi.object({
    userId: Joi.number().required(),
    itemId: Joi.number().required(),
    borrowDate: Joi.date().required(),
    returnDate: Joi.date().required()
});

const createValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = createSchema.validate(req.body, { abortEarly: false });
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "),
        });
        return
    }
    next();
}


const returnSchema = Joi.object({
    borrowId: Joi.number().min(1).required(),
    returnDate: Joi.date().required(),
});

const returnValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = returnSchema.validate(req.body, { abortEarly: false });
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "), 
        });
        return
    }
    next();
};

const analysisScheme = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    groupBy: Joi.string().valid("category", "location").required()
})

const analysisValidation = (req: Request, res: Response, next: NextFunction): void => {
    const validate = analysisScheme.validate(req.body, { abortEarly: false });
    if (validate.error) {
        res.status(400).json({
            message: validate.error.details.map(it => it.message).join(", "),

            
        })
        return
    }
    next()

}

export { createValidation, returnValidation, analysisValidation };