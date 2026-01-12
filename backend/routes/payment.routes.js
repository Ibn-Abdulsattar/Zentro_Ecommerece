import express from 'express';
import wrapAsync from '../utils/wrapAsync.js';
import { createStripeCheckoutSession } from '../controllers/payment.controller.js';
import upload from '../middlewares/upload.js';
const router = express.Router();


router.post('/create-checkout-session', wrapAsync(createStripeCheckoutSession));
export default router;