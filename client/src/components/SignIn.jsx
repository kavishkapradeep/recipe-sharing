import React, { useContext, useEffect, useState } from 'react'
import { RecipeContext } from '../context/RecipeContext'
import { assets } from '../assets/assets'

const SignIn = () => {
    const {showLogin,setShowLogin,url,userData,userId,setUserId} = useContext(RecipeContext)
    const [currState,setCurrState] = useState("LogIn")
    
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //register user
    const handleRegister = async (e)=>{
        e.preventDefault();

        const res = await fetch(`${url}/user`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                name:name,
                email:email,
                password:password
            }),

            
        })
        const data = await res.json()

        const {id} = data

        //store the 'id in local storage
        localStorage.setItem('userId',id)
        setUserId(id)
        if (res.ok) {
            console.log(data);
            setEmail('')
            setPassword('')
            setName('')
            setShowLogin(false)
        }else{
            console.log(err.message);
            
        }
    }
//login user
    const handleLogin = async (e)=>{
        e.preventDefault()
       
        try {
            const res  = await fetch(`${url}/user`)
            const users = await res.json()

            const user = users.find(u=>u.email === email && u.password === password)

            if (user) {
                localStorage.setItem('userId',user.id)
                setUserId(user.id)
                setEmail('')
                setPassword('')
                
                setShowLogin(false)

            }else{
                console.log('User not found');
            }
        } catch (error) {
            console.log(error);

            
        }
    }
 
    

    //Screen scroll block 
    useEffect(()=>{
        if (showLogin === true) {
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow='auto'
        }

        return ()=>{
            document.body.style.overflow='auto'
        }
    },[showLogin])
  return (
    <div className=' absolute top-0 z-50 w-full h-screen'>
       <div className=' flex justify-center items-center backdrop-blur-sm  w-full h-screen'>
          <form  className=' flex flex-col border border-green-950 p-2 bg-green-400/40'>
            <div className=' flex justify-between mb-5 p-2'>
                <p className=' text-3xl'>LogIn</p>
                <div onClick={()=>setShowLogin(false)}><img className=' cursor-pointer p-2' src={assets.cross_icon} alt="" /></div>
            </div>
            { currState === 'SignUp'?<div className=' flex gap-2 mb-3'>
                <p className=' p-2 text-lg mr-9 font-light font-[Outfit]'>Name</p>
                <input required value={name} onChange={(e)=>setName(e.target.value)} type="text" className='border border-green-950 p-2 outline-none text-lg'/>
            </div>:""}
            
            <div className=' flex gap-2 mb-3'>
            <p className=' p-2 text-lg mr-9 font-light font-[Outfit]'>Email</p>
            <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className='border border-green-950 outline-none p-2  text-lg'/>
            </div>
            <div className=' flex gap-2 mb-3'>
            <p className='p-2 text-lg mr-1 font-light font-[Outfit]'>Password</p>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='border border-green-950 outline-none p-2  text-lg'/>
            </div>
            <div className=' text-xs'>
                {currState === 'LogIn'? <p> Do you havent Account <span  className=' cursor-pointer text-green-800' onClick={()=>setCurrState('SignUp')}>SignUp</span></p> : <p>
                    Already have a Account <span className=' cursor-pointer text-green-800' onClick={()=>setCurrState('LogIn')}>LogIn</span></p>}
            </div>

            {currState==='LogIn'?<button onClick={handleLogin} className='hover:bg-green-200  hover:scale-105 duration-300 hover:rounded mt-3 mb-3 cursor-pointer bg-green-400 rounded-full p-2   text-xl font-semibold'>LogIn</button>
            :<button onClick={handleRegister} className=' mt-3 mb-3 cursor-pointer bg-green-400 rounded-full p-2   hover:scale-105 duration-300 hover:rounded hover:bg-green-200 text-xl font-semibold'>SignUp</button>
            }
          </form>
          
       </div>
    </div>
  )
}

export default SignIn
