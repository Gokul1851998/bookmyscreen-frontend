import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "tailwindcss/tailwind.css";
import axios from 'axios';
import { adminUrl } from '../../../apiLinks/apiLinks';

 function AdminLogin() {
  const [loginEmail,setLoginEmail] = useState('');
  const [loginPassword,setLoginPassword] = useState('')
  const navigate = useNavigate()

  function login(){
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
    <section style={{backgroundImage:'url()'}} className="h-screen mr-10 ml-10">
    <div className="h-full">
      <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img src="https://img.freepik.com/free-vector/national-popcorn-day-banner-design_1308-122939.jpg?w=740&t=st=1681305489~exp=1681306089~hmac=69860a34860e823caa5c1769e6407107efd52a4fc013d70d5fd01b8fe96f40db" className="w-full" alt="Sample image" />
        </div>
        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
          <form>
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <h2 className="mt-10 text-3xl font-semibold  cursor-pointer">Admin Sign</h2>
             
            </div>
            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                Or
              </p>
            </div>
            {/* Email input */}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input onChange={(e)=>setLoginEmail(e.target.value)} type="email" className=" peer block  w-80 rounded border-1 bg-transparent  " id="exampleFormControlInput2" placeholder="Email address" />
              
              
            </div>
            {/* Password input */}
            <div className="relative mb-6" data-te-input-wrapper-init>
              <input onChange={(e)=>setLoginPassword(e.target.value)} type="password" className="peer block  w-80 rounded border-1 bg-transparent" id="exampleFormControlInput22" placeholder="Password" />
             
            </div>
            <div className="mb-6 flex items-center justify-between">
              
              <a href="#!">Forgot password?</a>
            </div>
            <div className="text-center lg:text-left">
              <button type="button" onClick={login} className="inline-block rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" data-te-ripple-init data-te-ripple-color="light">
                Login
              </button>
              <p className="mt-2 mb-0 pt-1 text-sm font-semibold">
                Don't have an account?
                <a href="#!" className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">Register</a>
              </p>
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
