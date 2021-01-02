import React, { useEffect, useState } from "react";
import ProductItemBlock from "../../components/ProductItemBlock";
import Wrapper from "../../components/Wrapper";
import { Link } from 'react-router-dom'

function ProductList(props) {
  const [productList, setProductList] = useState([]);
  const keyword = props.history.location.pathname.split("/")[2];

  const fetchData = (keyword) => {
    const backendURL = process.env.REACT_APP_BASE_URL;
    let apiURL = "";
    if (keyword === "all-items")
      apiURL = backendURL + "/superProducts?filter[include][supProducts]";
    fetch(apiURL)
      .then((response) => response.json())
      .then((response) => {
        let newProductList = []
        response.forEach(item => {
          let supProducts = item.supProducts;
          let tmp = null
          supProducts.forEach(element => {
            if (!tmp || !tmp.hasOwnProperty(element.color) || (tmp.hasOwnProperty(element.color) && tmp[element.color].size > element.size)) {
              tmp = {
                ...tmp,
                [element.color]: {
                  ...element, 
                  price: item.price, 
                },
              }
            }
          });
          newProductList.push(tmp)
        });
        let finalList = []
        newProductList.forEach(item => {
          finalList.push(...Object.values(item))
        })
        console.log('final product list', finalList)
        setProductList(finalList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData(keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>ALL ITEMS</h3>
      <div style={{ display: "flex" }}>
        {productList.map((item, index) => {
          return (
            <div key={index} style={{ cursor: "pointer" }}>
              <Link to={{
                pathname: `/product/${item.id}`,
                state: {
                  superProductId: item.superProductId
                }}}>
                <ProductItemBlock key={index} product={item} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Wrapper()(ProductList);
