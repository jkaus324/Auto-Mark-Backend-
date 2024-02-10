import express from "express";
import { createClassroom, joinClassroom, room } from "../controllers/classroom.js";

const router = express.Router();

router.post('/join',joinClassroom);
router.post('/create',createClassroom);
router.post('/:room/classroom/get',getroom);
router.post('/:room/classroom/set',setroom);
// get classroom details
// set attendance
export default router;