import React, { useState } from 'react'
import Wrapper from '../../components/Wrapper'
import { Form, Input, Button, Checkbox, Row, Col, Cascader, Radio } from "antd";
import ProductContainer from './component/ProductContainer'

function Checkout(props) {
  const onFinish = (values) => {
    console.log('checkout', values)
  }

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
              label={<span style={{color: 'blueviolet'}}>Payment Method<br/></span>}
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
          <ProductContainer />
          <br/>
          <Button type='primary' htmlType="submit">CHECKOUT</Button>
        </Col>
      </Row>
    </Form>   
     
    </div>
  )
}

export default Wrapper()(Checkout)