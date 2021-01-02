import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import "./style.scss";
import ProductInfo from "./component/ProductInfo";

function ProductDetail(props) {
  const [product, setProduct] = useState(null);
  const [productDetail, setProductDetail] = useState(null)
  const productId = props.history.location.pathname.split('/')[2];

  const fetchProductDetail = (productId) => {
    const backendURL = process.env.REACT_APP_BASE_URL;
    let apiURL = "";

    apiURL = backendURL + `/supProducts/${productId}`;
    fetch(apiURL)
      .then(response => response.json())
      .then(response =>  {
        setProductDetail(response)
      })
      .catch((err) => console.log(err));
  }
    
  const fetchData = (superProductId) => {
      const backendURL = process.env.REACT_APP_BASE_URL;
      let apiURL = "";
      
      apiURL = backendURL + `/superProducts/${superProductId}/?filter[include][supProducts]`;
      fetch(apiURL)
      .then(response => response.json())
      .then(response => {
        let supProducts = response.supProducts;
        let productProperties = null
        supProducts.forEach(item => {
          if (!productProperties || !productProperties.hasOwnProperty(item.color)) {
            productProperties = {
              ...productProperties,
              // [item.color]: {
              //   [item.size]: item
              // }
              [item.color]: [item]
            }
          }
          else {
            // productProperties[item.color] = {
            //   ...productProperties[item.color],
            //   [item.size]: item
            // }
            productProperties[item.color].push(item)
          }
        })
        
        setProduct({
          productDetail: {
            ...productDetail,
            description: response.description,
            commonImage: response.commonImages,
            price: response.price
          },
          productProperties
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (productDetail)
      fetchData(productDetail.superProductId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail])

  useEffect(() => {
    fetchProductDetail(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="root">
      {product === null ? (
        <></>
      ) : (
        <ProductInfo product={product}/>
      )}
      <br />
    </div>
  );
}

export default Wrapper()(ProductDetail);
