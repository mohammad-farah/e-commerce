import Router from 'koa-router';

import { 
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder 
} from '../controller/order.controller';

import { userAuthValidator } from '../middleware/user.middleware';
import { adminAuthValidator } from '../middleware/admin.middleware';

const orderRouter = new Router();

// Create a new order
orderRouter.post('/', userAuthValidator, createOrder );

// Get all orders for a user
orderRouter.get('/', userAuthValidator, getOrders);

// Get details of a specific order
orderRouter.get('/:id', userAuthValidator, getOrderById);

// Update order status (Admin only)
orderRouter.patch('/:id', userAuthValidator , adminAuthValidator ,updateOrderStatus);

// Delete an order (Admin only)
orderRouter.delete('/:id', userAuthValidator, adminAuthValidator , deleteOrder);

export default orderRouter;
