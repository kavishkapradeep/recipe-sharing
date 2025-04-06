import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const RecipeContext = createContext(null)

const RecipeContextProvider =(props)=>{
    const navigate = useNavigate()

const contextValue ={
    navigate
}

    return(
        <RecipeContext.Provider value={contextValue}>
            {props.children}
        </RecipeContext.Provider>
    )

}

export default RecipeContextProvider