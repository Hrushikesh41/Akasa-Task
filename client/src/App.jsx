import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Verify from './pages/Verify/Verify'
import UpdatePassword from "./pages/Update Password/UpdatePassword"
import NewPassword from "./pages/Update Password/NewPassword"
import VerifyOtp from './pages/Update Password/VerifyOtp'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/verify' element={<Verify />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/update' element={<UpdatePassword />} />
          <Route exact path='/auth' element={<VerifyOtp />} />
          <Route exact path='/new' element={<NewPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
