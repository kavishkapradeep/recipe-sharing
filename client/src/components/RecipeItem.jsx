import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'

const RecipeItem = () => {

  const {recipeId,url,userId,handleFavourite} = useContext(RecipeContext)
  const [item,setItem]=useState([])

  const handleItem = async ()=>{
     try {
        const res = await fetch(`${url}/Recipe/${recipeId}`)
        const data = await res.json()
        console.log(data);
        setItem(data)
     } catch (error) {
       console.log(error);
       
     }
  }

  useEffect(()=>{
   handleItem()
  },[])
 
  useEffect(()=>{

  },[item])
  return (
    <div>
        <div className=' p-2 m-2'>
          {/*path set*/}
           <div className=' mt-14 text-sm text-gray-600 mb-4'>
               <p>list/{item.category}/{item.name}</p>
           </div>
           <div>
              
              <div className=' bg-green-300/50 py-8 p-2 flex justify-evenly'>
                 <div className=' border p-1  rounded-xl bg-green-500'>
                  <img className=' w-96 h-80' src={item.image} alt="" srcset="" /></div>
                 <div className=' bg-green-200 p-5 border border-green-950 rounded-bl-4xl rounded-tr-4xl'>
                    <h2 className=' mb-8 text-6xl font-semibold font-[Outfit] mr-20'>{item.name}</h2>
                    <div>
                      <p className=' text-lg'>category: <span className=' text-xl font-semibold text-green-900'>{item.category}</span></p>  
                    </div>  
                    <div className=' flex flex-col  mt-14 gap-5 font-semibold'>
                      <div onClick={()=>handleFavourite()} className=' cursor-pointer flex bg-green-400 justify-evenly p-2 rounded-lg'><i class="ri-add-circle-line "></i><p className=' '>Add to Favourite</p></div> 
                      <p className=' cursor-pointer flex bg-green-400 justify-evenly p-2 rounded-lg'><i class="ri-share-forward-fill "></i> <span className=' '>Share</span> </p> 
                    </div>   
                 </div>
              </div>
              <div className=' p-4 flex flex-col justify-center bg-green-300/50'>
                <p className=' text-2xl font-bold flex  justify-center'>Method</p>
                <div className=' p-4 bg-green-300 ml-50 rounded-2xl mr-50 '>
                 <p className=' text-lg font-bold flex  rounded-4xl bg-green-50 p-5   flex-col' dangerouslySetInnerHTML={{__html:item.description}}></p>
                 </div>
              </div>
           </div>
        </div>
    </div>
  )
}

export default RecipeItem
