import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Wrapper from '../../components/Wrapper'
import { Form, Input, Button, Checkbox, Row, Col, Cascader, Radio, Modal } from "antd";
import ProductContainer from './component/ProductContainer'
import { createOrder } from '../../redux/actions/orderAction'

function Checkout(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch()
  const cart = JSON.parse(localStorage.getItem('cart'));
  const total = localStorage.getItem('totalPrice')
  const [totalPrice, setTotalPrice] = useState()
  const [cartList, setCartList] = useState(null)
  const [discountCost, setDiscountCost] = useState(0)
  const [discountCode, setDiscountCode] = useState("")
  const shippingCost = 40000

  useEffect(() => {
    setCartList(cart)
    setTotalPrice(total)
    console.log(total, cart)
  }, [])

  const onFinish = (values) => {
    let payload = {
      orderInfo: {
      ...values,
      totalPrice: parseInt(shippingCost)+parseInt(totalPrice)-parseInt(discountCost),
      discountCode: discountCode,
      },
      cartList
    } 
    dispatch(createOrder(payload))
  }

  const handleChangeDiscountCost = (_discountCost, _discountCode) => {
    setDiscountCost(_discountCost)
    setDiscountCode(_discountCode)
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return(
    <div style={{ marginTop: 50 }}>
      <h1>Order Infomation</h1>
      <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
      <Row gutter={16+8*5}>
        <Col span={12}>
            <Form.Item
              label=""
              name="recipientName"
              rules={[{ required: true, message: 'Please input recipient full name!' }]}
            >
              <Input placeholder="Full name"/>
            </Form.Item>

            <Form.Item
              label=""
              name="recipientPhone"
              rules={[{ required: true, message: 'Please input recipient phone!' }]}
            >
              <Input  placeholder="Phone number"/>
            </Form.Item>

            <Form.Item
              label=""
              name="recipientAddress"
              rules={[{ required: true, message: 'Please input recipient address!' }]}
            >
              <Input placeholder="Address"/>
            </Form.Item>

            <Form.Item
              label={<span style={{color: 'blueviolet', fontWeight: 'bolder'}}>Payment Method<br/></span>}
              name="paymentMethod"
              rules={[{ required: true, message: 'Please choose payment method!' }]}
              // getValueProps={(value) => console.log(value)}
            >
            
              <Radio.Group  buttonStyle="solid">
                <Radio.Button value="cod">COD</Radio.Button>
                <Radio.Button value="momo">MoMo E-Wallet</Radio.Button>
                <Radio.Button value="visa">Visa/MasterCard</Radio.Button>
              </Radio.Group>
            </Form.Item>
        </Col>
        <Col span={12} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ProductContainer 
            totalPrice={totalPrice}
            cartList={cartList}
            shippingCost={shippingCost}
            handleChangeDiscountCost={handleChangeDiscountCost}
            discountCost={discountCost}
          />
          <br/>
          <Button type='primary' htmlType="submit">CHECKOUT</Button>
        </Col>
      </Row>
    </Form>   
     
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
     
    </div>
  )
}

export default Wrapper()(Checkout)