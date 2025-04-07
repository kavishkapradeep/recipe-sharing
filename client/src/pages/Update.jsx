import React from 'react'

const Update = () => {
  return (
    <div>
       <div className=' mt-32'>
           <div>
               <h2 className=' text-2xl font-semibold'>Update</h2>
           </div>
           <div>
               <div className=' p-3 flex m-4 bg-green-200'>
                  <p className=' text-xl'>Search Id :</p>
                  <input type="text"  className=' bg-green-300 p-2 ml-2'/>
                  <p className=' ml-3 p-2 cursor-pointer text-lg font-semibold hover:bg-green-50 hover:p-2 hover:rounded-2xl '>Search</p>
               </div>
               <form className=' bg-green-100 border border-green-950 p-5'>
               <div className=' flex  ml-5'>
                       <p className=' p-2 text-xl'>Name</p>
                       <input type="text"  className=' bg-green-200 w-[350px] p-2 ml-5 '/>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3'>
                       <p className=' p-2 text-xl'>Category</p>
                       
                       <select name="" id="" className=' bg-green-200  p-2 ml-5 '>
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
                   <div className=' flex ml-5'>
                       <p className=' p-2 text-xl'>Description</p>
                       <textarea className=' bg-green-200  p-2 ml-5 w-[300px]'  name="" id=""></textarea>
                   </div>
                   <div className=' flex ml-5 mt-3 mb-3' >
                     <p className=' p-2 text-xl'>image</p>
                     <input type="file" name="" id="" className=' bg-green-200  p-2 ml-5 w-[300px] font-semibold' />
                   </div>
                   <div className=' flex justify-center mt-8 mb-8'>
                     <button className=' bg-green-300 p-2 w-72 rounded-2xl text-2xl font-semibold hover:bg-green-50 cursor-pointer'>SUBMIT</button>
                   </div>
               </form>
           </div>
       </div>
    </div>
  )
}

export default Update
