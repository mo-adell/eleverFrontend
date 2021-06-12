import React from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"

export default function Product(props) {
  const { product } = props
  return (
    <div key={product._id} className="product card">
      <div className="productImage">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <Link to={`/product/${product._id}`}>
          <button>Quick View</button>
        </Link>
      </div>
      <div className="card-body">
        <Link style={{ textTransform: "initial" }} to={`/product/${product._id}`}>
          {product.name}
        </Link>
        <Rating className="rating1" rating={product.rating} numReviews={product.numReviews}></Rating>
        <div className="price">${product.price}</div>
      </div>
    </div>
  )
}
