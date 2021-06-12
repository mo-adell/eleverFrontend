import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { detailsUser, updateUser } from "../actions/userActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { USER_UPDATE_RESET } from "../constants/userConstants"

export default function UserEditScreen(props) {
  const userId = props.match.params.id

  ///states to hold updated info
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  ///getting current user state
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  ///the update action state
  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  const dispatch = useDispatch()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      props.history.push("/userlist")
    }
    if (!user) {
      dispatch(detailsUser(userId))
    } else {
      ///user details but not updated
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, props.history, successUpdate, user, userId])

  ///sending user update action
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }
  return (
    <div>
      <form className="form">
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div>
              <label htmlFor="isAdmin">Is Admin</label>
              <input id="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></input>
            </div>
            <div>
              <button type="submit" className="primary" onClick={submitHandler}>
                Update
              </button>
              <label />
              <button type="submit" className="signin" onClick={() => props.history.push("/userlist")}>
                Cancel
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
