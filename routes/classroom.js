import express from "express";
import { createClassroom, getroom, joinClassroom,  setroom } from "../controllers/classroom.js";

const router = express.Router();

router.post('/join',joinClassroom);
router.post('/create',createClassroom);
router.post('/details',details);
router.post('/:room/get',getroom);
router.post('/:room/set',setroom);
// get classroom details
// set attendance
export default router;