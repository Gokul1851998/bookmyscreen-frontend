import React,{useEffect,useState} from 'react'
import AdminLogin from '../../../components/AdminLogin/AdminLogin'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { adminUrl } from '../../../../apiLinks/apiLinks'

 function Adminlogin() {
  return (
    <div>
      <AdminLogin/>
    </div>
  )
}

export default Adminlogin
