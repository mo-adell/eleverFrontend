import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants"

const url = "https://elever-store.herokuapp.com"

////Adding Item to cart & sending it to local storage

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`${url}/products/${productId}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

////removing items from cart and local storage

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

////saving the shipping address to local storage

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}
