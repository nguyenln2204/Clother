import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { Button, Divider, Input } from 'antd'

const styles = {
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 20,
  }
}

function ProductContainer(props) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const total = localStorage.getItem('totalPrice')
  const [cartList, setCartList] = useState(null)
  const [totalPrice, setTotalPrice] = useState()
  const shippingCost = 40000
  const discountCost = 0

  useEffect(() => {
    setCartList(cart)
    setTotalPrice(total)
    console.log(total, cart)
  }, [])

  return (
    <div>
      {
        !cartList ? null
        :
        cartList.map((item, index) => {
          return(
            <ProductItem key={index} product={item}/>
          )
        })
      }
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 100}}>
        <Input placeholder='Discount Code' style={{ width: '70%' }}/>
        <Button type='primary'>APPLY</Button>
      </div>
      <Divider />

      <div style={styles.summaryLine}>
        <p>Item Cost</p>
        <p>{totalPrice} VND</p>
      </div>
      <div style={styles.summaryLine}>
        <p>Discount</p>
        <p style={{color: '#F44336'}}>- {discountCost} VND</p>
      </div>
      <div style={styles.summaryLine}>
        <p>Shipping Cost</p>
        <p>{shippingCost} VND</p>
      </div>

      <Divider />

      <div style={styles.summaryLine}>
        <p style={{fontWeight: 'bold', color: 'blueviolet'}}>Total Cost</p>
        <p style={{fontWeight: 'bold', fontSize: 24}}>{parseInt(shippingCost)+parseInt(totalPrice)+parseInt(discountCost)} VND</p>
      </div>
    </div>
  )
}

export default ProductContainer