import React, { useContext, useEffect, useState } from 'react'
import { assets, food_list } from '../assets/assets'
import { RecipeContext } from '../context/RecipeContext'
import { Link } from 'react-router-dom'

const RecipeList = () => {
    const {userId,fetchlist,searchFilter,favlist,setSearchFilter,recipeId,setRecipeId,navigate,fetchFavourite}= useContext(RecipeContext)
    
    const [filter,setFilter]= useState(fetchlist)
    

    const handleSearchChange = (e)=>{
        setSearchFilter(e.target.value);
    }
//filter search item
    useEffect(() => {
        const filteredRecipe = fetchlist.filter((item) =>
            item.name.toLowerCase().includes(searchFilter.toLowerCase())
        );
    
        if (searchFilter.trim().length > 0) {
            setFilter(filteredRecipe);
        } else {
            setFilter(fetchlist);
        }
      
        
    }, [fetchlist, searchFilter]);
    
    //get recipeid 
    const handelRecipe = async (id)=>{
        await setRecipeId(id)
        
        navigate(`/list/${id}`)
    }
    useEffect(()=>{
        
         
         
    },[recipeId])

    useEffect(()=>{
        fetchFavourite()
        
        
    },[userId])
    useEffect(()=>{
       
    },[favlist])

  return (
    <div  >
        <div >
        {/*Search Bar */}
        <div className=' pt-20 flex justify-center items-center '>
            <input type='text' value={searchFilter} onChange={handleSearchChange} className=' bg-green-200 outline-none h-9 w-96 max-sm:w-48 mr-2 p-2'  />
            <img  className='w-9 cursor-pointer  bg-green-200 p-1 -ml-2 rounded-r-full' src={assets.search_icon} alt="" />
        </div>
        <div className=' flex justify-center text-3xl font-[Outfit] font-semibold mt-5'>
      <h2 className=' mb-3'>All Recipe List</h2>
      </div>
      </div>
      {/* Product Display */}
      <div className=' grid grid-cols-4  max-sm:grid-cols-2 max-md:grid-cols-3'>
         { filter.map((item,index)=>{
            return(
                
                <div key={index}  onClick={()=>handelRecipe(item.id)} className=' cursor-pointer flex flex-col justify-center items-center p-2 bg-gradient-to-t from-green-400 to-green-200  rounded-xl m-2'>
                    <div  className=' flex flex-col justify-center items-center cursor-pointer'>
                    <p className=' text-2xl pt-4 pb-4 font-semibold font-[Outfit]'>{item.name}</p>
                    <img src={item.image} alt="" className=' w-40 h-40 rounded-full border-2 border-green-950 ' />
                    <div className=' flex pt-4 font-semibold justify-center items-center p-2 flex-col'>
                       <p>Description :</p> <p  className=' text-black/50 w-full text-[10px]' dangerouslySetInnerHTML={{__html:item.description.slice(0,500)}}></p>
                    </div>
                    <div className=' flex justify-between p-4 gap-6'>
                    <p className=' text-xl font-semibold font-[Outfit]'>{item.category}</p>
                        <div>
                        {favlist.includes(item.id)?<img src={assets.favorite} alt=""  className='w-6 h-6'/>: <img className='w-6 h-6' src={assets.love}/>}
                        </div>
                       
                    </div>
                    <div className='  flex gap-2 p-2 bg-green-200 cursor-pointer rounded-2xl'><i class="ri-add-circle-line"></i><p>Add to Favourite</p></div>
                    </div>
                </div>
            )
         })

         }
      </div>
    </div>
  )
}

export default RecipeList
