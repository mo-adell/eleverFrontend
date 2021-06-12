import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsSubcategory, updateSubcategory } from "../actions/subcategoryActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { SUBCATEGORY_UPDATE_RESET } from "../constants/subcategoryConstants"

export default function SubcategoryEditScreen(props) {
  const subcategoryId = props.match.params.id
  ////creating states to hold updated data
  const [name, setName] = useState("")

  ////getting current subcategory details
  const subcategoryDetails = useSelector((state) => state.subcategoryDetails)
  const { loading, error, subcategory } = subcategoryDetails

  ///catching updating state
  const subcategoryUpdate = useSelector((state) => state.subcategoryUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = subcategoryUpdate

  const dispatch = useDispatch()
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/subcategories")
    }
    if (!subcategory || subcategory._id !== subcategoryId || successUpdate) {
      ///successUpdate here too to get the updated data without refreshing by dispatching
      dispatch({ type: SUBCATEGORY_UPDATE_RESET })
      dispatch(detailsSubcategory(subcategoryId))
    } else {
      setName(subcategory.name)
    }
  }, [subcategory, dispatch, subcategoryId, successUpdate, props.history])

  ////updating subcategory request
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateSubcategory({
        _id: subcategoryId,
        name,
      })
    )
  }
  return (
    <div>
      <form className="form">
        <div>
          <h1>Edit Subcategory {subcategoryId}</h1>
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
              <button className="primary" type="submit" onClick={submitHandler}>
                Update
              </button>
              <label></label>
              <button className="primary" type="submit" onClick={() => props.history.push("/subcategories")}>
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
