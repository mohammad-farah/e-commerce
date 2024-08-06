// routes/products.routes.ts
import Router from 'koa-router';

import {
  getCategories,
  getProductsByCategory,
  getProductsByCategoryWithPagination,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/products.controller';


import { adminAuthValidator } from '../middleware/admin.middleware';
import { userAuthValidator } from '../middleware/user.middleware';




const router = new Router();

// GET only categories
router.get('/categories', 
    getCategories
);

// GET products by category
router.get('/category/:category',
     getProductsByCategory
);

// GET products by category and pagination 
router.get('/category/:category/page',
    getProductsByCategoryWithPagination
);

// POST method
router.post('/',
    userAuthValidator,
    adminAuthValidator,
    createProduct
);

// PUT method
router.put('/:id',
    userAuthValidator,
    adminAuthValidator,
    updateProduct
);

// DELETE method
router.delete('/:id',
    userAuthValidator,
    adminAuthValidator,
    deleteProduct
);

export default router;
