import {Router} from 'express';

import { getProducts,getProductByCode } from '../controllers/product.controller.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:product_code', getProductByCode); 


export default router;
