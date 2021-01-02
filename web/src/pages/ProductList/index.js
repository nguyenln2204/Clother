import React, { useEffect, useState } from "react";
import ProductItemBlock from "../../components/ProductItemBlock";
import Wrapper from "../../components/Wrapper";
import { Link } from 'react-router-dom'

const ProductRow = (props) => {
  const { list } = props
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
      {
        list.map((item, index) => {
          return(
            <div key={index} style={{width: 250}}>
              {
                item ?
                  <div style={{ cursor: "pointer" }}>
                    <Link to={{
                      pathname: `/product/${item.id}`,
                      state: {
                        superProductId: item.superProductId
                      }}}>
                      <ProductItemBlock key={index} product={item} />
                    </Link>
                  </div>
                : null
              }
            </div>
          )
        })
      }
    </div>
  )
}

function ProductList(props) {
  const [productList, setProductList] = useState([]);
  const keyword = props.history.location.pathname.split("/")[2];
  const [categoryId, setCategoryId] = useState(null)

  const fetchCategory = (keyword) => {
    const backendURL = process.env.REACT_APP_BASE_URL;
    let apiURL = "";
    apiURL = backendURL + "/categories";
    fetch(apiURL)
    .then(response => response.json())
    .then(response =>  {
      let item = response.find(item => item.name.toLowerCase() === keyword)
      setCategoryId(item.id)
    })
    .catch((err) => console.log(err));
  }

  const fetchData = () => {
    const backendURL = process.env.REACT_APP_BASE_URL;
    let apiURL = "";
    console.log('keyword', keyword)
    if (keyword === "all-items")
      apiURL = backendURL + "/superProducts?filter[include][supProducts]";
    else apiURL = backendURL + `/superProducts?filter[include][supProducts]&filter[where][categoryId]=${categoryId}`;
    fetch(apiURL)
      .then((response) => response.json())
      .then((response) => {
        console.log('res', response)
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
    if (categoryId)
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  useEffect(() => {
    fetchCategory(keyword)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);


  return (
    <div>
      <h3>{keyword.toUpperCase()}</h3>
      <div style={{ width: "100%" }}>
        {
          productList.map((item, index) => {
            let tmpList = []
            if ((index+1) % 4 === 0 && index>0) {
              tmpList = productList.slice(index-3, index+1)
            }
            if (index === productList.length - productList.length%4) {
              tmpList = productList.slice(index, productList.length)
              for (let i = 0; i<4-productList.length%4; i++) {
                tmpList.push(null)
              }
            } 
            return (<ProductRow list={tmpList} />)
          })
        }
      </div>
    </div>
  );
}

export default Wrapper()(ProductList);
