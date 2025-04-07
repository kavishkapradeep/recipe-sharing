import React, { useContext, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'

const Add = () => {

  const [name,setName] = useState('')
  const [category,setCategory]= useState('')
  const [description,setDescription] = useState('')
  const [image,setImage]=useState(null)
  const {url,userId} = useContext(RecipeContext)
  const [imageUrl,setImageUrl]=useState('')

  //upload image
  const handleImageUpload = async (file) =>{
    const formData = new FormData();
    formData.append('file',file)
    formData.append('upload_preset','Recipe')
   

    try {
      const resp = await fetch('https://api.cloudinary.com/v1_1/djxf3kkzt/image/upload',{
        method:'POST',
        body:formData
      })

      const data2 = await resp.json()
      setImageUrl(data2.secure_url)
      console.log(data2.secure_url);
    } catch (error) {
      console.log(error);
      
    }
  }

  //add item 
  const handleAdd = async (e)=>{
    e.preventDefault()
    console.log(userId);

  
    try {

      
      
      
      const response = await fetch(`${url}/Recipe`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            category:category,
            description:description,
            image:imageUrl
        })
     })
     const data1 = await response.json()
 
     const {id} = data1
     const userResponse = await fetch(`${url}/user/${userId}`);
    const userData = await userResponse.json();

     const updatedRecipes = [...userData.recipe, id];
     const res = await fetch(`${url}/user/${userId}`,{
        method:'PUT',
        headers:{
         'content-type':"application/json"
        },
        body:JSON.stringify({
          recipe:updatedRecipes
        })
     })
 
     const data = await res.json()
     console.log(data);
     setImage('')
     setCategory('')
     setName('')
     setDescription('')
 
    } catch (error) {
      console.log(error);
      
    }
    
     }

  return (
    <div className=' '>
      <div>
         <div className='  mt-32 flex flex-col justify-center  '>
             <div className=''>
               <h2 className=' text-3xl font-semibold'>ADD Recipe</h2>
             </div>
             <div className=' bg-green-200/20 p-2 m-3   border border-green-950'>
               <form onSubmit={handleAdd} >
                   <div className=' flex  ml-5'>
                       <p className=' p-2 text-xl'>Name</p>
                       <input value={name} onChange={(e)=>setName(e.target.value)}  type="text"  className=' bg-green-200 w-[350px] p-2 ml-5 '/>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3'>
                       <p className=' p-2 text-xl'>Category</p>
                       
                       <select value={category} onChange={(e)=>setCategory(e.target.value)} name="" id="" className=' bg-green-200  p-2 ml-5 '>
                          <option value="">Choose</option>
                          <option value="Salad">Salad</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Deserts" >Deserts</option>
                          <option value="Sandwich" >Sandwich</option>
                          <option value="Cake">Cake</option>
                          <option value="Pure Veg" >Pure Veg</option>
                          <option value="Pasta">Pasta</option>
                          <option value="Noodles" >Noodles</option>
                       </select>
                   </div>
                   <div className=' flex ml-5'>
                       <p className=' p-2 text-xl'>Description</p>
                       <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className=' bg-green-200  p-2 ml-5 w-[300px]'  name="" id=""></textarea>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3' >
                     <p className=' p-2 text-xl'>image</p>
                     <input  onChange={(e)=>{const file =e.target.files[0];setImage(file);handleImageUpload(file)}} type="file" name="" id="" className=' bg-green-200  p-2 ml-5 w-[300px] font-semibold' />
                   </div>
                   <div className=' flex justify-center mt-8 mb-8'>
                     <button type='submit' className=' bg-green-300 p-2 w-72 rounded-2xl text-2xl font-semibold hover:bg-green-50 cursor-pointer'>SUBMIT</button>
                   </div>
               </form>
             </div>
         </div>
      </div>
    </div>
  )
}

export default Add
