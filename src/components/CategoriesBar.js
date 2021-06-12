import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { listCategories } from "../actions/categoryActions"
import LoadingBox from "./LoadingBox"
import MessageBox from "./MessageBox"
import SubcategoryMenu from "./SubcategoryMenu"

const CategoriesBar = ({ isAdmin }) => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])
  return (
    <>
      <div className={!isAdmin ? "header header3" : "header headeradmin3"}>
        <div style={{ display: "inline-flex" }}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            categories.map((category) => (
              <div className="dropdown" key={category._id}>
                <Link className="categoryName" style={{ margin: 20, paddingTop: 15 }} to="#">
                  {category.name} <i className="fa fa-caret-down"></i>
                </Link>
                <SubcategoryMenu isAdmin={isAdmin} categoryID={category._id} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default CategoriesBar
