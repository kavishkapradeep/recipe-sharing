import React, { useContext, useEffect, useState } from 'react'
import { assets, food_list, menu_list } from '../assets/assets'
import { RecipeContext } from '../context/RecipeContext'

const Category = () => {

    const [category,setCategory] = useState('Salad')
    const {navigate,fetchlist,recipeId,setRecipeId}=useContext(RecipeContext)
    
    const handelRecipe = async (id)=>{
            await setRecipeId(id)
            
            navigate(`/list/${id}`)
        }
        useEffect(()=>{
            
             
        },[recipeId])
    
    useEffect(()=>{

    },[fetchlist])


  return (
    <div id='category' className=' mt-3 flex flex-col items-center justify-center'>
        <h2 className=' text-4xl mb-5 font-[Outfit] font-semibold'>Category</h2>
      <div>
         <div className=' flex mt-8 gap-5 bg-gradient-to-br from-green-200 rounded-full to-green-400 p-6'>
            {menu_list.map((item,index)=>(
                <div key={index} className=' flex flex-col items-center ml-3 cursor-pointer' onClick={()=>setCategory(item.menu_name)}>
                    <img src={item.menu_image} className=' w-24' alt="" />
                    <p className=' mt-3 font-semibold text-xl'>{item.menu_name}</p>
                </div>
            ))}
         </div>
      </div>
      <div className=' mt-5 flex gap-5 p-1'>
          {
            fetchlist.filter((item)=>item.category === category).slice(0,4).map((item,index)=>{
                return(
                    <div key={index} onClick={()=>handelRecipe(item.id)} className='hover:bg-green-300 cursor-pointer p-2 bg-gradient-to-l from-green-400 to-green-200 rounded-3xl'>
                    <div className=' p-2  hover:scale-105  300 duration-300'>
                        <div>
                            <img src={item.image} className=' w-56 h-48 border-2 border-green-900 rounded-2xl' alt="" />
                        </div>
                        <div className=' flex justify-between p-2'>
                            <p className=' text-xl font-[Outfit]'>{item.name}</p>
                            
                            <div className=' mt-2 cursor-pointer'>
                            
                                {item.favourite?
                               ( <img className=' w-4 ' src={assets.favorite} alt="" />)
                            :   ( <img className=' w-4' src={assets.love} alt="" />)
                                
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
                )
                
})
          }
      </div>
      
      <div className=' mt-5'>
         <button onClick={()=>navigate('/list')} className=' cursor-pointer bg-green-300 p-3 text-2xl rounded-4xl font-[Outfit] font-semibold hover:bg-green-200  hover:scale-105 duration-300 hover:rounded'>View more <i class="ri-external-link-fill"></i></button>
      </div>
      < hr  className=' h-1 w-full mt-3 bg-green-900'/>
    </div>
  )
}

export default Category
