import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Route } from "react-router-dom"
import { signout } from "../actions/userActions"
import CategoriesBar from "./CategoriesBar"
import SearchBox from "./SearchBox"

const NavBar = () => {
  const dispatch = useDispatch()
  ///current cart state
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  ///signedin user state
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  ///signout actions
  const signoutHandler = () => {
    dispatch({ type: "USER_DETAILS_EMPTY" })
    dispatch({ type: "CART_EMPTY" })
    dispatch(signout())
  }
  return (
    <>
      <div className={userInfo?.isAdmin ? "header headeradmin1 row" : "header header1 row"}>
        <div>
          <Link to="/">Home</Link>
        </div>

        <div>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
              </Link>
              <ul className={userInfo?.isAdmin ? "dropdown-content-admin" : "dropdown-content"}>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/orderhistory">My Orders</Link>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      signoutHandler()
                    }}
                  >
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="dropdown">
              <Link to="#admin">
                Admin <i className="fa fa-caret-down"></i>
              </Link>
              <ul className={userInfo?.isAdmin ? "dropdown-content-admin" : "dropdown-content"}>
                <li>
                  <Link to="/productlist">Products</Link>
                </li>
                <li>
                  <Link to="/orderlist">Orders</Link>
                </li>
                <li>
                  <Link to="/userlist">Users</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/subcategories">Subategories</Link>
                </li>
              </ul>
            </div>
          )}
          <Link style={{ color: "gray", paddingLeft: 0, marginLeft: 0 }} to="#">
            |
          </Link>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
          </Link>
        </div>
      </div>
      <div className="header2">
        {/* <Link to={`/`}>
          <img className="imageLogo" src="/images/logotry31.png" alt="icon" />
        </Link> */}
        <Link to={`/`}>
          <h1 className={userInfo?.isAdmin ? "h1admin" : "h1user"}>ÉLEVER.</h1>
        </Link>

        <Route render={({ history }) => <SearchBox history={history}></SearchBox>}></Route>
      </div>
      <CategoriesBar isAdmin={userInfo?.isAdmin} />
    </>
  )
}

export default NavBar
