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

useEffect(()=>{
 fetchRecipe()
 fetchUserData()
  
},[])

useEffect(()=>{
    console.log(userData);
    
},[userData])

useEffect(()=>{
    const storeUserId = localStorage.getItem('userId');
    if (storeUserId) {
        setUserId(storeUserId)
        console.log(userId);
        
    }else{
        console.log(userId);
        
    }
},[userId])

const contextValue ={
    navigate,searchFilter,setSearchFilter,recipe,showLogin,setShowLogin,url
    ,userId,setUserId
}

    return(
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )

}

export default RecipeContextProvider