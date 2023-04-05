import React from 'react'
import { Navigate } from "react-router-dom";

function PublicRouteUser(props) {
  if(localStorage.getItem("token")){
    return <Navigate to={'/'}/>
  }else{
    console.log('user is there')
    return props.children
  }
}

export default PublicRouteUser
