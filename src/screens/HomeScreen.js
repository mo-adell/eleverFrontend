import React, { useEffect } from "react"

import Product from "../components/Product"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import { Link } from "react-router-dom"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  ////sending to products list action
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])
  return (
    <>
      <div className="home">
        <div className="header4"></div>
        <div className="imgheader">
          <div>
            <Link to={`/products/women`}>
              <img className="img1" src="/images/women.jpeg" alt="img"></img>
            </Link>
          </div>
          <div>
            <Link to={`/products/men`}>
              <img className="img2" src="/images/men.jpeg" alt="img"></img>
            </Link>
            <Link to={"/products/outwear"}>
              <img className="img2" src="/images/outwear.jpeg" alt="img"></img>
            </Link>
          </div>
        </div>
        <div className="featured">
          <h1>FEATURED PRODUCTS</h1>
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
    </>
  )
}
