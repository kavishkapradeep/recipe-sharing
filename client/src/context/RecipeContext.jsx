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

//favourite add
const handleFavourite = async () => {
    try {
        const data = await fetch(`${url}/Recipe/${recipeId}`)
        const recipedata = await data.json()

        const updateFavouriteList = [...recipedata.favouriteList,userId]

        const userData1 = recipedata.favouriteList.includes(userId)
        
        
        
        if (userData1) {
            alert('recipe alrdey added')
        }else{

        const res = await fetch(`${url}/Recipe/${recipeId}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                favouriteList:updateFavouriteList
            })
        })}
        fetch_list()
    } catch (error) {
        console.log(error);
        
    }
}

const fetchFavourite = async () => {
    try {
        const data = await fetch(`${url}/Recipe`)
        const data2 =await data.json()
        const data3 = await data2.filter(u=>u.favouriteList.includes(userId))
        console.log( data3);
        setfavlist(data3)
        fetch_list()
    } catch (error) {
        console.log(error);
        
    }
}


useEffect(()=>{
 fetchRecipe()
 fetchUserData()
  
},[])

useEffect(()=>{
   
   
    fetchFavourite()
},[userData])

useEffect(()=>{
    const storeUserId = localStorage.getItem('userId');
    if (storeUserId) {
        setUserId(storeUserId)
        console.log(userId);
        console.log(favlist);
    }else{
        console.log(userId);
        
    }
},[userId,recipeId])


useEffect(()=>{
 fetch_list()
},[favlist])

useEffect(()=>{
  console.log(fetchlist);
   console.log(favlist);
   
},[fetchlist])

const contextValue ={
    navigate,searchFilter,setSearchFilter,recipe,showLogin,setShowLogin,url
    ,userId,setUserId,recipeId,setRecipeId,fetchlist,fetch_list,handleFavourite
    ,fetchFavourite
}

    return(
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )

}

export default RecipeContextProvider