import React, { useEffect, useState,useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getOwnerUser } from '../../api/owner/ownerInstance';

 function OwnerChatList() {
  const owner = useSelector((state)=>state.owners.owner)
  const [chat,setChat] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchData=async()=>{
      if(owner){
        const response = await getOwnerUser(owner)
        if(response.success){
        setChat(response.data)
        }else{
          toast.error(response.message)
        }
      }
    }
    fetchData()
  },[owner])
  return (
    <div className='w-full m-3'>
        <h2 className="font-bold text-lg uppercase px-2 py-1">
     Chat (active users)
    </h2>
    <div className="flex justify-center ">
    
      <img
        src="https://img.freepik.com/premium-vector/blue-chat-speech-bubble-icon-3d-cartoon-minimal-style-vector-illustration_275806-1726.jpg"
        alt=""
        className="h-80"
      />
    </div>
    <div className="flex justify-center ">
      <ul role="list" className="divide-y divide-gray-100 w-full">
        {chat?.map((data) => (
          <li
            key={data._id}
            onClick={() =>
              navigate('/owner/OwnerChat', {
                state: { userId: data._id, userName: data.signName },
              })
            }
            className="flex justify-between gap-x-6 py-4 mt-1 bg-gray-100 shadow-sm hover:bg-blue-100 rounded-xl"
          >
            <div className="flex gap-x-10">
              {/* <img className="h-12 w-12 flex-none ml-4 object-cover rounded-full bg-gray-50"  alt="doctor Profile photo" /> */}
              <div className="min-w-0 ml-4 flex-auto">
                <p className="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">{data.signName} </p>
                <p className="mt-1 truncate text-md leading-5 text-gray-500">{data.signEmail}</p>
              </div>
            </div>
            <div className="mr-10 hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 md:text-lg lg:text-xl text-gray-900">demo</p>
              <p className="mt-1 text-md leading-5 text-gray-500">Phone : {data.signPhone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  

  )
}

export default OwnerChatList
