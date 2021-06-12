import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { listProducts } from "../actions/productActions"

import Product from "../components/Product"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
const OutWearTryScreen = (props) => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  console.log(products)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <div>
      <div className="featured">
        <h1>OUTWEAR PRODUCTS</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  )
}

export default OutWearTryScreen
