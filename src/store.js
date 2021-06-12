import { createStore, compose, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import { productDetailsReducer, productListReducer, productCreateReducer, productUpdateReducer, productDeleteReducer } from "./reducers/productReducers"
import { userRegisterReducer, userSigninReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderListReducer, orderDeleteReducer } from "./reducers/orderReducers"
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from "./reducers/categoryReducers"
import { subcategoryCreateReducer, subcategoryDeleteReducer, subcategoryDetailsReducer, subcategoryListReducer, subcategoryUpdateReducer } from "./reducers/subcategoryReducers"

const initialState = {
  ////saving userinfo in local storage after signing in
  userSignin: {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
  },
  ////saving cart info & shipping address to local storage
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
  },
}
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
  subcategoryList: subcategoryListReducer,
  subcategoryDetails: subcategoryDetailsReducer,
  subcategoryCreate: subcategoryCreateReducer,
  subcategoryUpdate: subcategoryUpdateReducer,
  subcategoryDelete: subcategoryDeleteReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
