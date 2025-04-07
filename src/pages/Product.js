import React, { useState } from 'react';
import Products from '../components/Products';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../components/style.css';

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false)
  const [loadingGraph, setLoadingGraph] = useState(false); 

  const detailPage = async (product) => {
    setLoadingGraph(true);
    try {
      const res = await fetch(`http://localhost:5000/generate-plot?product_id=${product.id}`);
      const data = await res.json();

      if (data.image) {
        const imageUrl = `data:image/png;base64,${data.image}`;
        setDetail([{ ...product, graph: imageUrl }]); // add base64 image to product
      } else {
        setDetail([{ ...product, graph: null }]); // no graph found
      }
    } catch (err) {
      console.error("Error fetching price graph:", err);
      setDetail([{ ...product, graph: null }]);
    }
    setClose(true);
    setLoadingGraph(false);
  };
  return (
    <>
      {
        close ?
        <div className = 'detail_container'>
      <div className= 'detail_content'>
         <button className = 'close' onClick={() => setClose(false)}><AiFillCloseCircle /></button>
        {
          detail.map((x) =>
          {
            return(
              <>
              <div className = 'detail_info'>
                <div className = 'img-box'>
                  <img src = {x.img} alt = {x.Title}></img>
                </div>
                <div className= 'product_detail'>
                  <h2>{x.Title}</h2>
                  <h3>${x.Price}</h3>
                  <div className ='product_graph'>
                    {loadingGraph ? (
                        <p>Loading price graph...</p>
                      ) : x.graph ? (
                        <img src={x.graph} alt={`${x.Title} Price Graph`} />
                      ) : (
                        <p>No price graph available.</p>
                      )}
                  </div>
                  <button>Add to Cart</button>
                </div>
              </div>
              </>
            )
          } )
        }
      </div>
    </div> : null
      }
      <div className='container'>

        {
          Products.map((curElm) => { // Corrected arrow function syntax
            return (
              <div className='box' key={curElm.id}> {/* Added a unique key */}
                <div className='content'>
                  <div className='img-box'>
                    <img src={curElm.img} alt={curElm.Title}></img>
                  </div>
                  <div className='detail'>
                    <div className='info'>
                      <h3>{curElm.Title}</h3>
                      <p>${curElm.Price}</p>
                    </div>
                    <button onClick={() => detailPage (curElm) }> View</button>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default Product;