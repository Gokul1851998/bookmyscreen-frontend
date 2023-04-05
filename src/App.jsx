import React,{ Fragment } from 'react'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toast'
import './index.css'
import UserRoute from './Routes/user/userRoute'
import OwnerRoute from './Routes/owner/ownerRoute'
import AdminRoute from './Routes/admin/adminRoute'
import Loader from './pages/loader'
import { useSelector } from 'react-redux'

function App(){
  const {loading} = useSelector((state) => state.loaders)
  return (
    <Fragment>
      {/* {loading && 
        <Loader/>
      } */}
      <BrowserRouter>
      <ToastContainer className='Toast' delay={3000} position='top-center' />
        <Routes>
          <Route path='/*' element={<UserRoute/>} />

          <Route path='/owner/*' element={<OwnerRoute/>}/>

          <Route path='/admin/*' element={<AdminRoute/>}/>
        </Routes>
        
      </BrowserRouter>
    </Fragment>
  );
}

export default App;