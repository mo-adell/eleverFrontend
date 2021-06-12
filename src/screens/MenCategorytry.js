import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { listProducts } from "../actions/productActions"

import Product from "../components/Product"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
const MenCategorytry = (props) => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  console.log(products)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <div>
      {" "}
      <div className="featured">
        <h1>MEN PRODUCTS</h1>
      </div>
      {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> : <div className="row center">{products.map((product) => product.category._id === "60c0147dfbb3491693915b3b" && <Product key={product._id} product={product}></Product>)}</div>}
    </div>
  )
}

export default MenCategorytry
