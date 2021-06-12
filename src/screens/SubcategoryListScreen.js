import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { listCategories } from "../actions/categoryActions"
import { listSubcategories, deleteSubcategory } from "../actions/subcategoryActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { SUBCATEGORY_DELETE_RESET } from "../constants/subcategoryConstants"

export default function SubcategoryListScreen(props) {
  const [start, setStart] = useState(true) ////to push the full list on page start
  const [selectedSubs, setSelectedSubs] = useState([]) ////holding selected category subs list

  ////getting the subcategory list recent state
  const subcategoryList = useSelector((state) => state.subcategoryList)
  const { loading, error, subcategories } = subcategoryList

  ////checking deleted subcategory state
  const subcategoryDelete = useSelector((state) => state.subcategoryDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = subcategoryDelete

  ///getting category list state to filter
  const categoryList = useSelector((state) => state.categoryList)
  const { loading: loadingCategory, error: errorCategory, categories } = categoryList

  const dispatch = useDispatch()

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: SUBCATEGORY_DELETE_RESET })
    }
    dispatch(listSubcategories())
    dispatch(listCategories())
  }, [dispatch, props.history, successDelete]) ///updating our list of categories after delete

  ///sending delete subcategory request
  const deleteHandler = (subcategory) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteSubcategory(subcategory._id))
    }
  }

  const onChangeHandler = (newName) => {
    setStart(false)
    /////filtering subcategories
    if (newName && newName !== "All Categories") {
      const newSubCategories = subcategories.filter((subcategory) => subcategory.category.name === newName)

      setSelectedSubs(newSubCategories)
    }

    ////getting full list with selecting all categories again
    if (newName === "All Categories") {
      setSelectedSubs(subcategories)
    }
  }

  return (
    <div>
      <form className="form">
        <div>
          <div className="row">
            <h1>Subcategories</h1>
            {loadingCategory ? (
              <LoadingBox></LoadingBox>
            ) : errorCategory ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              ///////categories list

              <select onChange={(e) => onChangeHandler(e.target.value)}>
                <option selected>All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} style={{ textAlign: "center" }}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
            <button type="button" className="primary" onClick={() => props.history.push("/addsubcategory")}>
              Create Subcategory
            </button>
          </div>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

          {loading ? (
            <LoadingBox></LoadingBox> ////checking if list is ready
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>SUBCATEGORY</th>
                  <th style={{ textAlign: "center" }}>CATEGORY</th>
                  <th style={{ textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>
              {/* /////Pushing the list with page launching */}
              {start ? (
                <tbody>
                  {subcategories.map((subcategory) => (
                    <tr key={subcategory._id}>
                      <td style={{ textAlign: "center" }}>{subcategory.name}</td>
                      <td style={{ textAlign: "center" }}>{subcategory.category.name}</td>

                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <button type="button" style={{ width: 100 }} onClick={() => props.history.push(`/subcategory/${subcategory._id}/edit`)}>
                          Edit
                        </button>

                        <button type="button" style={{ width: 100 }} onClick={() => deleteHandler(subcategory)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                ///////getting the list with category filtering
                <tbody>
                  {selectedSubs.map((subcategory) => (
                    <tr key={subcategory._id}>
                      <td style={{ textAlign: "center" }}>{subcategory.name}</td>
                      <td style={{ textAlign: "center" }}>{subcategory.category.name}</td>

                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <button type="button" style={{ width: 100 }} onClick={() => props.history.push(`/subcategory/${subcategory._id}/edit`)}>
                          Edit
                        </button>
                        <button type="button" style={{ width: 100 }} onClick={() => deleteHandler(subcategory)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}
        </div>
      </form>
    </div>
  )
}
