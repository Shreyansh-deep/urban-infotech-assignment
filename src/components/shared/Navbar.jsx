import React from 'react'
import logo from "../../assets/logo_img.png"

const Navbar = ({children}) => {
  return (
    <div className="bg-primary w-full h-19.5 items-center flex mt-3 rounded-xl justify-between px-4">
        <div className="rounded-full bg-white justify-center w-17 h-17 flex items-center ">
          <img src={logo} alt="" className="w-16 h-14" />
        </div>
        <div>{children}</div>
      </div>
  )
}

export default Navbar