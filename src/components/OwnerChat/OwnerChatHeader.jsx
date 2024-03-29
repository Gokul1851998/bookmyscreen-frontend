import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
 function OwnerChatHeader() {
    const location = useLocation()
    const userName = location.state.userName
  return (
    <div>
    <div class="overscroll-none">
<div
 class="fixed w-full bg-cyan-800 h-16 pt-2 text-white flex justify-between shadow-md  overscroll-none"
>
 {/* <!-- back button --> */}
 <Link to="/owner/owner-chatList">
   <svg
     xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24"
     class="w-12 h-12 my-1 text-green-100 ml-2"
   >
     <path
       class="text-green-100 fill-current"
       d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
     />
   </svg>
 </Link>
 <div class=" text-green-100 font-bold text-lg tracking-wide inline-flex  mt-1">
 <img src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'  class="flex-shrink-0 h-10 w-10 rounded-full object-cover bg-gray-300" />
 <p className="mt-2 ml-2">{userName}</p>
 </div>
 {/* <!-- 3 dots --> */}
 <div class="icon-dots-vertical w-8 h-8 mt-2 mr-2">
 </div>
</div>
</div>
 </div>
  )
}


export default OwnerChatHeader
