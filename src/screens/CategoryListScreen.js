import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { listCategories, deleteCategory } from "../actions/categoryActions"
import { deleteProductCategory } from "../actions/productActions"
import { deleteRelatedSubs } from "../actions/subcategoryActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { CATEGORY_DELETE_RESET } from "../constants/categoryConstants"

export default function CategoryListScreen(props) {
  ////getting the category list recent state

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  ////checking deleted category state
  const categoryDelete = useSelector((state) => state.categoryDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete

  ////

  const dispatch = useDispatch()

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: CATEGORY_DELETE_RESET })
    }
    dispatch(listCategories())
  }, [dispatch, props.history, successDelete]) ///updating our list of categories after delete

  ///sending delete category request
  const deleteHandler = (category) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteCategory(category._id))
      dispatch(deleteRelatedSubs(category._id)) ///deleting subcategories in this category
      dispatch(deleteProductCategory(category._id)) ///deleting products in this category
    }
  }
  const pushme = () => {
    props.history.push("/addcategory")
  }

  return (
    <div>
      <form className="form">
        <div>
          <div className="row">
            <h1>categories</h1>
            <button type="button" className="primary" onClick={() => pushme()}>
              Create category
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
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td style={{ textAlign: "center" }}>{category.name}</td>

                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <button type="button" style={{ width: 100 }} onClick={() => props.history.push(`/category/${category._id}/edit`)}>
                        Edit
                      </button>
                      <button type="button" style={{ width: 100 }} onClick={() => deleteHandler(category)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </form>
    </div>
  )
}
