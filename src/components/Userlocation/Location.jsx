import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLocation } from '../../api/user/users'

export default function Location() {
    const location = useLocation()
    const place = location.state
    const navigate = useNavigate()
    const [theatre,setTheatre] = useState([])
    useEffect(()=>{
      const fetchData = async()=>{
        if(place){
            const response = await getLocation({place})
            if(response.success){
                setTheatre(response.data)
            }
        }
      }
      fetchData()
    },[place])
  return (
    <div className='w-full '>
    <h2 className="font-bold text-lg uppercase px-2 py-1 pt-3 pl-3">
         Your search location : "<span className='text-red-400'>{place}</span>"
          </h2>
      <div className="flex justify-center m-5">
      <ul role="list" className="divide-y divide-gray-300 w-full">
        {theatre?.map((data) => (
          <li
            key={data._id}
            onClick={() =>
              navigate('/theatreShows', {
                state: { ownerId:data._id},
              })
            }
            className="flex justify-between gap-x-6 py-4 mt-1 bg-gray-200 shadow-sm hover:bg-blue-100 rounded-xl"
          >
            <div className="flex gap-x-10">
              {/* <img className="h-12 w-12 flex-none ml-4 object-cover rounded-full bg-gray-50"  alt="doctor Profile photo" /> */}
              <div className="min-w-0 ml-4 flex-auto">
                <p className="text-sm md:text-lg lg:text-xl font-semibold leading-6 text-gray-900">{data.Name} </p>
                <p className="mt-1 truncate text-md leading-5 text-gray-500">{data.Email}</p>
              </div>
            </div>
            <div className="mr-10 hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 md:text-lg lg:text-xl text-gray-900">Location : {data.Location}</p>
              <p className="mt-1 text-md leading-5 text-gray-500">Phone : {data.Phone}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}
