import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { signin } from "../actions/userActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

export default function SigninScreen(props) {
  ///states to hold email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/"

  ///getting current user state
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo, loading, error } = userSignin

  ///dispatching email and password
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  ////redirect user to previous page
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo])

  return (
    <div>
      <form className="form">
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label>Email address</label>
          <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" onClick={submitHandler}>
            Sign In
          </button>
          <label></label>
          <button className="signin" type="submit" onClick={() => props.history.push("/")}>
            Cancel
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  )
}
