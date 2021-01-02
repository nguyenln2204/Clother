import React, { useEffect, useState } from "react";
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import Checkbox from "@material-ui/core/Checkbox";
import { sizeDict } from '../constants/constants'

export default function CartItem(props) {
  const { product, price, changeAmount, handleCheckboxCheckout, index, removeItem } = props;
  const {
    image,
    name,
    sku = "FOMO2020",
    size,
    color,
    checkedCheckout,
    inStock,
  } = product;
  const [quantity, setQuantity] = useState(props.quantity)

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
          <Checkbox
            checked={true}
            onChange={handleCheckboxCheckout}
            inputProps={{ "aria-label": "primary checkbox" }}
            style={{ selfAlign: 'flex-start'}}
          />
           
          <img src={image[0]} alt="thumbnail" height={100} />
          <div>
            <p>{name}</p>
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
