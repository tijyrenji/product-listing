import { getProducts, getProductByCode}  from "../repositories/product.respository.js";

export const fetchProducts = async (queryParams) => {
  const { category, limit, cursorCreatedAt, cursorId } = queryParams;  
  const parsedLimit = Math.min(Number(limit) || 50,100      );

  const products = await getProducts({ category, limit: parsedLimit, cursorCreatedAt, cursorId });

  let nextCursor = null;

  if(products.length) {
    const lastProduct = products[products.length - 1];
    nextCursor = {
      created_at: lastProduct.created_at,
      id: lastProduct.id
    };
  }

  return {
    products,
    nextCursor
  };
}   
  


export const fetchProductByCode = async (product_code) => {
    if(!product_code) {
        throw new Error("Product code is required");
    }
    const product = await getProductByCode(product_code);
    if(!product) {
        throw new Error("Product not found");
    }
    return product;
}