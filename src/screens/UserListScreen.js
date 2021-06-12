import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listUsers, deleteUser } from "../actions/userActions"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"

export default function UserListScreen(props) {
  const dispatch = useDispatch()

  ///current user list state
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  ///delete process state
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsers())
    dispatch({ type: "USER_DETAILS_EMPTY" })
  }, [dispatch, successDelete])

  ////dispatching deleting user request
  const deleteHandler = (user) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(user._id))
    }
  }
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "YES" : "NO"}</td>
                <td>
                  <button type="button" className="small" onClick={() => props.history.push(`/user/${user._id}/edit`)}>
                    Edit
                  </button>
                  <button type="button" className="small" onClick={() => deleteHandler(user)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
