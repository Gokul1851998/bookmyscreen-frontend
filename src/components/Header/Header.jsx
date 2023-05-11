import React, {useState,useContext,useEffect} from 'react'
import "tailwindcss/tailwind.css";
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import './Header.css'
import { userUrl} from '../../../apiLinks/apiLinks'
import { toast, Toaster } from 'react-hot-toast'
import { setUser } from '../../redux/usersSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSearch, getVerify } from '../../api/user/users';
import { imageUrl } from '../../constants/constants';

 function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
  const [forgot,setForgot] = useState(false)
  const [forgotEmail,setForgotEmail] = useState('')
  const [forgotOTP,setForgotOTP] = useState('')
  const [forPassword,setForPassword] = useState(false)
  const [forPassword1,setForPassword1] = useState(false)
  const [forPassword2,setForPassword2] = useState(false)

// 
const [showSidebar, setShowSidebar] = useState(false);
const [displayName,setDisplayName] = useState('')
const [inputValue,setInputValue] = useState('')
const [suggestions,setSuggestions] = useState([])

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

  let forgotData={
    forgotEmail,
    forPassword1,
    forPassword2
  }

  useEffect(() => {
    isAuthenticated()

 }, [])

  const sentOtp = (e) => {
    e.preventDefault()
    if (signPassword === signCPassword) {
        setLoading(true)
        axios.post(`${userUrl}getOtp`, userSignup).then((response) => {
        
            response.data.userExist ? toast.error('User Already Exist') : (setSignModal(false), setShowModal(false), setOtpModal('otp'))
        }).catch((err) => {
            toast.error('some unexpected errors please try after some time')
        }).finally(() => setLoading(false))
    } else {
        toast.error("Passwords doesnt match")
    }
}

