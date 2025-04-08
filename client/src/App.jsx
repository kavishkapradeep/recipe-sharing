import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sidebar from './pages/Sidebar.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Favourite from './pages/Favourite.jsx'
import RecipeList from './components/RecipeList.jsx'
import RecipeItem from './components/RecipeItem.jsx'
import { RecipeContext } from './context/RecipeContext.jsx'
import SignIn from './components/SignIn.jsx'
import Update from './pages/Update.jsx'
import 'quill/dist/quill.snow.css'

const App = () => {
  const {showLogin} = useContext(RecipeContext)
  return (
    <div  className=' bg-green-100  w-full'>
      <Navbar/>
      {showLogin === true? <SignIn/>:""}
      <Routes>
        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/sidebar' element={<Sidebar/>}>
            <Route path='add-recipe' element={<Add/>}></Route>
            <Route path='update' element={<Update/>}></Route>
            <Route path='list' element ={<List/>}/>
            <Route path='favourite' element={<Favourite/>}></Route>
            
        </Route>
        <Route path='/list' element={<RecipeList/>}/>
        <Route path='/list/:id' element={<RecipeItem/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
