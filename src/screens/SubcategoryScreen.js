import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsSubcategory } from "../actions/subcategoryActions"

import { listProducts } from "../actions/productActions"

import Product from "../components/Product"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
const SubcategoryScreen = (props) => {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const subcategoryId = props.match.params.id
  const subcategoryDetails = useSelector((state) => state.subcategoryDetails)
  const { loading: loadingSub, error: errorSub, subcategory } = subcategoryDetails
  console.log(subcategory)
  // console.log(subcategoryDetails)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
    dispatch(detailsSubcategory(subcategoryId))
  }, [dispatch, subcategoryId])

  return (
    <div>
      {loadingSub ? (
        <LoadingBox></LoadingBox>
      ) : errorSub ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="featured">
          <h1>{subcategory.name}</h1>
        </div>
      )}

      {loading ? <LoadingBox></LoadingBox> : error ? <MessageBox variant="danger">{error}</MessageBox> : <div className="row center">{products.map((product) => product.subcategory._id === subcategoryId && <Product key={product._id} product={product}></Product>)}</div>}
    </div>
  )
}

export default SubcategoryScreen
