import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getEditProfile, getWallet } from '../../api/user/users'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'
import Loading from '../Loader/Loading'

 function Profile() {
    const user = useSelector(state => state.users.user)
    const navigate = useNavigate()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [edit,setEdit] = useState(false)
    const [editName,setEditName] = useState()
    const [editEmail,setEditEmail] = useState()
    const [editPhone,setEditPhone] = useState()
    const [loading, setLoading] = useState(true);
    const editData={
      user,
      editEmail,editName,editPhone
    }

    function actionModal() {
      setEdit(!edit);
    }
  
    function closeModal() {
      actionModal();
    }

    useEffect(()=>{
        const fetchData = async()=>{
        if(user){
          const response = await getWallet(user)
          if(response.success){
            setLoading(false)
            setName(response.data.signName)
            setEmail(response.data.signEmail)
            setPhone(response.data.signPhone)
          }else{
            toast.error(response.message)
          }
        }
        }
        fetchData()
    },[])

   const editProfile = async(e)=>{
    e.preventDefault()
    const response = await getEditProfile(editData)
    if(response.success){
      setName(response.data.signName)
      setEmail(response.data.signEmail)
      setPhone(response.data.signPhone)
      // actionModal()
    }else{
      toast.error(response.message)
    }
   }

   

  return (
    <main className="profile-page">
        <section className="relative block h-500-px">
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")'}}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black" />
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x={0} y={0}>
              <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
            </svg>
          </div>
        </section>
   
        <section className="relative py-16 bg-blueGray-200">
        {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                <div className="relative">
                  <img alt="..." src="https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                <div className="py-6 px-3 mt-32 sm:mt-0">
                  <button onClick={()=>setEdit(true)} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                    Edit
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4 lg:order-1">
              
              </div>
            </div>
          
            <div className="text-center mt-5 mb-5">
             
<h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
{name}
</h3>
<div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">

{email}
</div>
<div className="mb-2 text-blueGray-600 mt-10">
<i className="fas fa-phone mr-2 text-lg text-blueGray-400" />{phone}
</div>
 <button onClick={()=>navigate('/orders')} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Booking</button>
  <button onClick={()=>navigate('/wallet')} type="button" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Wallet</button>

            </div>
   
          </div>
        </div>
      </div>
      )}
         
        
        </section>
             
        {edit && (
        <form onClick={editProfile}>
          <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div
                className=" rounded-lg shadow "
                style={{ backgroundColor: "#1f2937" }}
              >
                <div className=" p-4 border-b rounded-t dark:border-gray-600 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Profile
                  </h3>
                </div>
                <div className=" m-3 grid gap-6 mb-2 ">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEditName(e.target.value)}
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEditEmail(e.target.value)}
                      id="last_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone
                    </label>
                    <input
                      type="phone"
                      onChange={(e) => setEditPhone(e.target.value)}
                      id="company"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Edit
                  </button>
                  <button
                    data-modal-hide="defaultModal"
                    onClick={closeModal}
                    type="button"
                    className="text-gray-500 bg-red-700 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
      </main>
  )
}

export default Profile
