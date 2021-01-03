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
  const { 
    cartList, 
    totalPrice, 
    shippingCost,
    handleChangeDiscountCost,
    discountCost
  } = props
 
  const [discountCode, setDiscountCode] = useState("")
  const [alert, setAlert] = useState("")

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value)
  }

  const _handleApplyCode = (discountCode) => {
    if (discountCode === "DISCOUNT50") {
      handleChangeDiscountCost(totalPrice*0.5, discountCode)
      setAlert("")
    }
    else {
      handleChangeDiscountCost(totalPrice*0, discountCode)
      setAlert("Invalid Code!")
    }
  }

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
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', paddingInline: 100}}>
        <Input placeholder='Discount Code' style={{ width: '70%' }} onChange={handleDiscountCodeChange}/>
        <Button onClick={() => _handleApplyCode(discountCode)} type='primary'>APPLY</Button>
        <p style={{color: "#F44336", position: 'absolute', right: 0, alignSelf: 'flex-end' }}>{alert}</p>
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
        <p style={{fontWeight: 'bold', fontSize: 24}}>{parseInt(shippingCost)+parseInt(totalPrice)-parseInt(discountCost)} VND</p>
      </div>
    </div>
  )
}

export default ProductContainer