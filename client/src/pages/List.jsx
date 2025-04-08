import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'

const List = () => {

  const [list,setList] = useState([])
  const {userId,url,recipeId,setRecipeId,navigate}= useContext(RecipeContext)
  const [favorite,setFavourite] = useState('')

  const handleList = async ()=>{

      const res = await fetch(`${url}/Recipe`)
      const data = await res.json();

      const userRecipes = data.filter(u=>u.userId === userId)
      
      setList(userRecipes)
      
      
      
  }

  const handleDelete = async (id)=>{
    
     try {
       await fetch(`${url}/Recipe/${id}`,{
        method:'DELETE',
      })
        
      handleList()
     } catch (error) {
       console.log(error);
       
     }

  }
  
  const handleEdit = async (id)=>{
    try {
      await setRecipeId(id)
      navigate('sidebar/update')
    } catch (error) {
       console.log(error);
       
    }
  }

  const handleUpdate = async (id)=>{
      try {
         const data = await fetch(`${url}/Recipe/${id}`)

         const recipe =await data.json()
         
         const updateFavourite = !recipe.favourite;

         await fetch(`${url}/Recipe/${id}`,{
           method:'PUT',
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify({
             ...recipe,
             favourite:updateFavourite
           })
         })
         //reload list
      handleList()         
      } catch (error) {
        console.log(error);
        
      }
  }

  useEffect(()=>{
    handleList()
    
    
    
    
  },[userId,recipeId])

  useEffect(()=>{
    
    
    
  },[list])

  return (
    <div>
         <div className=' bg-green-400/50 p-2 mt-16 drop-shadow-[0px_0px_10px_rgba(0,0,0,0.2)]'>
            <div className=' flex  justify-center '>
               <h1 className=' text-3xl font-semibold font-[Outfit] p-2'>Recipe List</h1>
            </div>
             <div className=' flex-col justify-center  m-5 p-2'>
                <table className=' w-full  '>
                    <thead className=' '>
                       <tr className=' flex text-xl font-semibold border-b-2 border-green-950  justify-between w-full  gap-9 p-2'>
                          <td>Index</td>
                          <td className=' px-4 text-left'>Name</td>
                          <td className=' px-4 text-left'>Category</td>
                          <td className=' px-4 text-left'>Image</td>
                          <td className=' px-4 text-left'>Favourite</td>
                          <td className='  text-left'>Edit</td>
                          <td>Delete</td>
                       </tr>
                    </thead>
                    <tbody>
                        {list.length >0 ? (
                          list.map((recipe , index)=>(
                            <tr key={index} className=' flex  items-center mt-2 border-b border-green-900/80 justify-between'>
                                <td className=' px-4  text-center'>{index+1}</td>
                                <td className=' -ml-4 text-left flex items-center w-2  '>{recipe.name}</td>
                                <td className=' px-4 w-14  text-left flex items-center'>{recipe.category}</td>
                                <td> <img className='  w-12 h-12 p-1' src={recipe.image} alt="" /></td>
                                <td className=' -mr-4' > <input onChange={()=>handleUpdate(recipe.id)} className=' cursor-pointer' type="checkbox" name="" id="" checked={recipe.favourite}/></td>
                                <td className=' pl-8' ><button onClick={()=>handleEdit(recipe.id)} className='-mr-8 cursor-pointer rounded-lg bg-green-200 p-1'>Edit</button></td>
                                <td ><button  onClick={()=>handleDelete(recipe.id)} className=' cursor-pointer rounded-lg bg-green-200 p-1'>Delete</button></td>
                            </tr>
                          ))
                        )
                          :''
                        }
                    </tbody>
                </table>
             </div>
         </div>
    </div>
  )
}

export default List
