import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listProducts, deleteProduct } from "../actions/productActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { PRODUCT_DELETE_RESET } from "../constants/productConstants"

export default function ProductListScreen(props) {
  ////getting the product list recent state

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  ////checking deleted product state
  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  ////

  const dispatch = useDispatch()
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
    dispatch(listProducts({}))
  }, [dispatch, props.history, successDelete]) ///updating our list of products after delete

  ///sending delete product request
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id))
    }
  }

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={() => props.history.push("/create")}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {/* 
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>} */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>SUBCATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {" "}
                  <img src={product.image} alt={product.name} className="small"></img>
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>{product.subcategory.name}</td>
                <td>{product.brand}</td>
                <td>
                  <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                    Edit
                  </button>
                  <button type="button" className="small" onClick={() => deleteHandler(product)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
