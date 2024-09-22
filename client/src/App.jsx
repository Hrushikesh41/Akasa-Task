import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
