import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './Users'
import CreateUsers from './CreateUsers'
import UpdateUsers from './UpdateUsers'
function App() {


  return (
    <>
<Routes>
  <Route path='/'  element={  <Users /> } />
    <Route path='/create'  element={ <CreateUsers /> } />
      <Route path='/update'  element={ <UpdateUsers /> } />
</Routes>
    </>
  )
}

export default App
