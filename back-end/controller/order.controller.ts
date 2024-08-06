import { Context } from 'koa';

import Order from '../database/models/order.model';
import Cart from '../database/models/cart.model';

import { raiseWarning, raiseSuccess } from '../utils/response.beautifier';


interface ShippingDetails {
    address: string,
    city: string,
    state?: string,
    zipCode?: string,
    country: string,
    phone: string
}

interface OrderRequestBody {
    cartId : string
    status : string
    shippingDetails : ShippingDetails 
}


// Create a new order
export const createOrder = async (ctx: Context) => {
    try {

        const userId = ctx.state.user.id;
        const { shippingDetails, cartId  }  = ctx.request.body as OrderRequestBody;
        
        // Retrieve the user's cart
        const cart = await Cart.findById(cartId);

        if (!cart || cart.products.length === 0) {
            ctx.status = 400;
            ctx.body = raiseWarning('Cart is empty');
            return;
        }

        // Create a new order
        const newOrder = new Order({
            userId,
            products: cart.products,
            totalPrice: cart.totalPrice,
            shipping_details : {
                address : shippingDetails.address,
                city : shippingDetails.city,
                country : shippingDetails.country,
                phone: shippingDetails.phone

            },
        });

        let newOrderPlaced = await newOrder.save();
        
        if ( newOrderPlaced ){
            // Clear the user's cart
            await Cart.findByIdAndDelete(cartId);
        }

        ctx.status = 201;
        ctx.body = raiseSuccess('Order placed successfully', { order: newOrder });

    } catch (error) {

        ctx.status = 500;
        ctx.body = raiseWarning('Internal server error');
        console.error(error);
        
    }
};

// Get all orders for a user
export const getOrders = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;
        const orders = await Order.find({ userId });

        if ( !orders ) {
            ctx.status = 404 ;
            ctx.body = raiseWarning('user has not satle any order yet');
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Orders retrieved successfully', { orders });

    } catch (error) {
        
        ctx.status = 500;
        ctx.body = raiseWarning('Internal server error');
        console.error(error);

    }
};

// Get details of a specific order
export const getOrderById = async (ctx: Context) => {
    try {

        const userId = ctx.state.user.id;
        const { id } = ctx.params;

        const order = await Order.findOne({ _id: id, userId });

        if (!order) {
            ctx.status = 404;
            ctx.body = raiseWarning('Order not found');
            return;
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Order retrieved successfully', { order });

    } catch (error) {

        ctx.status = 500;
        ctx.body = raiseWarning('Internal server error');
        console.error(error);

    }
};

// Update order status (Admin only)
export const updateOrderStatus = async (ctx: Context) => {
    try {
        const { id } = ctx.params;
        const { status } = ctx.request.body as OrderRequestBody;

        const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedOrder) {
            ctx.status = 404;
            ctx.body = raiseWarning('Order not found');
            return;
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Order status updated successfully', { order: updatedOrder });
    } catch (error) {
        ctx.status = 500;
        ctx.body = raiseWarning('Internal server error');
        console.error(error);
    }
};

// Delete an order (Admin only)
export const deleteOrder = async (ctx: Context) => {
    try {
        const { id } = ctx.params;

        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            ctx.status = 404;
            ctx.body = raiseWarning('Order not found');
            return;
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Order deleted successfully', deleteOrder);
    } catch (error) {
        ctx.status = 500;
        ctx.body = raiseWarning('Internal server error');
        console.error(error);
    }
};
