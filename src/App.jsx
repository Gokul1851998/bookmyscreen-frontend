import React,{ Fragment } from 'react'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import UserRoute from './Routes/user/userRoute'
import OwnerRoute from './Routes/owner/ownerRoute'
import AdminRoute from './Routes/admin/adminRoute'
import Loading from './components/Loader/Loading'
// import { useSelector } from 'react-redux'

function App(){
  // const {loading} = useSelector((state) => state.loaders)
  return (
    <Fragment>
      
      <BrowserRouter>
      <Toaster/>
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