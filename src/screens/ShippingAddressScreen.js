import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

export default function ShippingAddressScreen(props) {
  ////getting user state
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  ////getting cart state to destruct shipping address for the user
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!userInfo) {
    props.history.push("/signin")
  }

  ////setting states to recieve new address data

  const [fullName, setFullName] = useState(shippingAddress.fullName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  ////dispatching the address data
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ fullName, address, city, postalCode, country }))
    props.history.push("/placeorder")
  }
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form">
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input type="text" id="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" onClick={submitHandler}>
            Continue
          </button>
          <label />
          <button
            className="signin"
            type="submit"
            onClick={() => {
              props.history.push("/")
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
