import express from 'express';
import auth from './auth.js';
import classroom from './classroom.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/classroom',classroom);

export default router;