const resendOtp = () => {
  axios.post(`${userUrl}resendOtp`, { signEmail }).then((response) => {
      response.data.status && toast.success('otp has sent to email')
  })
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

const verifyOtp2 = (e) =>{
  e.preventDefault()
  setLoading(true)
  axios.post(`${userUrl}forgotOtp`, { forgotEmail,forgotOTP}).then((response) => {
    response.data.success ? (setForgot(false),setForPassword(true)) : toast.error('Incorrect otp')
  }).catch(() => {
    toast.error('some unexpected errors please try after some time')
}).finally(() => setLoading(false))
}

const checkPassword =(e)=>{
  e.preventDefault()
  setLoading(true)
  axios.post(`${userUrl}reset-password`, {forgotData}).then((response) => {
    response.data.success ? (setShowModal(true),setForPassword(false),toast.success(response.message)) : toast.error(response.message)
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
  navigate('/')
};

function isAuthenticated() {
  const token = localStorage.getItem('userToken');
  const userName = localStorage.getItem("userName")
  setDisplayName(userName)

  // You can implement your own logic to validate the token
  return token ? setIslogin(true) : setIslogin(false);
}

const chectEmail = async(e) =>{
  e.preventDefault()
  const response = await getVerify(forgotEmail)
  if(response.success){
    toast.success(response.message)
  }else{
    toast.error(response.message)
  }
}

const handleInputChange = async (e) => {
  e.preventDefault()
  try {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() !== '') { // check if the input value is not empty
      const response = await getSearch(value);
     
      setSuggestions(response.data);
    } else {
      setSuggestions([]); // clear the suggestions if the input value is empty
    }
  } catch (error) {
    console.log(error);
  }
}

const singlePage=(movieId)=>{
  navigate('/singleMoviePage',{state:movieId})
  setSuggestions('')
}

const locationPage=(location)=>{
  navigate('/location',{state:location})
  setSuggestions('')
}

  return (
    <header className="bg-gray-800 relative z-20">
       <Toaster />
       
      
        <nav class="container mx-auto px-6 py-3">
  <div class="flex flex-wrap items-center justify-between">
    <div class="text-white font-bold pl-6 pr-3" style={{ fontSize: "24px" }}>
      <h2>book<span class="text-danger font-bold">my</span>screen</h2>
    </div>
    <div className="relative text-gray-600">
      <input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        name="search"
        placeholder="Search"
        className="form-control rounded"
      />
      {suggestions.length ? (
        <div className="dropdown w-80">
          {suggestions.map((suggestion) => (
            <div className="dropdown-row relative z-50 " key={suggestion.title}>
              {suggestion.title && (
                <a onClick={() => singlePage(suggestion.movieId)}>
                  <img
                    src={`${imageUrl}${suggestion.image}`}
                    className="w-10 h-15 object-cover object-center inline-block mr-2"
                  />
                  <span className="inline-block">{suggestion.title}</span>
                </a>
              )}
              {suggestion.Location && (
                <a onClick={() => locationPage(suggestion.Location)}>
                  <img
                    src='https://images.template.net/101912/location-icon-clipart-5z262.jpg'
                    className="w-10 h-15 object-cover object-center inline-block mr-2"
                  />
                  <span className="inline-block">{suggestion.Location}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
      
     
    {islogin?(
      <>
      {isAuthenticated?  (
        <div className='userimg fixed  z-30 flex items-center cursor-pointer right-10 top-6' onClick={() => setShowSidebar(!showSidebar)}>
              <img src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" alt='User'/>
              </div>
      ) :null}
      
      <div
  className={`top-0 right-0 w-full md:w-[25vw] bg-gray-800 p-5 md:p-10 text-white fixed h-full z-40 transition-all duration-300 ${
    showSidebar ? "translate-x-0 " : "translate-x-full"
  }`}
>
  <h6 className="mt-6 md:mt-10 text-2xl md:text-3xl font-semibold text-white cursor-pointer">
    <span className="pr-2">Hi </span>
    {displayName}
  </h6>
  <h6 onClick={()=>{navigate('/profile')}} className="mt-6 md:mt-10 text-lg md:text-2xl font-semibold text-white cursor-pointer">
    Profile
  </h6>
  <h6 onClick={()=>{navigate('/orders')}} className="mt-6 md:mt-10 text-lg md:text-2xl font-semibold text-white cursor-pointer">
    Your Orders
  </h6>
  <h6 onClick={()=>{navigate('/wallet')}} className="mt-6 md:mt-10 text-lg md:text-2xl font-semibold text-white cursor-pointer">
    Wallet
  </h6>
  <h6 onClick={()=>{navigate('/chatList')}} className="mt-6 md:mt-10 text-lg md:text-2xl font-semibold text-white cursor-pointer">
    Chat
  </h6>
  <h6
    onClick={() => setShowSidebar(!showSidebar)}
    className="mt-6 md:mt-10 text-lg md:text-2xl font-semibold text-white cursor-pointer"
  >
    Exit
  </h6>
  <div className="flex h-screen items-center justify-center">
    <button
      className="absolute bottom-0 mb-4 md:mb-8 bg-red-500 hover:bg-red-600 text-white font-bold text-base md:text-lg py-2 px-10 md:px-14 rounded"
      onClick={logout}
    >
      Log out
    </button>
  </div>
</div>
<div className="relative text-gray-600"></div>
      </>
    ):(

<div className="flex pl-2 mr-2">
<button className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-1 px-3 rounded" onClick={() => {
   setShowModal(true)
 }}>
Login
</button>

</div>

      
    ) }
      </div>
    </nav>
    
        <div>
        <nav className="container mx-auto px-6 py-3">
      <div className="flex items-center justify-between">
        <div >
          <a className="mx-3 text-white hover:text-gray-300" style={{ cursor: 'pointer' }} onClick={()=>{navigate('/')}}>Home</a>
          <a className="mx-3 text-white hover:text-gray-300" style={{ cursor: 'pointer' }} onClick={()=>{navigate('/allMovies')}}>Movies</a>
          <a className="mx-3 text-white hover:text-gray-300" style={{ cursor: 'pointer' }} >Theatres</a>
        </div>
      </div>
    </nav>
        </div>
                
                {/* ***********************************************Login*********************************************** */}

        {showModal ? (
      <>
      <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>Sign in</h3>
         </div>
          <div className="card-body">
            <form onSubmit={userSignIN}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user" /></span>
                </div>
                <input type="text" onChange={(e) => setLoginEmail(e.target.value)} className="form-control" placeholder="Email Id" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepen">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
                <input type="password" onChange={(e) => setLoginPassword(e.target.value)} className="form-control" placeholder="password" />
              </div>
              <div className="form-group">
                <input type="submit" defaultValue="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
             
              <button onClick={() => {
                setSignModal(true),setShowModal(false)
              }} type="button" className="btn btn-primary btn-md mb-1" style={{backgroundColor: '#35558a'}}>
            Sign Up
          </button>
            </div>
            <div className="d-flex justify-content-center ">
              <a onClick={()=>(setForgot(true),setShowModal(false))} className='text-lg pb-2' style={{color: 'white',cursor: 'pointer'}} >Forgot your password?</a>
            </div>
            <button
              
              type="button"
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
    
      ) : null}
                 
   {/* ***************************************************Signup**************************************************************               */}

{signModal ? (
        <>
          <div className="modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card w-full h-auto">
        <div className="card-header text-center">
          <h3 className='text-xl'>Register Here</h3>
         </div>
          <div className="card-body">
            <form onSubmit={sentOtp}>
            <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user" /></span>
                </div>
                <input required type="text" onChange={(e) => setSignName(e.target.value)} className="form-control" placeholder="User Name" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user" /></span>
                </div>
                <input required type="text" onChange={(e) => setSignEmail(e.target.value)} className="form-control" placeholder="Email Id" />
              </div>

               

              

             <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user" /></span>
                </div>
                <input required type="number" onChange={(e) => setSignPhone(e.target.value)} className="form-control" placeholder="Mob Number" />
              </div>



              <div className="input-group form-group">
                <div className="input-group-prepen">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
                <input required type="password" onChange={(e) => setSignPassword(e.target.value)} className="form-control" placeholder="Password" />
              </div>
               <div className="input-group form-group">
                <div className="input-group-prepen">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
                <input required type="password" onChange={(e) => setSignCPassword(e.target.value)} className="form-control" placeholder="Confirm-Password"/>
              </div>


              <div className="form-group">
                <input type="submit" defaultValue="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            
            <button
             
              onClick={() => setSignModal(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
        </>
      ) : null}

      {/* **************************************************OTP************************************************************* */}

{otpModal ? (
        <>
          <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>OTP verification</h3>
         </div>
          <div className="card-body">
            <form onSubmit={verifyOtpAndSignUp}>
            <label className="block text-white text-lg  mb-3">
                    Enter OTP sent to Your Email-Id
                    </label>
              <div className="input-group form-group">
                
                  
                <input type="number" required onChange={(e) => setOtp(e.target.value)} className="form-control" placeholder="OTP" />
              </div>
              
              <div className="form-group">
                <input type="submit" defaultValue="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
             
              <button onClick={() => {
                onClick={resendOtp}
              }} type="button" className="btn btn-primary btn-md mb-1" style={{backgroundColor: '#35558a'}}>
           Resent
          </button>
            </div>
            <div className="flex items-start justify-center pb-6" >
                  <a className=" font-bold text-white"  ></a>
                </div>
            <button
              
              type="button"
              onClick={() => setOtpModal(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
        </>
      ) : null}



      {/* **************************************************Forgot password************************************************************* */}

      {forgot ? (
        <>
          <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>Forgot Password</h3>
         </div>
          <div className="card-body">
            <form onSubmit={chectEmail}>
            <label className="block text-white text-lg  mb-2">
                    Enter your Email Id
                    </label>
              <div className="input-group form-group">

                <input type="email" required onChange={(e) => setForgotEmail(e.target.value)} className="form-control" placeholder="Email Id" />
              </div>
              
              <div className="form-group">
                <input type="submit" defaultValue="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <form onSubmit={verifyOtp2}>
          <label className="block text-white text-lg  mb-2">
                   Enter the OTP here
                    </label>
          <div className="input-group form-group">

          <input type="number" required onChange={(e) => setForgotOTP(e.target.value)} className="form-control " placeholder="OTP" />
              </div>
            <div className="d-flex justify-content-center links">
             
              <button  type="submit" className="btn btn-primary btn-md mb-1" style={{backgroundColor: '#35558a'}}>
           Verify
          </button>
            </div>
            </form>
            <div className="flex items-start justify-center pb-6" >
                  <a className=" font-bold text-white"  ></a>
                </div>
            <button
              
              type="button"
              onClick={() => setForgot(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>

          </div>
        </div>
      </div>
        </>
      ) : null}



{forPassword ? (
      <>
      <div className=" modal flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-opacity-75 bg-gray-900">
        <div className="card">
        <div className="card-header text-center">
          <h3 className='text-xl'>Reset Password</h3>
         </div>
          <div className="card-body">
            <form onClick={checkPassword}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
                <input type="number" onChange={(e) => setForPassword1(e.target.value)} className="form-control" placeholder="Password" />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
                <input type="number" onChange={(e) => setForPassword2(e.target.value)} className="form-control" placeholder="Confirm password" />
              </div>
              <div className="form-group">
                <input type="submit" defaultValue="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
          <div className="card-footer">
           
          
            <button
              
              type="button"
              onClick={() => setForPassword(false)}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '1rem',
                color: 'red'
              }}
            >
              <i class="fa fa-window-close" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </>
    
      ) : null}

  </header>
    
  )
}

export default Header
