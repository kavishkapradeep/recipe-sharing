import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (<div className='flex flex-col  '>
    <div className=' grid  drop-shadow-2xl border-r-2 border-green-950  grid-cols-3 rounded-r-full   justify-evenly bg-green-300 m-5'>
       <div className=' col-span-2  flex flex-col justify-center items-center'>
            <h1 className=' text-6xl font-[Outfit]'>Do you like to <span className=' text-7xl text-green-500'>Try ?</span></h1>
            <h2 className=' text-7xl text-green-700 font-bold mt-3 mb-4'>New Food</h2>
            <div className=' flex gap-2 mt-5  flex-col text-xl'>
            <p className=' text-white'><span className=' mr-3'>New</span>Recipe is Here</p>
            <button className=' bg-green-100 rounded-4xl p-2 cursor-pointer mt-5 hover:drop-shadow-[2px_2px_8px_rgba(200,10,20,0.3)]'>view Recipe <i class="ri-external-link-fill"></i></button>
            </div>
            
       </div>
       <div className=' col-span-1 '>
         <img src={assets.chef} className=' w-72 pt-4  ' alt="" />
       </div>
       
    </div>
    <div className=' flex justify-center p-2 mb-8 mt-3 cursor-pointer animate-bounce'>
    <i class="ri-arrow-down-long-line text-6xl text-black"></i>
    </div>
    
    </div>
  )
}

export default Hero
