import React, { useState } from "react"

export default function SearchBox(props) {
  const [name, setName] = useState("")
  const submitHandler = (e) => {
    e.preventDefault()

    props.history.push(`/search/name/${name}`)
    setName("")
  }
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="rowSearch">
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
        <input placeholder="search" value={name} type="text" name="q" id="q" onChange={(e) => setName(e.target.value)}></input>
      </div>
    </form>
  )
}
