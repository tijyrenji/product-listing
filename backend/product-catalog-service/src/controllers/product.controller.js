import {fetchProducts, fetchProductByCode} from "../services/product.service.js";

export const getProducts = async (req, res, next) => {
    try {
        const { products, nextCursor } = await fetchProducts(req.query); 
        res.json({ products, nextCursor });
    } catch (error) {
        next(error);
    }   
}

export const getProductByCode = async (req, res, next) => {
    try {
        const product_code = req.params.product_code;   
        const product = await fetchProductByCode(product_code);
        res.json({ product });
    } catch (error) {
        next(error);
    }
}