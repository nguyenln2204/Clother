import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom' 
import { Divider, Drawer, Button } from "antd";
import CartItem from "./CartItem";
import { addItem } from '../redux/actions/cartAction'

function CartDrawer(props) {
  const { visible, onClose } = props;
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const [cartList, setCartList] = useState(JSON.parse(localStorage.getItem('cart')))
  const [totalPrice, setTotalPrice] = useState(localStorage.getItem('totalPrice'))

  useEffect(() => {
    console.log('cart drawer')
    setCartList(JSON.parse(localStorage.getItem('cart')))
    setTotalPrice(localStorage.getItem('totalPrice'))
  }, [cart])

  const changeAmount = (newAmount, index) => {
    let arr = cartList;
    arr[index] = {
      ...arr[index],
      quantity: newAmount
    }
    setCartList(arr)

    dispatch(addItem({
      ...cartList[index],
      quantity: newAmount
    }))
  };

  const handleCheckoutButton = () => {
    props.history.push('/checkout')
  }
  
  const removeItem = (index) => {
    let arr = cartList;
    arr.splice(index, 1)
    console.log('cart', cartList)
    dispatch(addItem({
      price: cartList[index].price,
      supProductId: cartList[index].supProductId,
      quantity: 0
    }))
    setCartList(arr)
  }

  return (
    <Drawer
      title="CART"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={450}
    >
      {cartList?.map((item, index) => {
        return (
          <div key={index}>
            {
              index !== 0 ? <Divider /> : null
            }  
            <CartItem
              key={index}
              product={item.productDetail}
              quantity={item.quantity}
              changeAmount={changeAmount}
              index={index}
              price={item.price}
              removeItem={removeItem}
            />
          </div>
        );
      })}
      <Divider />
      <div style={{ display: "flex", flexDirection: 'column'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{ marginBottom: "0px !important"}}>TOTAL</p>
          <h2 style={{ margin: "0px !important", color: "blueviolet"}}>{totalPrice} VND</h2>
        </div>
        <Button type="primary" disabled={cartList?.length < 1 || !cartList} onClick={handleCheckoutButton}>CHECKOUT</Button>
      </div>
    </Drawer>
  );
}

export default withRouter(CartDrawer)
