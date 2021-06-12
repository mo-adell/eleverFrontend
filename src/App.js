import React from "react"

import { BrowserRouter, Route } from "react-router-dom"

import PrivateRoute from "./components/PrivateRoute" //private route created to not let unauthinticated users visit profile page and fix errors after updating
import AdminRoute from "./components/AdminRoute" //check if admin before reaching admin pages

import ProductEditScreen from "./screens/ProductEditScreen"
import CartScreen from "./screens/CartScreen"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import SigninScreen from "./screens/SigninScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ShippingAddressScreen from "./screens/ShippingAddressScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import OrderHistoryScreen from "./screens/OrderHistoryScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ProductListScreen from "./screens/ProductListScreen"
import CreateProductScreen from "./screens/CreateProductScreen"
import OrderListScreen from "./screens/OrderListScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import CreateCategoryScreen from "./screens/CreateCategoryScreen"
import CategoryListScreen from "./screens/CategoryListScreen"
import CategoryEditScreen from "./screens/CategoryEditScreen"
import SubcategoryListScreen from "./screens/SubcategoryListScreen"
import NavBar from "./components/NavBar"
import CreateSubcategoryScreen from "./screens/CreateSubcategoryScreen"
import SubcategoryEditScreen from "./screens/SubcategoryEditScreen"
import SubcategoryScreen from "./screens/SubcategoryScreen"
import MenCategorytry from "./screens/MenCategorytry"
import WomenCategoryTry from "./screens/WomenCategoryTry"
import SearchScreen from "./screens/SearchScreen"
import Footer from "./components/Footer"
import OutWearTryScreen from "./screens/OutWearTryScreen"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <NavBar />
        <Route path="/" component={HomeScreen} exact></Route>
        <div className="main">
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" exact component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/subcategory/:id" exact component={SubcategoryScreen}></Route>
          <Route path="/products/men" exact component={MenCategorytry}></Route>
          <Route path="/products/women" exact component={WomenCategoryTry}></Route>
          <Route path="/products/outwear" exact component={OutWearTryScreen}></Route>

          <Route path="/search/name/:name?" exact component={SearchScreen}></Route>

          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/create" exact component={CreateProductScreen}></AdminRoute>
          <AdminRoute path="/addcategory" exact component={CreateCategoryScreen}></AdminRoute>
          <AdminRoute path="/categories" exact component={CategoryListScreen}></AdminRoute>
          <AdminRoute path="/category/:id/edit" exact component={CategoryEditScreen}></AdminRoute>
          <AdminRoute path="/subcategories" exact component={SubcategoryListScreen}></AdminRoute>
          <AdminRoute path="/addsubcategory" exact component={CreateSubcategoryScreen}></AdminRoute>
          <AdminRoute path="/subcategory/:id/edit" exact component={SubcategoryEditScreen}></AdminRoute>
          <AdminRoute path="/product/:id/edit" exact component={ProductEditScreen}></AdminRoute>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
