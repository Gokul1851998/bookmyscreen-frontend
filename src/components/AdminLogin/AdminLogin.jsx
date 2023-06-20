import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";
import axios from 'axios';
import { adminUrl } from '../../../apiLinks/apiLinks';


 function AdminLogin() {
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('')

  const navigate = useNavigate()



  const login =(e)=>{
    e.preventDefault()
      axios.post(`${adminUrl}adminlogin`,{password:loginPassword,email:loginEmail}).then((response)=>{
          if(response.data.login){ 
              localStorage.setItem('adminToken', response.data.token);

              navigate('/admin/dashboard')
          }
      })
  }


  return (
    <div >
       <div className="bg-black text-white font-bold pl-6 pr-3 " style={{fontSize: "24px"}}>
          <h2 className='pt-2 pb-2'>book<span className="text-danger font-bold">my</span>screen</h2>
        </div>

        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a className="flex items-center mb-6 text-2xl font-semibold text-white dark:text-white">
           
            Admin Login   
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={login}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Enter your Email</label>
                  <input onChange={(e)=>setLoginEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black dark:text-white">Password</label>
                  <input  onChange={(e)=>setLoginPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <div className='flex justify-center'>
                  
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login in</button>
                </div>
               
              
                
              </form>
            </div>
          </div>
        </div>
      </section> 



  </div>
  )
}

export default AdminLogin
