import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './Layout'

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/app/*' element={<Layout/>}/>
          <Route path='/' element={<Navigate replace to='/app'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
