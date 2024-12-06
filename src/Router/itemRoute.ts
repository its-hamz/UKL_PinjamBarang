import { Router } from "express";
import { createItem, readItem, updateItem, delItem } from "../Controller/itemController";
import { createValidation, updateValidation } from "../Middleware/itemValidation";
import { verifyToken } from "../Middleware/auth";

const router = Router();

router.post(`/`, [verifyToken, createValidation], createItem);

router.get(`/`, readItem);

router.put(`/:id`, [verifyToken, updateValidation], updateItem);

router.delete(`/:id`, [verifyToken], delItem);

export default router
