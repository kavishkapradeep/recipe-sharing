import React, { useContext, useEffect, useRef, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import Quill from 'quill'

const Add = () => {

  const [name,setName] = useState('')
  const [category,setCategory]= useState('')
  
  const [image,setImage]=useState(null)
  const {url,userId,fetch_list} = useContext(RecipeContext)
  const [imageUrl,setImageUrl]=useState('')

  const editRef =useRef(null)
  const quillRef =useRef(null)
  //upload image
  const handleImageUpload = async () =>{
    const formData = new FormData();
    formData.append('file',image)
    formData.append('upload_preset','Recipe')
   

    try {
      const resp = await fetch('https://api.cloudinary.com/v1_1/djxf3kkzt/image/upload',{
        method:'POST',
        body:formData
      })

      const data2 = await resp.json()
      setImageUrl(data2.secure_url)
      
      return data2.secure_url
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
   
    
  },[imageUrl])

  //add item 
  const handleAdd = async (e)=>{
    e.preventDefault()
    const description = quillRef.current.root.innerHTML

  
    try {

      const updateUrl = await handleImageUpload()
      
      
      
      const response = await fetch(`${url}/Recipe`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            category:category,
            description:description,
            image:updateUrl,
            userId:userId
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
     fetch_list()
     
     setImage('')
     setCategory('')
     setName('')
     quillRef.current.root.innerHTML =""
     setImageUrl('')
 
    } catch (error) {
      console.log(error);
      
    }
    
     }
     useEffect(()=>{
      if (!quillRef.current &&editRef.current) {
         quillRef.current = new Quill(editRef.current,{
             theme:'snow'
         })
      }
   },[])  

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
                       <input required value={name} onChange={(e)=>setName(e.target.value)}  type="text"  className=' bg-green-200 w-[350px] p-2 ml-5 '/>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3'>
                       <p className=' p-2 text-xl'>Category</p>
                       
                       <select required value={category} onChange={(e)=>setCategory(e.target.value)} name="" id="" className=' bg-green-200  p-2 ml-5 '>
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
                   <div className=' flex ml-5 flex-col'>
                       <p className=' p-2 text-xl'>Description</p>
                       <div ref={editRef}></div>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3' >
                     <p className=' p-2 text-xl'>image</p>
                     <input required  onChange={(e)=>{const file =e.target.files[0];setImage(file)}} type="file"  className=' bg-green-200  p-2 ml-5 w-[300px] font-semibold' />
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
