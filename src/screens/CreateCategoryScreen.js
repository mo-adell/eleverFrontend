import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createCategory } from "../actions/categoryActions"
import { CATEGORY_CREATE_RESET } from "../constants/categoryConstants"

const CreateCategoryScreen = (props) => {
  const dispatch = useDispatch()
  const [category, setCategory] = useState({
    name: "",
  })

  const categoryCreate = useSelector((state) => state.categoryCreate)
  const { success: successCreate } = categoryCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET })
      props.history.push("/categories")
    }
  }, [dispatch, props.history, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createCategory(category))
  }
  return (
    <form className="form">
      <div>
        <h1>Create Category</h1>
      </div>
      <>
        <div>
          <label htmlFor="name">Name</label>
          <input required id="name" type="text" placeholder="Enter name" onChange={(e) => setCategory({ ...category, name: e.target.value })}></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit" onClick={submitHandler}>
            Create Category
          </button>
          <label></label>
          <button className="sign in" type="submit" onClick={() => props.history.push("/categories")}>
            Cancel
          </button>
        </div>
      </>
    </form>
  )
}

export default CreateCategoryScreen
