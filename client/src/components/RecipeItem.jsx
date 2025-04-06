import React from 'react'

const RecipeItem = ({id,name,description,image,category,favorite}) => {
  return (
    <div>
       <div>
        <img src={image} alt="" />
       </div>
       <div>
        <p className=' text-xl'>{name}</p>
        <p className=' text-sm'>{description}</p>
       </div>
    </div>
  )
}

export default RecipeItem
