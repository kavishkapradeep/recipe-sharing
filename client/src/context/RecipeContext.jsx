import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { food_list } from "../assets/assets";

export const RecipeContext = createContext(null)

const RecipeContextProvider =(props)=>{
    const navigate = useNavigate()
    const [searchFilter,setSearchFilter] = useState('')
    const [recipe,setRecipe] =useState([])

const fetchRecipe = async ()=>{
    try {
        const data =  food_list
        setRecipe(data)
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
 fetchRecipe()
},[])

const contextValue ={
    navigate,searchFilter,setSearchFilter,recipe
}

    return(
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )

}

export default RecipeContextProvider