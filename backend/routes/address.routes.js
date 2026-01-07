import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { findExtremes } from '../controllers/address.controller.js';
const router = express.Router();


router.post('/findextremes', wrapAsync(findExtremes));

export default router;