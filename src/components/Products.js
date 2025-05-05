
import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //need to change the URL to your backend URL - jen 
  fetch("http://10.251.168.243:8000/api/products/")
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

/* PREDICTION POC
const Products = [
  {
      id: 999,
      Title: 'product TEST',
      img: '/images/edouard-gilles-a5JMF6XyFYI-unsplash.jpg',
      Price:  10,
      cat: 'fruit',
      graph : '/images/basic-line-chart.svg'

  },
  {
    id: 1,
    Title: 'product 1',
    img: '/images/anh-nguyen-kcA-c3f_3FE-unsplash.jpg',
    Price:  10,
    cat: 'fruit',
    graph : '/images/basic-line-chart.svg'
  }
]
*/

export default Products;
