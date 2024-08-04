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



const router = new Router();

// GET methods
router.get('/categories', 
    getCategories
);

router.get('/category/:category',
     getProductsByCategory
);

router.get('/category/:category/page',
    getProductsByCategoryWithPagination
);

// POST method
router.post('/',
    createProduct
);

// PUT method
router.put('/:id', 
    updateProduct
);

// DELETE method
router.delete('/:id',
    deleteProduct
);

export default router;
