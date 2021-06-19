import express from 'express';

const router = express.Router();
import {calculateTime} from '../controllers/order.js';


router.post('/:code/:type', calculateTime);

export default router;

