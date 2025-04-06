import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div id='about' className=' flex flex-col justify-center items-center mt-6 mb-8'>
       <h1 className=' text-4xl mb-4'>About us</h1>
       <div className=' flex  w-[880px] bg-gradient-to-b from-green-200 to-green-400 justify-center items-center p-5'>
        <div>
            <p className=' text-lg'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo eius at, laudantium 
                sint pariatur, magni fugit voluptates similique eaque aut inventore modi nam ex aliquid hic!
                 Temporibus impedit explicabo eius?
            </p>
        </div>
        <div className=' '>
            <img src={assets.plate} alt=""  />
        </div>
       </div>
    </div>
  )
}

export default About
