import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import './App.css'

function App() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const { data: products, isLoading: loading, error } = useQuery({
    queryKey: ['products'], queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) {
        console.error('Network response was not ok', response);
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Clone the response to log the data
      console.log('Fetched products:', data); // Log the fetched data
      return data.products;
    }
  });

  return (
    <div>
      <h1>Product Listing</h1>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {products && (
          <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {/* Product Cards */}
              {products.map((product) => (
                <div key={product.id} className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}


        {products && products.length === 0 && (
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h2>No products found</h2>
          </div>)}
      </div>
    </div>)


}

export default App
