import React from "react"
import { useSelector } from "react-redux"

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  return (
    <div className={userInfo?.isAdmin ? "footerAdmin row center" : "footer row center"}>
      All rights reserved Powered by <h1 style={{ padding: 0, marginLeft: 2, fontWeight: 900, fontStyle: "italic" }}>Muhammed Adel</h1>
    </div>
  )
}

export default Footer
