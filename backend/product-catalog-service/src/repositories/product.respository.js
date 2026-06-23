import {supabaseServer} from "../config/supabase.js";

export const getProducts = async ({
    category,
    limit,
    cursorCreatedAt,
    cursorId
}) => {
    let query = supabaseServer
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })
        .order("product_code", { ascending: false })
        .limit(limit);
    if(category) {
        query = query.eq("category", category);
    }
    const { data, error } = await query;

    if (error) {
        throw new Error("Failed to fetch products");
    }

    return data;
};  


export const getProductByCode = async (product_code) => {
  const { data, error } = await supabaseServer
    .from("products")
    .select("*")
    .eq("product_code", product_code)
    .single();
  if (error) {
    throw new Error("Failed to fetch product");
  }
  return data;
};

// export const createProduct = async (product) => {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .insert([product])
//     .single();  }

// export const updateProduct = async (product_code, updatedProduct) => {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .update(updatedProduct)
//     .eq("product_code", product_code)
//     .single();  }

// export const deleteProduct = async (product_code) => {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .delete()
//     .eq("product_code", product_code)
//     .single();  }

// export const getCategories = async () => {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .select("category")
//     .group("category");}

// export const upsertProducts = async (products) => {
//   const { data, error } = await supabaseServer
//     .from("products")
//     .upsert(products, {
//       onConflict: "product_code"
//     });}