import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Adminlogin from '../../pages/Admin/Adminlogin/Adminlogin'
import Dashboard from '../../pages/Admin/Dashboard/Dashboard'
import UserManagement from '../../pages/Admin/UserManagement/UserManagement'
import ProtectedRouteAdmin from '../../components/ProtectRouteAdmin/ProtectRouteAdmin'
import PublicRouteAdmin from '../../components/PublicRouteAdmin/PublicRouteAdmin'
import OwnerManagement from '../../pages/Admin/OwnerManagement/OwnerManagement'
import AdminOwners from '../../pages/Admin/TheatreMangement/AdminOwners'


 function AdminRoute() {
  return (
    <div>
        <Routes>
        <Route path='/' element={<PublicRouteAdmin><Adminlogin/></PublicRouteAdmin>}/>
        <Route path='/dashboard' element={<ProtectedRouteAdmin><Dashboard/></ProtectedRouteAdmin>} /> 
        <Route path='/userManagement' element={<ProtectedRouteAdmin><UserManagement/></ProtectedRouteAdmin>}/>
        <Route path='/ownerManagement' element={<ProtectedRouteAdmin><OwnerManagement/></ProtectedRouteAdmin>}/>
        <Route path='/adminOwners' element={<ProtectedRouteAdmin><AdminOwners/></ProtectedRouteAdmin>}/>
        </Routes>
      
    </div>
  )
}

export default AdminRoute
