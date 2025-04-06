import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=' h-14 bg-green-300 flex  justify-between relative bottom-0 w-full'>
        <div className=' flex justify-center items-center ml-7'>
            <img src={assets.logo} className=' h-6' alt="" />
        </div>
        <div className=' flex justify-center items-center mr-9'>
            <p>All Right Reserved © 2025 </p>
        </div>
    </div>
  )
}

export default Footer
