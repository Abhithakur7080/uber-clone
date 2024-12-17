import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CaptainLogin, CaptainSignup, Home, UserLogin, UserSignup } from "./pages"

const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup/>} />
        <Route path='/captain/login' element={<CaptainLogin/>} />
        <Route path='/Captain/signup' element={<CaptainSignup/>} />
      </Routes>
    </div>
  )
}

export default App