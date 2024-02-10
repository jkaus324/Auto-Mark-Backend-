import express from "express";
import { autoMark, createClassroom, details, getroom, joinClassroom,  setroom } from "../controllers/classroom.js";

const router = express.Router();

router.post('/join',joinClassroom);
router.post('/create',createClassroom);
router.get('/details',details);
router.get('/:room/get',getroom);
router.post('/:room/set',setroom);
router.get('/autoMark', autoMark);
// get classroom details
// set attendance
export default router;