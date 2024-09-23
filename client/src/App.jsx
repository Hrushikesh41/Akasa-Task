import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Verify from './pages/Verify/Verify'
import UpdatePassword from "./pages/Update Password/UpdatePassword"
import NewPassword from "./pages/Update Password/NewPassword"
import VerifyOtp from './pages/Update Password/VerifyOtp'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/verify' element={<Verify />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/update' element={<UpdatePassword />} />
          <Route exact path='/auth' element={<VerifyOtp />} />
          <Route exact path='/new' element={<NewPassword />} />
          <Route exact path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
