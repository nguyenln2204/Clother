import React, { useEffect, useState } from "react";
import { InputNumber, Button } from "antd";
import { withRouter } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import Checkbox from "@material-ui/core/Checkbox";
import { sizeDict } from '../constants/constants'

function CartItem(props) {
  const { product, price, changeAmount, handleCheckboxCheckout, index, removeItem,isChecked } = props;
  const {
    image,
    name,
    sku = "FOMO2020",
    size,
    color,
    checkedCheckout,
    inStock,
    id
  } = product;
  const [quantity, setQuantity] = useState(props.quantity)
  const [checkState, setCheckState] = useState(true)
  useEffect(() => {
    setQuantity(props.quantity)
  }, [props.quantity])


  return (
    <>
      {!product ? null : (
        <div style={{ display: "flex", position: 'relative' }}>
          {/* <Button style={{ position: 'absolute', right: 0, bottom: 4}} type="primary" onClick={() => removeItem(index)}>
            <DeleteOutlined />
          </Button> */}
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Checkbox
              checked={isChecked ? isChecked : checkState}
              onChange={() => setCheckState(!checkState)}
              inputProps={{ "aria-label": "primary checkbox" }}
              style={{ selfAlign: 'flex-start'}}
            />
            <Button size="small">
              <DeleteOutlined />
            </Button>
          </div>
          
          <img src={image[0]} alt="thumbnail" height={100} />
          <div style={{cursor: 'pointer'}} onClick={() => props.history.push(`/product/${id}`)}>
            <p style={{fontWeight: 600}}>{name}</p>
            <p>{color.toUpperCase()}</p>
            <p>
              {sizeDict[size]}/{sku}
            </p>
            <div style={{ display: "flex" }}>
              <p style={{ fontSize: 20, color: "blueviolet", fontWeight: 500 }}>
                {price} x{" "}
              </p>
              <InputNumber
                min={1}
                max={inStock}
                value={quantity}
                defaultValue={quantity}
                onChange={(value) => {
                  setQuantity(value)
                  changeAmount(value, index)
                }}
                onBlur={(e) => {
                  console.log('blue', e.target.value)
                  setQuantity(Math.max(1, Math.min(e.target.value, inStock)))
                  changeAmount(Math.max(1, Math.min(e.target.value, inStock)), index)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default withRouter(CartItem)
