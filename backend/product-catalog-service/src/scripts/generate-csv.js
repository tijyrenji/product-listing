import {faker} from '@faker-js/faker';
import fs from 'fs';

const stream = fs.createWriteStream("sample-data/products.csv");

stream.write("product_code,name,category,price,created_at,updated_at\n");

const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];
const TOTAL_PRODUCTS = 200000;

for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
  const product_code = `SKU-${i}`;
  const name = faker.commerce.productName();  
  const category = faker.helpers.arrayElement(categories);
  const price = faker.commerce.price();
  const created_at = faker.date.past().toISOString();
  const updated_at = faker.date.recent().toISOString();

  stream.write(`${product_code},${name},${category},${price},${created_at},${updated_at}\n`);
}

stream.end(() => {
  console.log(`Successfully generated ${TOTAL_PRODUCTS} products and saved to products.csv`);
});







// import {faker} from '@faker-js/faker';
// import {createObjectCsvWriter} from 'csv-writer';

// const createCsvWriter = createObjectCsvWriter({
//   path: "products.csv",
//   header: [
//     { id: "product_code", title: "product_code" },
//     { id: "name", title: "name" },
//     { id: "category", title: "category" },
//     { id: "price", title: "price" },
//     { id: "created_at", title: "created_at" },
//     { id: "updated_at", title: "updated_at" }
//   ]
// });

// const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];

// const TOTAL_PRODUCTS = 200000;


// async function generateProducts() {
//   const products = [];     
//   for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
//     const product = {
//       product_code:  `SKU-${i}`,
//       name: faker.commerce.productName(),
//       category: faker.helpers.arrayElement(categories),
//       price: faker.commerce.price(),
//       created_at: faker.date.past().toISOString(),
//       updated_at: faker.date.recent().toISOString()
//     };
//     products.push(product);
//   }
//     await createCsvWriter.writeRecords(products);
//     console.log(`Successfully generated ${TOTAL_PRODUCTS} products and saved to products.csv`);
//   //return products;
// }   

// generateProducts().catch(err => {
//   console.error("Error generating products:", err);
// }  );