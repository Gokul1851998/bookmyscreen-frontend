import React, { Fragment } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import LoginView from '../../pages/Owner/OwnerLogin/LoginView'
import OwnerSignup from '../../pages/Owner/OwnerSignup/OwnerSigup'
import Dashboard from '../../pages/Owner/OwnerDasboard/Dashboard'
import PublicRouteOwner from '../../components/PublicRouteOwner/PublicRouteOwner'
import ProtectedRouteOwner from '../../components/ProtectRouteOwner/ProtectRouteOwner'


 function OwnerRoute() {
  return (
 <Fragment>
    <Routes>
    <Route path='/' element={<PublicRouteOwner><LoginView/></PublicRouteOwner>}/>
    <Route path='/ownersignup' element={<PublicRouteOwner><OwnerSignup/></PublicRouteOwner>}/>
    <Route path='/ownerHome' element={<ProtectedRouteOwner><Dashboard/></ProtectedRouteOwner>}/>
    </Routes>
 </Fragment>
  )
}

export default OwnerRoute
