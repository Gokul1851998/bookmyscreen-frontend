import React, { Fragment } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import LoginView from '../../pages/Owner/OwnerLogin/LoginView'
import OwnerSignup from '../../pages/Owner/OwnerSignup/OwnerSigup'
import Dashboard from '../../pages/Owner/OwnerDasboard/Dashboard'
import PublicRouteOwner from '../../components/PublicRouteOwner/PublicRouteOwner'
import ProtectedRouteOwner from '../../components/ProtectRouteOwner/ProtectRouteOwner'
import OwnerScreenMangement from '../../pages/Owner/OwnerScreenManagement/OwnerScreenMangement'
import OwnerShows from '../../pages/Owner/OwnerShows/OwnerShows'
import OwnerBookings from '../../pages/Owner/OwnerBookings/OwnerBookings'
import OwnerSailsReport from '../../pages/Owner/OwnerSailsReport/OwnerSailsReport'
import OwnerChat from '../../pages/Owner/OwnerChat/OwnerChat'

 function OwnerRoute() {
  return (
 <Fragment>
    <Routes>
    <Route path='/' element={<PublicRouteOwner><LoginView/></PublicRouteOwner>}/>
    <Route path='/ownersignup' element={<PublicRouteOwner><OwnerSignup/></PublicRouteOwner>}/>
    <Route path='/ownerHome' element={<ProtectedRouteOwner><Dashboard/></ProtectedRouteOwner>}/>
    <Route path='/ownerScreen' element={<ProtectedRouteOwner><OwnerScreenMangement/></ProtectedRouteOwner>}/>
    <Route path='/ownerShows' element={<ProtectedRouteOwner><OwnerShows/></ProtectedRouteOwner>}/>
    <Route path='/ownerBookings' element={<ProtectedRouteOwner><OwnerBookings/></ProtectedRouteOwner>}/>
    <Route path='/owner-sailsReport' element={<ProtectedRouteOwner><OwnerSailsReport/></ProtectedRouteOwner>}/>
    <Route path='/ownerChat' element={<ProtectedRouteOwner><OwnerChat/></ProtectedRouteOwner>}/>
    </Routes>
 </Fragment>
  )
}

export default OwnerRoute
