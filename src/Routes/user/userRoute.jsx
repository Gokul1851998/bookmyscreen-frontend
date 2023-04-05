import React from 'react'
import Home from '../../pages/User/Home/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import PublicRouteUser from '../../components/PublicRouteUser/PublicRouteUser'

 function UserRoute() {
  return (
    <div>
        <Routes>
        <Route exact path='/' element={<PublicRouteUser><Home/></PublicRouteUser>}/>
        </Routes>
      
    </div>
  )
}

export default UserRoute
