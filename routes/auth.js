import express from "express";
import { main, signin, signup } from "../controllers/auth.js";

const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);

router.get('/main', main)

export default router;
