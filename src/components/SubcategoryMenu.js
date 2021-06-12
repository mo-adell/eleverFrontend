import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { listSubcategories } from "../actions/subcategoryActions"
import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"

const SubcategoryMenu = ({ categoryID, isAdmin }) => {
  const subcategoryList = useSelector((state) => state.subcategoryList)
  const { loading, error, subcategories } = subcategoryList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listSubcategories())
  }, [dispatch])
  return (
    <>
      <ul className={isAdmin ? "dropdown-content-admin" : "dropdown-content"}>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          subcategories.map(
            (subcategory) =>
              subcategory.category._id === categoryID && (
                <li key={subcategory._id} className="subcategoryMenu">
                  <Link to={`/subcategory/${subcategory._id}`}>{subcategory.name}</Link>
                </li>
              )
          )
        )}
      </ul>
    </>
  )
}

export default SubcategoryMenu
