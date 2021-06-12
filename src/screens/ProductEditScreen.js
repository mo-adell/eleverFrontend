import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsProduct, updateProduct } from "../actions/productActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import FileBase from "react-file-base64"
import { listCategories } from "../actions/categoryActions"
import { listSubcategories } from "../actions/subcategoryActions"

export default function ProductEditScreen(props) {
  const dispatch = useDispatch()

  const productId = props.match.params.id
  ////creating states to hold updated data
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [countInStock, setCountInStock] = useState("")
  const [brand, setBrand] = useState("")
  const [description, setDescription] = useState("")

  ////getting current product details
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  ///catching updating state
  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  ////getting full categories and subcategories lists
  const categoryList = useSelector((state) => state.categoryList)
  const { loading: loadingCategories, error: errorCategories, categories } = categoryList

  const subcategoryList = useSelector((state) => state.subcategoryList)
  const { loading: loadingSub, error: errorSub, subcategories } = subcategoryList
  ///////////////////////////////////

  const [start, setStart] = useState(true)

  ////side effects
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist")
    }
    if (!product || product._id !== productId || successUpdate) {
      ///successUpdate here too to get the updated data without refreshing by dispatching
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch(detailsProduct(productId))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setCategory(product.category)
      setSubcategory(product.subcategory)
      setCountInStock(product.countInStock)
      setBrand(product.brand)
      setDescription(product.description)
    }

    dispatch(listCategories())
    dispatch(listSubcategories())
  }, [product, dispatch, productId, successUpdate, props.history])

  ////updating product request
  const submitHandler = (e) => {
    e.preventDefault()
    if (!subcategory) {
      window.alert("choose subcategory")
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          category,
          subcategory,
          brand,
          countInStock,
          description,
        })
      )
    }
  }

  const onChangeHandler = (newName) => {
    const newCategory = categories.filter((category) => category.name === newName)[0]
    setCategory(newCategory)
    setSubcategory("")

    setStart(false)
    console.log(category.name)
  }
  const onChangeSub = (newName) => {
    const newSubcategory = subcategories.filter((subcategory) => subcategory.name === newName && subcategory.category.name === category.name)[0] //two conditions to not conflict subcategories with same name in differenct categories
    setSubcategory(newSubcategory)
  }

  return (
    <div>
      <form className="form">
        <div>
          <h1>Edit Product {productId}</h1>
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
              <label htmlFor="price">Price</label>
              <input id="price" type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setImage(base64)} />
            </div>
            <label htmlFor="category">Category</label>

            {/*///////// categories list */}
            <div>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <select defaultValue={category.name} onChange={(e) => onChangeHandler(e.target.value)}>
                  {/* <option></option> */}
                  {categories.map((newCategory) => (
                    <option key={newCategory._id} style={{ textAlign: "center" }}>
                      {newCategory.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {/*///////// subcategories list */}
            <label htmlFor="subcategory">Subcategory</label>

            <div>
              {loadingSub ? (
                <LoadingBox></LoadingBox>
              ) : errorSub ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <select defaultValue={start && subcategory.name} onChange={(e) => onChangeSub(e.target.value)}>
                  {/* <option>{subcategory.name}</option> */}

                  {!start && (
                    <option disabled selected>
                      Choose Subcategory
                    </option>
                  )}

                  {subcategories.map(
                    (newSub) =>
                      newSub.category.name === category.name && (
                        <option key={newSub._id} style={{ textAlign: "center" }}>
                          {newSub.name}
                        </option>
                      )
                  )}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="brand">Brand</label>
              <input id="brand" type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input id="countInStock" type="number" placeholder="Enter countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" rows="3" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" onClick={submitHandler} type="submit">
                Update
              </button>
              <label></label>
              <button className="signin" type="submit" onClick={() => props.history.push("/productlist")}>
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
