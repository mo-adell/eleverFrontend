import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserProfile } from "../actions/userActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

export default function ProfileScreen(props) {
  ////states to update profile elements

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [name, setName] = useState(userInfo.name)
  const [email, setEmail] = useState(userInfo.email)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()

  ////getting our user info recent state

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile

  useEffect(() => {
    setName(name)
    setEmail(email)
  }, [dispatch, userInfo._id, userInfo, name, email])

  const submitHandler = (e) => {
    e.preventDefault()

    //// dispatch update profile

    if (password !== confirmPassword) {
      alert("Password and Confirm Password Are Not Matched")
    } else {
      dispatch(updateUserProfile({ userId: userInfo._id, name, email, password }))
    }
  }
  return (
    <div>
      <form className="form">
        <div>
          <h1>User Profile</h1>
        </div>
        <>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
          {successUpdate && <MessageBox variant="success">Profile Updated Successfully</MessageBox>}
          <div>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required></input>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div>
            <label htmlFor="confirmPassword">confirm Password</label>
            <input id="confirmPassword" type="password" placeholder="Enter confirm password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
          </div>
          <div>
            <label />
            <button className="primary" type="submit" onClick={submitHandler}>
              Update
            </button>
            <label />
            <button className="signin" type="submit" onClick={() => props.history.push("/")}>
              Cancel
            </button>
          </div>
        </>
      </form>
    </div>
  )
}
