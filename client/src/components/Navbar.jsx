import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import  { RecipeContext } from '../context/RecipeContext'
import { Link } from 'react-scroll'

const Navbar = () => {
const [userIcon,setUserIcon] = useState(false)
const {navigate} =useContext(RecipeContext);

  return (
    <div className=' fixed top-0 w-full z-30 flex justify-between p-2 h-14  bg-green-200/50 border-b-2 border-green-400'>
      <div>
        
        <img onClick={()=>navigate('/')}  src={assets.logo} alt="" className=' w-32 p-2 cursor-pointer' />
        
      </div>
      <div className=' flex gap-5 p-2'>
         <Link to='home'smooth='true' className=' font-[Outfit] cursor-pointer hover:pb-6 hover:border-b-2   hover:border-green-950 '>Home</Link>
         <Link to='about' smooth='true' className=' font-[Outfit] cursor-pointer hover:pb-6 hover:border-b-2 hover:border-green-950 '>About us</Link>
         {
            userIcon?<></>:<><p onClick={()=>navigate('/dashboard')} className='cursor-pointer hover:pb-6 font-[Outfit] hover:border-b-2 hover:border-green-950 '>Dashboard</p></>
         }
      </div>
      <div >
        {userIcon?<>
        <div className=' hover:bg-green-400 cursor-pointer p-0.5 border border-green-400 rounded-full w-24 flex justify-center items-center bg-green-100'>
            <p className=' font-[Outfit] text-2xl font-semibold text-green-800'>LogIn</p>
        </div>
        </>:<div className=' group relative  '>
        <div className=' cursor-pointer  border border-green-400 rounded-full w-10 h-10 flex justify-center'><img src={assets.profile_icon} alt="" /></div>
        <div className=' hidden group-hover:flex  absolute right-0 w-22 p-3 justify-center  bg-white'>
             <p className=' cursor-pointer font-[Outfit] font-semibold'>logout</p>
            </div> 
        </div>}
        
      </div>
    </div>
  )
}

export default Navbar
