import { Router } from "express";
import { analysisValidation, createValidation, returnValidation} from "../Middleware/borrowValidation";
import { analysis, createBorrow,returnItem } from "../Controller/borrowAndReturn";
import { verifyToken } from "../Middleware/auth";

const router = Router()

router.post(`/borrow`, [createValidation], createBorrow)
router.post(`/return`, [returnValidation], returnItem)
router.post(`/analysis`, [verifyToken], analysis)


export default router