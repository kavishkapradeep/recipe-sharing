import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import CountDown from './CountDown'

const RecipeItem = () => {

  const {recipeId,url,userId,handleFavourite,favlist,setfavlist,fetchFavourite} = useContext(RecipeContext)
  const [item,setItem]=useState([])
  const [isTimerActive, setIsTimerActive] = useState(false);
 const [timeLeft, setTimeLeft] = useState(0)
  const handleItem = async ()=>{
     try {
        const res = await fetch(`${url}/Recipe/${recipeId}`)
        const data = await res.json()
        
        setItem(data)
        setTimeLeft(data.time * 60);
     } catch (error) {
       console.log(error);
       
     }
  }

  useEffect(()=>{
   handleItem()
   fetchFavourite()
  },[recipeId])
 
  useEffect(()=>{
    fetchFavourite()
  },[item,userId])

  const handleStartTimer = () => {
    setIsTimerActive(true); 
  };

  const handleStopTimer = () => {
    setIsTimerActive(false);

  };
 
  const shareUrl = window.location.href;
  
  

  return (
    <div>
        <div className=' p-2 m-2'>
          {/*path set*/}
           <div className=' mt-14 text-sm text-gray-600 mb-4'>
               <p>list/{item.category}/{item.name}</p>
           </div>
           <div>
              
              <div className=' bg-green-300/50 py-8 p-2 flex justify-evenly max-md:flex-col'>
                 <div className=' border p-1  rounded-xl bg-green-500   '>
                  <img className=' w-96 h-80 max-smobject-cover ' src={item.image} alt="" srcset="" /></div>
                 <div className=' bg-green-200 p-5 border border-green-950 rounded-bl-4xl rounded-tr-4xl'>
                    <h2 className=' mb-8 text-6xl font-semibold font-[Outfit] mr-20'>{item.name}</h2>
                    <div>
                      <p className=' text-lg'>category: <span className=' text-xl font-semibold text-green-900'>{item.category}</span></p>  
                    </div>
                    <div>
                      <p className=' text-lg'>Time: <span className=' text-xl font-semibold text-green-900'>{item.time} minutes</span></p>  
                    </div>  
                    <div className=' flex flex-col  mt-14 gap-5 font-semibold'>
                      {favlist.includes(item.id)?<div className=' cursor-pointer flex bg-green-200 border border-green-950 justify-evenly p-2 rounded-lg'><p className=' '>Already ADDED Favourite</p></div>:
                      <div onClick={()=>handleFavourite()} className=' cursor-pointer flex bg-green-400 justify-evenly p-2 rounded-lg'><i class="ri-add-circle-line "></i><p className=' '>Add to Favourite</p></div> 
                      }
                      <div>
                      <p className=' cursor-pointer flex bg-green-400 justify-evenly p-2 rounded-lg'><i class="ri-share-forward-fill "></i> <span className=' '>Share</span> </p> 
                        
                      </div>
                    </div>   
                 </div>
              </div>
              <div>
                 <div className=' mt-4 '><p className=' flex justify-center text-4xl font-bold'>Lets Cook !</p></div>
                  <div className=' flex  justify-center mt-4 p-2 '>
                  <div className=' bg-green-300 w-96 h-96 rounded-4xl'>
                    <div className=' flex flex-col  justify-center items-center'>
                    <p className=' w-80 h-16'>
                      
                    </p>
                    {isTimerActive ?
                    ( <div className=' mt-8 '><CountDown minutes={item.time} timeLeft={timeLeft} setTimeLeft={setTimeLeft}/>
                    <button onClick={handleStopTimer}  className=' flex mt-8  bg-red-50 p-2 rounded-2xl cursor-pointer text-3xl font-semibold px-14 font-[Outfit] hover:bg-red-500 '>Stop</button>
                    </div> ):
                    (<button onClick={handleStartTimer}  className=' flex  bg-green-400 p-2 rounded-2xl cursor-pointer text-3xl font-semibold px-14 font-[Outfit] hover:bg-green-50 '>Start</button>)}
                    </div>
                    
</div>
<div>
 
</div>
                  </div>
              </div>
              <div className=' p-4 flex flex-col justify-center bg-green-300/50'>
                <p className=' text-2xl font-bold flex  justify-center'>Method</p>
                <div className='max-md:ml-4 max-md:mr-4  p-4 bg-green-300 ml-50 rounded-2xl mr-50 '>
                 <p className=' text-lg font-bold flex  rounded-4xl bg-green-50 p-5   flex-col' dangerouslySetInnerHTML={{__html:item.description}}></p>
                 </div>
              </div>

             
           </div>
        </div>
    </div>
  )
}

export default RecipeItem
