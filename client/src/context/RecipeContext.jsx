import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { food_list } from "../assets/assets";

export const RecipeContext = createContext(null)

const RecipeContextProvider =(props)=>{
    const url = import.meta.env.VITE_MOCK_URL
    const navigate = useNavigate()
    const [searchFilter,setSearchFilter] = useState('')
    const [recipe,setRecipe] =useState([])
    const [showLogin,setShowLogin]= useState(false)
    const [userId,setUserId]= useState(null)
    const [userData ,setUserData]= useState(null)
    const[recipeId,setRecipeId] =useState(null)
    const [fetchlist,setFetchList]=useState([])
    const[data2,setData2]=useState([])
    const[favlist,setfavlist]=useState([])

const fetchRecipe = async ()=>{
    try {
        const data =  food_list
        setRecipe(data)
    } catch (error) {
        console.log(error);
        
    }
}

const fetchUserData = async ()=>{
    try {
        const response = await fetch(`${url}/user`)

        const data = await response.json()
        setUserData(data)
    } catch (error) {
        console.log(error);
        
    }
}
//fetch all recipe
const fetch_list = async () => {
    const data = await fetch(`${url}/Recipe`)
    const value = await data.json()
    setFetchList(value)
}
useEffect(()=>{
    const storeUserId = localStorage.getItem('userId');
    if (storeUserId) {
        setUserId(storeUserId)
        console.log("User Id localstorage", userId);
        
    }else{
        console.log(userId);
        
    }
},[userId,recipeId])


//favourite add
const handleFavourite = async () => {
    try {
         const res = await fetch(`${url}/user/${userId}`)
         const userData = await res.json()

         console.log(userData);

         const res1 = await fetch(`${url}/Recipe/${recipeId}`)
         const recipeData = await res1.json()
         console.log("recipe Data",recipeData);

         if (userData.favouritelist.includes(recipeData.id)) {
            console.log("already added!");
            alert("already added")
         }else{

         const updateFavourite = [...userData.favouritelist,recipeId]
         const res2= await fetch(`${url}/user/${userId}`,{
             method:'PUT',
             headers:{
                'content-type':'application/json'
             },
             body:JSON.stringify({
                favouritelist:updateFavourite
             })
             
         })

         const updatedata = await res2.json()
         console.log(updatedata);
        }
         fetch_list()
         
         
         
    } catch (error) {
        console.log(error);
        
    }
}

const fetchFavourite = async () => {
    console.log(userId);
    try {
        const res = await fetch(`${url}/user/${userId}`)
         const userData = await res.json()

         console.log(userData);
         setfavlist(userData.favouritelist)
        
        
        
        
        
        
        
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
    fetchFavourite()
},[userId,recipeId])

useEffect(()=>{
 fetchRecipe()
 fetchUserData()
  console.log("userId",userId);
  
},[])

useEffect(()=>{
   
   
    
},[userData,recipeId])




useEffect(()=>{
 fetch_list()
 
},[])

useEffect(()=>{
   console.log(favlist);
      
   
},[fetchlist])

useEffect(()=>{

},[favlist])


const contextValue ={
    navigate,searchFilter,setSearchFilter,recipe,showLogin,setShowLogin,url
    ,userId,setUserId,recipeId,setRecipeId,fetchlist,fetch_list,handleFavourite
    ,fetchFavourite,favlist
}

    return(
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )

}

export default RecipeContextProvider