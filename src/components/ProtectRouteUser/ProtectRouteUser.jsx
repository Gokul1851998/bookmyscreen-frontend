import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../api/user/users";
import { setUser } from "../../redux/usersSlice";

function ProtectedRouteUser(props) { 
  
  const dispatch = useDispatch();
  const GetCurrentUser = async() => {
  
    try {
      const response = await getCurrentUser()
      if(response.success){
        dispatch(setUser(response.data))
      }else{
        dispatch(setUser(null))
        console.log(response.message)
      }

    } catch (error) {
      dispatch(setUser(null))
      console.log(error.message)
    }
  }

  useEffect(()=>{
     GetCurrentUser()
  },[])

    if (localStorage.getItem("userToken")){
        console.log('User is loggedIn')
        return props.children;
      } else {
        console.log('User is Not LoggedIn')
        return <Navigate to={"/"}/>;
    }
    
}

export default ProtectedRouteUser;
