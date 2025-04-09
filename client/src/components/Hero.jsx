import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { RecipeContext } from '../context/RecipeContext'
import { Link } from 'react-scroll'

const Hero = () => {

  const {navigate} = useContext(RecipeContext)

  return (<div className='mt-14 flex flex-col  '>
    <div className=' grid mt-20  drop-shadow-2xl border-r-2 border-green-950  grid-cols-3 rounded-r-full   justify-evenly bg-green-300 m-5'>
       <div className=' col-span-2  flex flex-col justify-center items-center'>
            <h1 className=' text-6xl font-[Outfit]'>Do you like to <span className=' text-7xl text-green-500'>Try ?</span></h1>
            <h2 className=' text-7xl text-green-700 font-bold mt-3 mb-4'>New Food</h2>
            <div className=' flex gap-2 mt-5  flex-col text-xl'>
            <p className=' text-white'><span className=' mr-3'>New</span>Recipe is Here</p>
            <button onClick={()=>navigate('/list')} className=' bg-green-100 rounded-4xl p-2 cursor-pointer mt-5 hover:drop-shadow-[2px_2px_8px_rgba(200,10,20,0.3)]  hover:bg-green-200  hover:scale-105 duration-300 hover:rounded'>view Recipe <i class="ri-external-link-fill"></i></button>
            </div>
            
       </div>
       <div className=' col-span-1 '>
         <img src={assets.chef} className=' w-72 pt-4  ' alt="" />
       </div>
       
    </div>
    <div  className=' flex justify-center p-2 mb-8 mt-3 cursor-pointer animate-bounce'>
      <Link to='category' smooth='true'>
    <i class="ri-arrow-down-long-line text-6xl text-black"></i>
    </Link>
    </div>
    
    </div>
  )
}

export default Hero
