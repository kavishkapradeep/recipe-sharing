import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import CountDown from '../components/CountDown'

const Favourite = () => {
  const [list,setList] = useState([])
  const {userId,url,recipeId,setRecipeId} = useContext(RecipeContext)

  const handleList = async ()=>{
     const res = await fetch(`${url}/user/${userId}`)
     const data = await res.json()
    
     const res2 = await fetch(`${url}/Recipe`)
     const data2 =  await res2.json()

     console.log(data);
     console.log(data2);
     
    
     const favoriteRecipeList = data2.filter(recipe =>
      data.favouritelist.includes(recipe.id)
     
    )
    setList(favoriteRecipeList)
    console.log("Favorite Recipes:", favoriteRecipeList)
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
  },[])
  useEffect(()=>{

  },[list])
  return (
    <div>
        <div className=' mt-24 bg-green-200 p-2'>
            <div className=' flex justify-center'>
               <h2 className=' text-3xl font-semibold mb-4'>Favourite List</h2>
            </div>
            <div>
            <table >
                    <thead className=' '>
                       <tr className=' flex text-xl font-semibold border-b-2 border-green-950  justify-between w-full  gap-9 p-2'>
                          <td>Index</td>
                          <td>Name</td>
                          <td>Category</td>
                          <td>Image</td>
                          
                          
                          <td>Delete</td>
                       </tr>
                    </thead>
                    <tbody>
                        {list.length >0 ? (
                          list.map((recipe , index)=>(
                            <tr key={index} className=' flex  mt-2 border-b border-green-900/80 justify-between'>
                                <td className=' flex ml-3'>{index+1}</td>
                                <td className=' w-2'>{recipe.name}</td>
                                <td className=' w-14 px-6'>{recipe.category}</td>
                                <td> <img className=' w-12 h-12  -mr-6' src={recipe.image} alt="" /></td>
                               
                               
                                <td ><button  onClick={()=>handleDelete(recipe.id)} className=' cursor-pointer rounded-lg bg-green-300 p-1'>Delete</button></td>
                            </tr>
                          ))
                        )
                          :''
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <CountDown/>
    </div>
  )
}

export default Favourite
