import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsCategory, updateCategory } from "../actions/categoryActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { CATEGORY_UPDATE_RESET } from "../constants/categoryConstants"

export default function CategoryEditScreen(props) {
  const categoryId = props.match.params.id
  ////creating states to hold updated data
  const [name, setName] = useState("")

  ////getting current category details
  const categoryDetails = useSelector((state) => state.categoryDetails)
  const { loading, error, category } = categoryDetails

  ///catching updating state
  const categoryUpdate = useSelector((state) => state.categoryUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate

  const dispatch = useDispatch()
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/categories")
    }
    if (!category || category._id !== categoryId || successUpdate) {
      ///successUpdate here too to get the updated data without refreshing by dispatching
      dispatch({ type: CATEGORY_UPDATE_RESET })
      dispatch(detailsCategory(categoryId))
    } else {
      setName(category.name)
    }
  }, [category, dispatch, categoryId, successUpdate, props.history])

  ////updating category request
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateCategory({
        _id: categoryId,
        name,
      })
    )
  }
  return (
    <div>
      <form className="form">
        <div>
          <h1>Edit Category {categoryId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div>
              <label></label>
              <button className="sign in" type="submit" onClick={submitHandler}>
                Update
              </button>
              <label></label>
              <button className="primary" type="submit" onClick={() => props.history.push("/categories")}>
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
