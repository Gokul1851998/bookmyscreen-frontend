import React from 'react'
import { Navigate } from "react-router-dom";

function ProtectedRouteAdmin(props) {

    if (localStorage.getItem("adminToken")){
        console.log('Admin is loggedIn')
        return props.children;
      } else {
        console.log('Admin is Not LoggedIn')
        return <Navigate to={"/admin"}/>;
    }

}
export default ProtectedRouteAdmin
