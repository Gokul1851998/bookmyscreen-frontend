import React from 'react'
import { Navigate } from 'react-router';

function PublicRouteOwner(props) { 
    if (localStorage.getItem("ownerToken")){
        console.log('Owner is loggedIn')
        return <Navigate to={'/owner/ownerHome'}/>
      } else {
        console.log('Owner is Not LoggedIn')
        return props.children
    }
}

export default PublicRouteOwner;
