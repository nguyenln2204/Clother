import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Row, Col, Image, Radio, Button } from "antd";
import "../style.scss";
import ColorGroupButton from "./ColorGroupButton";
import DescriptionContainer from "./DescriptionContainer";
import InputAmountGroup from "./InputAmountGroup";
import dummyImage from "../../../static/images/t-shirt.png";
import { sizeDict } from '../../../constants/constants'
import { addItem } from '../../../redux/actions/cartAction'

function ProductInfo(props) {
  const { product } = props;
  const { productProperties } = product
  const { image, name, price, description, color, extraPrice, id, superProductId, size } = product.productDetail;
  const dispatch = useDispatch()
  const [sizeOptions, setSizeOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [sizeValue, setSizeValue] = useState(size);
  const [inStockValue, setInStockValue] = useState();
  const [amountValue, setAmountValue] = useState(1);
  
  const generateSizeOptions = () => {
    let array = [];
    let tmp = productProperties[color]
    tmp.forEach(item => {
      array.push({
        label: sizeDict[item.size],
        value: item.size,
        disabled: item.inStock > 0 ? false : true,
        inStock: item.inStock,
        supProductId: item.id
      });
    });
    setSizeOptions(array);
  };

  const generateColorOptions = () => {
    let array = [];
    for (const [key, value] of Object.entries(productProperties)) {
      array.push({
        color: key,
        productId: value[0].id,
        disabled: false,
      });
    }
    setColorOptions(array);
  };

  useEffect(() => {
    generateSizeOptions();
    generateColorOptions();
    setSizeValue(size);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  

  useEffect(() => {
    if (sizeOptions !== []) {
      setInStockValue(sizeOptions[0]?.inStock)
    }
  }, [sizeOptions])

  const handleSizeChange = (e) => {
    let tmp = e.target.value;
    setSizeValue(e.target.value);
    let obj = sizeOptions.find(item => item.value === tmp.toString())
    setInStockValue(obj.inStock)
    setAmountValue(1)
    props.history.push(`/product/${obj.supProductId}`, { superProductId })
  };

  const handleInputChange = (value) => {
    setAmountValue(value)
  };

  const handleAddToCartButton = () => {
    dispatch(addItem({
      quantity: amountValue,
      supProductId: id,
      price: price
    }))
  };

  return (
    <div className="root">
      <Row gutter={16}>
        {/* LEFT COMPONENT */}
        <Col span={14} style={{  }}>
          <Row>
            <Col span={12}>
              <Image src={image[0]} />
            </Col>
            <Col span={12}>
              <Image src={image[1]} />
            </Col>
          </Row>
          <Row>
            <Image src={dummyImage} />
          </Row>
        </Col>

        {/* RIGHT COMPONENT */}
        <Col span={10} style={{  }}>
          <h1 style={{ fontWeight: 700, fontSize: 28 }}>{name}</h1>
          <p style={{ color: "#7E7E7E", fontSize: 12 }}>SKU: FOM0030</p>
          <p style={{ fontSize: 38, fontWeight: 300, marginBottom: 20 }}>
            {price + extraPrice}VND
          </p>
          <Radio.Group
            options={sizeOptions}
            onChange={handleSizeChange}
            value={sizeValue}
            optionType="button"
            buttonStyle="solid"
            style={{ marginBottom: 12 }}
          />
          <br />
          <ColorGroupButton colorOptions={colorOptions} color={color}/>
          <br />
          <InputAmountGroup
            inStock={inStockValue}
            handleInputChange={handleInputChange}
            productId={id}
          />

          <div style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>
            <Button
              className="addToCartButton"
              type="primary"
              onClick={handleAddToCartButton}
            >
              ADD TO CART
            </Button>
          </div>
          <DescriptionContainer description={description} />
          <br />
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(ProductInfo);
