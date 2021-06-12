import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listCategories } from "../actions/categoryActions"
import { createSubcategory } from "../actions/subcategoryActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { SUBCATEGORY_CREATE_RESET } from "../constants/subcategoryConstants"

const CreateSubcategoryScreen = (props) => {
  const dispatch = useDispatch()
  const [subName, setSubName] = useState("")
  const [category, setCategory] = useState("")
  const [style, setStyle] = useState(false)

  const subcategoryCreate = useSelector((state) => state.subcategoryCreate)
  const { success: successCreate } = subcategoryCreate

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SUBCATEGORY_CREATE_RESET })
      props.history.push("/subcategories")
    }
    dispatch(listCategories())
  }, [dispatch, props.history, successCreate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!category) {
      window.alert("Plese select category")
    } else {
      dispatch(createSubcategory({ subName, category }))
    }
  }

  const onChangeHandler = (newName) => {
    if (newName) {
      const newCategory = categories.filter((category) => category.name === newName)[0]._id
      setCategory(newCategory)
      setStyle(true)
    }
  }

  return (
    <form className="form">
      <div>
        <h1>Create Subategory</h1>
      </div>
      <>
        {" "}
        <div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            ///////categories list

            <select className={style ? "selectStyle1" : "selectStyle2"} onChange={(e) => onChangeHandler(e.target.value)}>
              <option disabled selected hidden>
                Choose Category
              </option>
              {categories.map((category) => (
                <option key={category._id} style={{ textAlign: "center" }}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input required id="name" type="text" placeholder="Enter name" onChange={(e) => setSubName(e.target.value)}></input>
        </div>
        <div>
          <label></label>
          <button className="primary" type="submit" onClick={submitHandler}>
            Create Subcategory
          </button>
          <label></label>
          <button className="signin" type="submit" onClick={() => props.history.push("/subcategories")}>
            Cancel
          </button>
        </div>
      </>
    </form>
  )
}

export default CreateSubcategoryScreen
