import { Router } from "express";
import { createUser, readUser, updateUser, delUser, login } from "../Controller/userController";
import { createValidation, updateValidation, loginValidation } from "../Middleware/userValidation";
import { verifyToken } from "../Middleware/auth";

const router = Router()

router.post(`/`, [createValidation], createUser)

router.get(`/`,[verifyToken], readUser)

router.put(`/:id`, [verifyToken,updateValidation], updateUser)

router.delete(`/:id`, [verifyToken], delUser)

router.post(`/login`, [loginValidation], login)

export default router
