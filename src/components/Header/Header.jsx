import React, {useState,useContext,useEffect} from 'react'
import "tailwindcss/tailwind.css";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import './Header.css'
import { userUrl} from '../../../apiLinks/apiLinks'
import { toast, Toaster } from 'react-hot-toast'
import { setUser } from '../../redux/usersSlice';
import { useDispatch } from 'react-redux';

 function Header() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [islogin,setIslogin] =useState(false)

  // ****************signup**************

  const [signModal , setSignModal] = useState(false);
  const [signName, setSignName] = useState('')
  const [signEmail, setSignEmail] = useState('')
  const [signPhone, setSignPhone] = useState('')
  const [signPassword, setSignPassword] = useState('')
  const [signCPassword, setSignCPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // ****************OTP************** 

  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState('')

// 
const [showSidebar, setShowSidebar] = useState(false);
const [displayName,setDisplayName] = useState('')

  let userSignup = {
    signName,
    signEmail,
    signPhone,
    signPassword,
    signCPassword,
  }

  let userData ={
    loginEmail,
    loginPassword
  }

  useEffect(() => {
    isAuthenticated()

 }, [])

  const sentOtp = (e) => {
    e.preventDefault()
    if (signPassword === signCPassword) {
        setLoading(true)
        axios.post(`${userUrl}getOtp`, userSignup).then((response) => {
          console.log(response);
            response.data.userExist ? toast.error('User Already Exist') : (setSignModal(false), setShowModal(false), setOtpModal('otp'))
        }).catch((err) => {
            toast.error('some unexpected errors please try after some time')
        }).finally(() => setLoading(false))
    } else {
        toast.error("Passwords doesnt match")
    }
}

const verifyOtpAndSignUp = (e) => {
  e.preventDefault()
  setLoading(true)
  axios.post(`${userUrl}signUp`, { userSignup, otp }).then((response) => {
    response.data.status ? setOtpModal(false) : toast.error('Incorrect otp')
  }).catch(() => {
      toast.error('some unexpected errors please try after some time')
  }).finally(() => setLoading(false))
}   

const userSignIN = (e) => {
  e.preventDefault()
  setLoading(true)
  axios.post(`${userUrl}signIn`, userData).then((response) => {

     
      if (response.data.logIn) {              
          localStorage.setItem('userToken',response.data?.token)
          setShowModal(false)
          setIslogin(true)
          setShowSidebar(!showSidebar)
          setDisplayName(response.data.Name)
          localStorage.setItem("userName",response.data.Name)
      }
      response.data.incPass && toast.error('Invalid password')
      response.data.block  &&  toast.error('Your acount is blocked')
      response.data.noUser && toast.error('No user in this email please sign up')
  }).catch(()=>{
      toast.error('some unexpected errors please try after some time')
  }).finally(()=>{
      setLoading(false)
  })

}
const logout = () => {
  dispatch(setUser(null))
  localStorage.removeItem("userToken"),setShowSidebar(false),
  setIslogin(false)
};

function isAuthenticated() {
  const token = localStorage.getItem('userToken');
  const userName = localStorage.getItem("userName")
  setDisplayName(userName)

  // You can implement your own logic to validate the token
  return token ? setIslogin(true) : setIslogin(false);
}

  return (
    <header className="bg-gray-800">
       <Toaster />
        <div>
        <nav className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="text-white font-bold pl-6 pr-3" style={{fontSize: "24px"}}>
          <h2>book<span className="text-danger font-bold">my</span>screen</h2>
        </div>
        
       
    {islogin?(
      <>
      {isAuthenticated?  (
        <div className='userimg fixed  z-30 flex items-center cursor-pointer right-10 top-6' onClick={() => setShowSidebar(!showSidebar)}>
              <img src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" alt='User'/>
              </div>
      ) :null}
      
      <div
        className={`top-0 right-0 w-[25vw] bg-gray-800  p-10 pl-10 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
          showSidebar ? "translate-x-0 " : "translate-x-full"
        }`}
      >
      <h6
          className="mt-10 text-3xl font-semibold text-white cursor-pointer"
        >
         <span className='pr-2'>Hi </span>{displayName}
        </h6>
        <h6
          className="mt-10 text-2xl font-semibold text-white cursor-pointer"
        >
          Profile
        </h6>
        <h6
          className="mt-10 text-2xl font-semibold text-white cursor-pointer"
        >
          Your Orders
        </h6>
        <h6
          className="mt-10 text-2xl font-semibold text-white cursor-pointer"
        >
          Wallet
        </h6>
        <h6 onClick={() => setShowSidebar(!showSidebar)}
          className="mt-10 text-2xl font-semibold text-white cursor-pointer"
        >
          Exit
        </h6>
        <div className="flex h-screen items-center justify-center">
        <button className="absolute bottom-0 mb-4  bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-14  rounded" onClick={logout} >
                 Log out
                </button>
                </div>
      </div>
      </>




    ):(

<div className="flex pl-2">
<button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded" onClick={() => {
   setShowModal(true)
 }}>
Login
</button>

</div>

      
    ) }
      </div>
    </nav>
        </div>
        <div>
        <nav className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div >
          <a className="mx-3 text-white hover:text-gray-300" href="#">Home</a>
          <a className="mx-3 text-white hover:text-gray-300" href="#">Movies</a>
          <a className="mx-3 text-white hover:text-gray-300" href="#">Theatres</a>
        </div>
      </div>
    </nav>
        </div>
                
                {/* ***********************************************Login*********************************************** */}

        {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative w-auto my-6 mx-auto max-w-3xl" >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" >
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={userSignIN}>
                <div className="flex items-start justify-center p-3 border-b border-solid border-gray-300 rounded-t " >
                  <h1 className=" font-bold" style={{ fontSize: '24px' }}>Login</h1>
                 
                </div>
                <div className="relative p-6 flex-auto">
                
                    
                    <label className="block text-black text-sm font-bold mb-1">
                      Email-Id
                    </label>
                    <input type="email" required placeholder="johnsnow@example.com" onChange={(e) => setLoginEmail(e.target.value)}  className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                
                    <label className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input type="password" required placeholder="Enter your password" onChange={(e) => setLoginPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                   
                 
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    // onClick={() => setShowModal(false)}
                  >
                    Submit
                  </button>
                  
                </div>
                <div className="flex items-start justify-center pb-6" >
                  <a className=" font-bold " onClick={() => {
              setSignModal(true),setShowModal(false)
            }} >Register</a>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
                 
   {/* ***************************************************Signup**************************************************************               */}

{signModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative w-auto my-6 mx-auto max-w-3xl" >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" >
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" onSubmit={sentOtp}>
                <div className="flex items-start justify-center p-3 border-b border-solid border-gray-300 rounded-t " >
                  <h1 className=" font-bold" style={{ fontSize: '24px' }}>Create a New Account</h1>
                </div>
                <div className="relative p-6 flex-auto">
                  
                    <label className="block text-black text-sm font-bold mb-1">
                      User Name
                    </label>
                    <input required type="text" placeholder="John" onChange={(e) => setSignName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Email-Id
                    </label>
                    <input required type="email" placeholder="johnsnow@example.com" onChange={(e) => setSignEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Mobile Number
                    </label>
                    <input required type="text" placeholder="XXX-XX-XXXX-XXX" onChange={(e) => setSignPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label  className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input required type="password" placeholder="Password" onChange={(e) => setSignPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Confirm-Password
                    </label>
                    <input required type="Cpassword" placeholder="Confirm-Password" onChange={(e) => setSignCPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setSignModal(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="text-white bg-green-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    // onClick={() => setOtpModal(true)}
                  >
                    Register
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* **************************************************OTP************************************************************* */}

{otpModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative w-auto my-6 mx-auto max-w-3xl" >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" >
              <form onSubmit={verifyOtpAndSignUp} className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <div className="flex items-start justify-center p-3 border-b border-solid border-gray-300 rounded-t " >
                  <h1 className=" font-bold" style={{ fontSize: '24px' }}>OTP</h1>
                 
                </div>
                <div className="relative p-6 flex-auto">
                  
                    <label className="block text-black text-sm font-bold mb-1">
                    Enter OTP sent to Your Email-Id
                    </label>
                    <input required onChange={(e) => setOtp(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                  
                 
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setOtpModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-green-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="submit"
                    // onClick={() => setOtpModal(false)}
                  >
                    Verify
                  </button>
                  
                </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
  </header>
    
  )
}

export default Header
