import React, { useState } from 'react';
import Products from '../components/Products';
import { AiFillCloseCircle } from 'react-icons/ai';
import '../components/style.css';

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [close, setClose] = useState(false)
  const detailPage = (Product) =>
  {
    setDetail([{...Product}])
    setClose(true)
  }
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
                    <img src={x.graph} alt={x.Title}></img>
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

