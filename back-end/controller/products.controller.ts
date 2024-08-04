// controller/products.controller.ts
import { Context } from 'koa';
import Product from '../database/models/product.model';
import { raiseSuccess, raiseWarning } from '../utils/response.beautifier';


interface UpdateProductBody {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    image?: string;
}

interface CreateProductBody {
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}


export const getCategories = async (ctx: Context) => {

    try {

        const categories = await Product.distinct('category');
        ctx.status = 200;
        ctx.body = raiseSuccess('Categories fetched successfully', { "categories" : categories });

    }

    catch (error) {

        ctx.status = 500;
        ctx.body = raiseWarning('Internal Server Error');
        console.error(error);

    }
};

export const getProductsByCategory = async (ctx: Context) => {
    try {

        const { category } = ctx.params;

        const products = await Product.find({ category });
        ctx.status = 200;
        ctx.body = raiseSuccess('Products fetched successfully', { products });

    } catch (error) {

        ctx.status = 500;
        ctx.body = raiseWarning('Internal Server Error');
        console.error(error);

    }
};

export const getProductsByCategoryWithPagination = async (ctx: Context) => {
    try {

        const { category } = ctx.params;

        // paginate the products
        const { page = 1, limit = 10 } = ctx.query;
        const skip = (Number(page) - 1) * Number(limit);
        const products = await Product.find({ category }).skip(skip).limit(Number(limit));

        ctx.status = 200;
        ctx.body = raiseSuccess('Products fetched successfully', { products });

    } catch (error) {

        ctx.status = 500;
        ctx.body = raiseWarning('Internal Server Error');
        console.error(error);

    }
};

export const createProduct = async (ctx: Context) => {
    try {

        const productData : CreateProductBody = ctx.request.body as CreateProductBody;
        productData.category = productData.category.toLocaleLowerCase();

        const newProduct = new Product(productData);
        await newProduct.save();

        ctx.status = 201;
        ctx.body = raiseSuccess('Product created successfully', { product: newProduct });

    } catch (error) {

        ctx.status = 400;
        ctx.body = raiseWarning('Bad Request');
        console.error(error);

    }
};

export const updateProduct = async (ctx: Context) => {
    try {

        const { id } = ctx.params;
        const updateData = ctx.request.body as UpdateProductBody;

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData , { new: true });

        if (!updatedProduct) {
            ctx.status = 404;
            ctx.body = raiseWarning('Product not found');
            return;
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Product updated successfully', { product: updatedProduct });

    } catch (error) {

        ctx.status = 400;
        ctx.body = raiseWarning('Bad Request');
        console.error(error);

    }
};

export const deleteProduct = async (ctx: Context) => {
    try {

        const { id } = ctx.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            ctx.status = 404;
            ctx.body = raiseWarning('Product not found');
            return;
        }

        ctx.status = 200;
        ctx.body = raiseSuccess('Product deleted successfully', { product: deletedProduct });

    } catch (error) {
        ctx.status = 400;
        ctx.body = raiseWarning('Bad Request');
        console.error(error);
    }
};
