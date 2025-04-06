import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sidebar from './pages/Sidebar.jsx'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Favourite from './pages/Favourite.jsx'

const App = () => {
  return (
    <div  className=' bg-green-100  w-full'>
      <Navbar/>
      <Routes>
        
        <Route path='/' element={<Home/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/sidebar' element={<Sidebar/>}>
            <Route path='add-recipe' element={<Add/>}></Route>
            <Route path='list' element ={<List/>}/>
            <Route path='favourite' element={<Favourite/>}></Route>
        </Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
