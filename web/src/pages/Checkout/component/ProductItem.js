import React from 'react'
import { sizeDict } from '../../../constants/constants'

function ProductItem(props) {
  const { product } = props
  const { quantity, price } = product
  const {
    image,
    name, 
    size,
    color,
    sku = "FOMO2020"
  } = product.productDetail
  return (
    <>
    {!product ? null : (
      <div style={{ display: "flex", position: 'relative', marginBottom: 20 }}>
        <img src={image[0]} alt="thumbnail" height={100} />
        <div style={{ position: 'relative '}}>
          <p style={{ fontWeight: 'bold'}}>{name}</p>
          {/* <p>{color.toUpperCase()}</p> */}
          <p>
            {sizeDict[size]}/{sku}
          </p>
          <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'flex-end', position: 'absolute', bottom: 0, width: '70%' }}>
            <p style={{ fontSize: 16 }}>
              {price} VND
            </p>
            <p style={{ fontWeight: 'bold', color: 'blueviolet', fontSize: 18 }}>
              x {quantity}
            </p>
          </div>
        </div>
        <p style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 22}}>{price*quantity} VND</p>
      </div>
    )}
  </>
  )
}

export default ProductItem