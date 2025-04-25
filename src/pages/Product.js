import React, { useEffect, useState, useContext } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../components/style.css';
import { CartContext } from '../components/CartContext';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const { addToCart } = useContext(CartContext);

  // Fetch product data
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const detailPage = async (product) => {
    setDetail([{ ...product, graph: null }]);
    setClose(true);
    setQuantity("1");
    setLoadingGraph(true);

    try {
      const res = await fetch(`http://localhost:5000/generate-plot?product_id=${product.id}`);
      const data = await res.json();

      if (data.image) {
        const imageUrl = `data:image/png;base64,${data.image}`;
        setDetail([{ ...product, graph: imageUrl }]);
      }
    } catch (err) {
      console.error("Error fetching price graph:", err);
    } finally {
      setLoadingGraph(false);
    }
  };

  return (
    <>
      {close && (
        <div className="detail_container">
          <div className="detail_content">
            <button className="close" onClick={() => setClose(false)}>
              <AiFillCloseCircle />
            </button>
            {detail.map((x) => (
              <div key={x.id} className="detail_info">
                <div className="img-box">
                  <img src="https://via.placeholder.com/200" alt={x.name} />
                </div>
                <div className="product_detail">
                  <h2>{x.name}</h2>
                  <h3>${x.current_price}</h3>
                  <div className="product_graph">
                    {loadingGraph ? (
                      <p>Loading price graph...</p>
                    ) : x.graph ? (
                      <img src={x.graph} alt={`${x.name} Price Graph`} />
                    ) : (
                      <p>No price graph available.</p>
                    )}
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <label htmlFor="quantityInput" style={{ marginRight: '8px' }}>
                      Quantity:
                    </label>
                    <input
                      id="quantityInput"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      onBlur={() => {
                        if (!quantity || parseInt(quantity, 10) < 1) {
                          setQuantity("1");
                        }
                      }}
                      style={{ width: '60px' }}
                    />
                  </div>
                  <button
  onClick={async () => {
    try {
      console.log("Product object:", x);
      console.log("Product ID:", x.product_id);

      const success = await addToCart(x.product_id, parseInt(quantity, 10) || 1);
      if (success) {
        setClose(false);
      } else {
        alert("Failed to add to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("An error occurred.");
    }
  }}
  style={{ marginTop: '15px' }}
>
  Add to Cart
</button>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container">
        {currentProducts.map((curElm) => (
          <div className="box" key={curElm.id}>
            <div className="content">
              <div className="img-box">
                <img src="https://via.placeholder.com/150" alt={curElm.name} />
              </div>
              <div className="detail">
                <div className="info">
                  <h3>{curElm.name}</h3>
                  <p>${curElm.current_price}</p>
                </div>
                <button onClick={() => detailPage(curElm)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="multipage" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            margin: '0 6px',
            padding: '6px 12px',
            borderRadius: '5px',
            backgroundColor: '#eee',
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
            style={{
              margin: '0 4px',
              padding: '6px 12px',
              borderRadius: '5px',
              backgroundColor: currentPage === i + 1 ? '#8abb63' : '#eee',
              color: currentPage === i + 1 ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            margin: '0 6px',
            padding: '6px 12px',
            borderRadius: '5px',
            backgroundColor: '#eee',
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Product;
