import express from 'express';
import { getAllOrder, getOrder,getRestaurantOrder } from '../controllers/OrderController';
import { jwtCheck, jwtParse } from '../middleware/auth';

const router=express.Router();


router.get('/:orderId',getOrder);
router.get('/restaurant/:restId',getRestaurantOrder);
router.get('/',jwtParse,jwtCheck,getAllOrder);

export default router;