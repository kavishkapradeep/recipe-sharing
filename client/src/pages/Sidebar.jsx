import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=' w-56 p-2 flex flex-row   border-r border-black'>
        <div >
       <ul className='  ml-3 mr-3 gap-5 flex flex-col h-screen items-center   font-[Outfit] font-semibold text-xl'>
         <NavLink className={({isActive})=>`p-4 ${isActive && 'bg-green-200 border-r-2 border-green-950 w-[203px]'}`} to={'/sidebar/add-recipe'} > Add Recipe</NavLink>
         <NavLink className={({isActive})=>`p-4 ${isActive && 'bg-green-200 border-r-2 border-green-950 w-[203px]'}`} to={'/sidebar/list'} > List</NavLink>
         <NavLink className={({isActive})=>`p-4 ${isActive && 'bg-green-200 border-r-2 border-green-950 w-[203px]'}`} to={'/sidebar/favourite'} > Favourite</NavLink>
       </ul>
       </div>
       <Outlet/>
    </div>
  )
}

export default Sidebar
