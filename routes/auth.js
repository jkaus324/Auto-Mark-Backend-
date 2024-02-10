import express from "express";
import { login, main, register } from "../controllers/auth.js";

const router = express.Router();

router.post('/signin',login);
router.post('/signup',register);

router.get('/main', main)

export default router;
