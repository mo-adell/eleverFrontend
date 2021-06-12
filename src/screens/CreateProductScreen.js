import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../actions/productActions"
import FileBase from "react-file-base64"
import { listCategories } from "../actions/categoryActions"
import { listSubcategories } from "../actions/subcategoryActions"
import MessageBox from "../components/MessageBox"
import LoadingBox from "../components/LoadingBox"

export default function CreateProductScreen(props) {
  const dispatch = useDispatch()

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    subcategory: "",
    countInStock: "",
    brand: "",
    description: "",
  })

  const [selectedSubs, setSelectedSubs] = useState([]) ////selecting subcategories for specific category and holding it here
  const [style, setStyle] = useState(false)

  ////getting new product state
  const productCreate = useSelector((state) => state.productCreate)
  const { success: successCreate } = productCreate

  const categoryList = useSelector((state) => state.categoryList)
  const { loading, error, categories } = categoryList

  const subcategoryList = useSelector((state) => state.subcategoryList)
  const { subcategories } = subcategoryList

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: "PRODUCT_CREATE_RESET" })
      props.history.push("/productlist")
    }

    dispatch(listCategories())
    dispatch(listSubcategories())
  }, [dispatch, props.history, successCreate])

  ///dispatching new product data to action
  const submitHandler = (e) => {
    e.preventDefault()
    if (!product.image) {
      window.alert("Please submit an image")
    } else if (!product.category) {
      window.alert("Please choose category")
    } else {
      dispatch(createProduct(product))
    }
  }

  ////getting the category from select menu

  const onChangeHandler = (newName) => {
    if (newName) {
      const newCategory = categories.filter((category) => category.name === newName)[0]._id
      setProduct({ ...product, category: newCategory })
      console.log(newName)
      console.log(subcategories)
      const newSubCategories = subcategories.filter((subcategory) => subcategory.category.name === newName)
      setSelectedSubs(newSubCategories)

      setStyle(true)
    }
  }
  const onChangeSub = (newName) => {
    if (newName) {
      const newSub = selectedSubs.filter((subcategory) => subcategory.name === newName)[0]._id
      setProduct({ ...product, subcategory: newSub })
      setStyle(true)
    }
  }
  return (
    <div>
      <form className="form">
        <div>
          <h1>Create Product</h1>
        </div>
        <>
          <div>
            <label htmlFor="name">Name</label>
            <input required id="name" type="text" placeholder="Enter name" onChange={(e) => setProduct({ ...product, name: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input required id="price" type="number" placeholder="Enter price" onChange={(e) => setProduct({ ...product, price: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setProduct({ ...product, image: base64 })} />
          </div>
          <label htmlFor="category">Category</label>
          <div>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              ///////categories list

              <select className={style ? "selectStyle1" : "selectStyle2"} required onChange={(e) => onChangeHandler(e.target.value)}>
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
          <label htmlFor="category">Subategory</label>
          <div>
            {/* ///////subcategories list */}

            <select className={style ? "selectStyle1" : "selectStyle2"} required onChange={(e) => onChangeSub(e.target.value)}>
              <option disabled selected hidden>
                Choose Subcategory
              </option>
              {selectedSubs.map((subcategory) => (
                <option key={subcategory._id} style={{ textAlign: "center" }}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input required id="brand" type="text" placeholder="Enter brand" onChange={(e) => setProduct({ ...product, brand: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor="countInStock">Count In Stock</label>
            <input required id="countInStock" type="number" placeholder="Enter countInStock" onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" rows="3" type="text" placeholder="Enter description" onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
          </div>
          <div>
            <label></label>
            <button className="primary" type="submit" onClick={submitHandler}>
              Create Product
            </button>
            <label></label>
            <button className="signin" type="submit" onClick={() => props.history.push("/productlist")}>
              Cancel
            </button>
          </div>
        </>
      </form>
    </div>
  )
}
