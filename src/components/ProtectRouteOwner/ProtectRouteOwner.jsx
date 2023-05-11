import React from 'react'
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { getCurrentOwner } from '../../api/owner/ownerInstance';
import { setOwner } from '../../redux/ownersSlice';
import { useDispatch } from 'react-redux';

function ProtectedRouteOwner(props) {
  const dispatch = useDispatch()
  const GetCurrentOwner = async()=>{
    try {
      const response = await getCurrentOwner()
      if(response.success){ 
        dispatch(setOwner(response.data))
      }else{
        dispatch(setOwner(null))
       
      }
   
    } catch (error) {
      console.log(error.message)
    }
  } 

  useEffect(()=>{
    GetCurrentOwner();
  },[])
  
    if (localStorage.getItem("ownerToken")){
     
        return props.children;
      } else {
       
        return <Navigate to={"/owner"}/>;
    }
}

export default ProtectedRouteOwner
