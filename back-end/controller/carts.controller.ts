import { Context } from 'koa';
import { ObjectId } from 'mongoose';

import  Cart  from '../database/models/cart.model';
import  Product  from '../database/models/product.model';
import { raiseSuccess, raiseWarning } from '../utils/response.beautifier';


interface CartProductBody {
    productId : ObjectId,
    quantity : number 
}


export const addOrUpdateProductInCart = async (ctx: Context) => {
  try {
    const userId =  ctx.state.user.id; 

    const { productId, quantity } = ctx.request.body as CartProductBody;

    if (quantity <= 0) {
      ctx.status = 400;
      ctx.body = raiseWarning('Quantity must be greater than zero');
      return;
    }

    // check if the product is already exists
    const product = await Product.findById(productId);
    if (!product) {
      ctx.status = 404;
      ctx.body = raiseWarning('Product not found');
      return;
    }

    // check if the user has any cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart(
            { userId, products: [], totalPrice: 0 }
        );
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex(
      p => p.productId.toString() === productId.toString()
    );

    if (existingProductIndex > -1) {
      // update the quantity
      cart.products[existingProductIndex].quantity = quantity;
    } else {
      // Product does not exist, add it to the cart
      cart.products.push({ productId, quantity });
    }

    // caculate the total price 
    cart.totalPrice = await cart.products.reduce(async (totalPromise, item) => {

      const total = await totalPromise;
      const itemProduct = await Product.findById(item.productId);
      return total + (itemProduct ? itemProduct.price * item.quantity : 0);
    
    }, Promise.resolve(0));

    // Save the updated cart
    await cart.save();

    ctx.status = 200;
    ctx.body = raiseSuccess('Cart is updated successfully', { cart });


  } catch (error) {

    ctx.status = 500;
    ctx.body = raiseWarning('Internal Server Error');
    console.error(error);
  
    }
};


export const removeProductFromCart = async (ctx: Context) => {
    try {

      // handle the id from auth/user.middleware
      const userId = ctx.state.user.id;
      
      const { productId } = ctx.params;
  
      // check if cart exists
      const cart = await Cart.findOne( { userId }  );
      if (!cart) {
        ctx.status = 404;
        ctx.body = raiseWarning('Cart not found');
        return;
      }

      // Check if the product exists in the cart
      const existingProductIndex = cart.products.findIndex(
        p => p.productId.toString() === productId.toString()
      );
  
      if (existingProductIndex === -1) {
        ctx.status = 404;
        ctx.body = raiseWarning('Product not found in cart');
        return;
      }
  
      // Remove the product from the cart
      cart.products.splice(existingProductIndex, 1);

  
      // Recalculate the total price
      cart.totalPrice = await cart.products.reduce(async (totalPromise, item) => {
        const total = await totalPromise;
        const itemProduct = await Product.findById(item.productId);
        return total + (itemProduct ? itemProduct.price * item.quantity : 0);
      }, Promise.resolve(0));
  
      // Save the updated cart
      await cart.save();
  
      ctx.status = 200;
      ctx.body = raiseSuccess('Product removed from cart successfully', { cart });

      
    } catch (error) {
      ctx.status = 500;
      ctx.body = raiseWarning('Internal Server Error');
      console.error(error);
    }

  };


export const removeCart = async (ctx: Context) => {
    try {

      // handle the id from auth/user.middleware
      const userId = ctx.state.user.id as string; 
      

      // check if cart exists
      const cart = await Cart.findOneAndDelete( { userId } );
      
      if (!cart) {
        ctx.status = 404;
        ctx.body = raiseWarning('Cart not found');
        return;
      }      
      
      ctx.status = 200;
      ctx.body = raiseSuccess('Cart removed successfully', { cart });
      
    } catch (error) {

      ctx.status = 500;
      ctx.body = raiseWarning('Internal Server Error');
      console.error(error);

    }
    
};



export const getUserCart = async (ctx: Context) => {
    try {

      // handle the id from auth/user.middleware
      const userId = ctx.state.user.id as string; 
  
      // Find the user's cart
      const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price');
  
      if (!cart) {
        ctx.status = 404;
        ctx.body = raiseWarning('Cart not found');
        return;
      }

      ctx.status = 200;
      ctx.body = raiseSuccess('User cart retrieved successfully', { cart });

    } catch (error) {
      ctx.status = 500;
      ctx.body = raiseWarning('Internal Server Error');
      console.error(error);
    }
  };
  