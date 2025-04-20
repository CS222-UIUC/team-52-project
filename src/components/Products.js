
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //need to change the URL to your backend URL - jen 
  fetch("http://localhost:8000/api/products/")
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error("Error fetching products:", err));
}, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.Title}</h3>
            <p>${product.Price}</p>
          </div>
        ))
      ) : (
        <p>Loading or no products found...</p>
      )}
    </div>
  );
};

export default Products;
