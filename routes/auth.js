import express from "express";
import { login, main, register } from "../controllers/auth.js";

const router = express.Router();

router.post('/login',login);
router.post('/register',register);

router.get('/main', main)

export default router;
