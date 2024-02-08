import express from "express";
import { createClassroom, joinClassroom } from "../controllers/classroom.js";

const router = express.Router();

router.post('/join',joinClassroom);
router.post('/create',createClassroom);

export default router;