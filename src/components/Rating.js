import React from "react"

export default function Rating(props) {
  const { rating, numReviews, caption } = props
  return (
    <div className="rating">
      <span>
        <i className={rating >= 1 ? "fa fa-star faIcon fa-sm" : rating >= 0.5 ? "fa fa-star-half-o faIcon fa-sm" : "fa fa-star-o faIcon fa-sm"}></i>
      </span>
      <span>
        <i className={rating >= 2 ? "fa fa-star faIcon fa-sm" : rating >= 1.5 ? "fa fa-star-half-o faIcon fa-sm" : "fa fa-star-o faIcon fa-sm"}></i>
      </span>
      <span>
        <i className={rating >= 3 ? "fa fa-star faIcon fa-sm" : rating >= 2.5 ? "fa fa-star-half-o faIcon fa-sm" : "fa fa-star-o faIcon fa-sm"}></i>
      </span>
      <span>
        <i className={rating >= 4 ? "fa fa-star faIcon fa-sm" : rating >= 3.5 ? "fa fa-star-half-o faIcon fa-sm" : "fa fa-star-o faIcon fa-sm"}></i>
      </span>
      <span>
        <i className={rating >= 5 ? "fa fa-star faIcon fa-sm" : rating >= 4.5 ? "fa fa-star-half-o faIcon fa-sm" : "fa fa-star-o faIcon fa-sm"}></i>
      </span>
      {caption ? <span>{caption}</span> : <span> {numReviews + " reviews"}</span>}
    </div>
  )
}
