import React from 'react'
import { Navigate } from "react-router-dom";

function PublicRouteAdmin(props) {
    if(localStorage.getItem("adminToken")){
        return <Navigate to={'/admin/Dashboard'}/>
      }else{
        console.log('user is there')
        return props.children
      }
}

export default PublicRouteAdmin