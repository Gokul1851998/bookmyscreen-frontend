import React, { useEffect, useState,useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserOwner } from '../../api/user/users';
import { toast } from 'react-hot-toast';

 function ChatList() {
  const user = useSelector((state)=>state.users.user)
  const [chat,setChat] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData=async()=>{
      if(user){
        const response = await getUserOwner(user)
        if(response.success){
        setChat(response.data)
        }else{
          toast.error(response.message)
        }
      }
    }
    fetchData()
  },[user])
  return (
    <div className='w-full '>
    <h2 className="font-bold text-lg uppercase px-2 py-1 mt-3 ml-3">
 Chat (active bookings)
</h2>
<div className="flex justify-center ">
          <img
            src="https://img.freepik.com/premium-vector/blue-chat-speech-bubble-icon-3d-cartoon-minimal-style-vector-illustration_275806-1726.jpg"
            alt=""
            className="h-80"
          />
         
        </div>
        <div className="flex justify-center ">
      <ul role="list" class="divide-y divide-gray-100 w-full m-5">
        {chat?.map((data)=>(
      <li onClick={()=>navigate('/chat',{state:{ownerId:data._id,Name:data.Name}})} class="flex justify-between gap-x-6 py-5 mt-2 bg-gray-100 shadow-sm hover:bg-blue-100 rounded-xl" >
    <div class="flex gap-x-10">
      {/* <img class="h-12 w-12 flex-none ml-4 object-cover rounded-full bg-gray-50"  alt="doctor Profile photo" /> */}
      <div class="min-w-0 ml-4 flex-auto">
        <p class="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">{data.Name} </p>
        <p class="mt-1 truncate text-md leading-5 text-gray-500">{data.Email}</p>
      </div>
    </div>
    <div class="mr-10 hidden sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 md:text-lg lg:text-xl text-gray-900">{data.Location}</p>
      <p class="mt-1 text-md leading-5 text-gray-500">{data.Phone} </p>
    </div>
  </li> 
          ))
        }
 

</ul>
</div>
  </div>
  )
}

export default ChatList
