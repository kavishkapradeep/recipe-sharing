import React, { useContext, useEffect, useRef, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import Quill from 'quill'

const Update = () => {
  const {userId,url,recipeId,setRecipeId} = useContext(RecipeContext)
  const [name,setName]= useState('')
  const [category,setCategory]= useState('')
  const [description,setDescription]= useState('')
  const [image,setImage]= useState('')
  const [img,setImg] =useState(null)
  const [search,setSearch] = useState('')

  const editRef = useRef(null)
  const quillRef = useRef(null)

  //search function 
  const handleSearch = async ()=>{
    try {
       const res = await fetch(`${url}/Recipe/${search}`)
       const data =await res.json()

       if (data.userId===userId) {
        setName(data.name)
        setCategory(data.category)
        setDescription(data.description)
        quillRef.current.root.innerHTML = data.description
        setImage(data.image) 
       }else{
        alert("User not Found !")
        setName("")
        setCategory("")
        setDescription("")
        setImage("")
        quillRef.current.root.innerHTML=""
       }
       
    } catch (error) {
       console.log(error);
       alert("ID not found")
       
    }
  }

  const handleList = async ()=>{
     try {
      
       const res =await fetch(`${url}/Recipe/${recipeId}`)
       const data =await res.json()
       setName(data.name)
       setCategory(data.category)
       setDescription(data.description)
       quillRef.current.root.innerHTML = data.description
       setImage(data.image)
       
      
       
     } catch (error) {
       console.log(error);
       
     }
  }

  //upload image to Cloudinary
  const handleImageUpload = async () => {
    if (!img) return image 

    const formData = new FormData()
    formData.append('file', img)
    formData.append('upload_preset', 'Recipe')
    formData.append('cloud_name', 'djxf3kkzt')

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/djxf3kkzt/image/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()
      return data.secure_url
    } catch (error) {
      console.error('Image upload failed:', error)
      return image
    }
  }


  //update Recipe data 
  const handleSubmit = async (e)=>{
     e.preventDefault()
     const updateUrl = await handleImageUpload()
     const updateRecipe = {
      name,
      category,
      description:quillRef.current.root.innerHTML,
      image:updateUrl
     }

   
     try {
        setSearch(recipeId)
      

       const res = await fetch(`${url}/Recipe/${search}`,{
         method:'PUT',
         headers:{
           'Content-Type' : 'application/json'
         },
         body:JSON.stringify(updateRecipe)
       })

       const result = await  res.json()
       
       alert('Recipe updated successfully!')
       setName('')
       setCategory('')
       setDescription('')
       setImg('')
       setImage('')
       setRecipeId('')
       quillRef.current.root.innerHTML =""
     } catch (error) {
       console.log(error);
       
     }
  }

  useEffect(()=>{
    handleList()
    
    
  },[recipeId])

  useEffect(()=>{
    if (!quillRef.current && editRef.current) {
       quillRef.current = new Quill(editRef.current,{
         theme:'snow'
       })
    }
  },[])

  return (
    <div>
       <div className=' mt-32'>
           <div>
               <h2 className=' text-2xl font-semibold'>Update</h2>
           </div>
           <div>
               <div className=' p-3 flex m-4 bg-green-200'>
                  <p className=' text-xl'>Search Id :</p>
                  
                  <input type="text"  className=' bg-green-300 p-2 ml-2' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                 
                  <p className=' ml-3 p-2 cursor-pointer text-lg font-semibold hover:bg-green-50 hover:p-2 hover:rounded-2xl ' onClick={handleSearch}>Search</p>
               </div>
               <form onSubmit={handleSubmit} className=' bg-green-100 border border-green-950 p-5'>
               <div className=' flex  ml-5'>
                       <p className=' p-2 text-xl'>Name</p>
                       <input value={name} onChange={(e)=>setName(e.target.value)} type="text"  className=' bg-green-200 w-[350px] p-2 ml-5 '/>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3'>
                       <p className=' p-2 text-xl'>Category</p>
                       
                       <select value={category} onChange={(e)=>setCategory(e.target.value)} name="" id="" className=' bg-green-200  p-2 ml-5 '>
                          <option value="">Choose</option>
                          <option value="Salad">Salad</option>
                          <option value="Rolls">Rolls</option>
                          <option value="Deserts">Deserts</option>
                          <option value="Sandwich">Sandwich</option>
                          <option value="Cake">Cake</option>
                          <option value="Pure Veg">Pure Veg</option>
                          <option value="Pasta">Pasta</option>
                          <option value="Noodles">Noodles</option>
                       </select>
                   </div>
                   <div className=' flex ml-5 flex-col'>
                       <p className=' p-2 text-xl'>Description</p>
                       <div ref={editRef}></div>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3' >
                     <p className=' p-2 text-xl'>image</p>
                     <input  onChange={(e)=>{const file = e.target.files[0];setImg(file)}}  type="file" name="" id="" className=' bg-green-200  p-2 ml-5 w-[300px] font-semibold' />
                   </div>
                   {/* current image */}
                   {image && (
                     <div className=' flex justify-between  p-2  bg-green-200'>
                       <img className=' w-32 h-32  flex ml-32' src={image} alt="" />
                     </div>
                   )}
                   <div className=' flex justify-center mt-8 mb-8'>
                     <button  type='submit' className=' bg-green-300 p-2 w-72 rounded-2xl text-2xl font-semibold hover:bg-green-50 cursor-pointer'>SUBMIT</button>
                   </div>
               </form>
           </div>
       </div>
    </div>
  )
}

export default Update
