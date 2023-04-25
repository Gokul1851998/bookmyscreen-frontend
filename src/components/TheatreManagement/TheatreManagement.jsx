import React, { Fragment, useEffect, useState } from 'react'
import { blockOwner, getAllOwners, unblockOwner } from '../../api/admin/admin';
import Swal from 'sweetalert2'
import 'animate.css'
import { Toaster,toast } from 'react-hot-toast';

function TheatreManagement() {
  const [owners,setOwners] = useState([])
    useEffect(() => {
        const fetchOwner = async () => {
          const response = await getAllOwners();
          if (response.success) {
            setOwners(response.data);
          } else {
            console.log("no owners");
          }
        };
        fetchOwner();
      }, []);
      
      const handleBlock=(ownerId)=>{
        Swal.fire({
          title: 'Are you sure?',
          text: "You are blocking a Theater Owner!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Block!'
        }).then(async(result)=>{
          if (result.isConfirmed) {
            const response = await blockOwner({ownerId})
            if(response.success){
              Swal.fire(
                'Blocked!',
                'The Owner is blocked.',
                'success'
              ).then(()=>{
                setOwners(response.data)
              })
            }
          }
        })
      }

      const handleUnblock= async (ownerId)=>{
        const response = await unblockOwner({ownerId})
        console.log(response);
        Swal.fire(
          'Unblocked',
          'The Owner is unblocked',
          'success'
        ).then(()=>{
          setOwners(response.data)
        })
      }

  return (
    <Fragment>
    <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
    <h2 className="font-bold text-lg uppercase px-6 py-4">
     Theatre Owner Management
    </h2>
    <div className="overflow-x-auto" >
      <table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>
        <thead className="bg-gray-900 text-white">
          <tr>
          <th className="px-6 py-4 text-left font-semibold uppercase">No</th>
            <th className="px-6 py-4 text-left font-semibold uppercase">Name</th>
            <th className="px-6 py-4 text-left font-semibold uppercase">Email</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Phone</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Adhaar ID</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Theatre Licence</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {owners && owners.map((owner,index)=>(
          <tr key={owner._id} >
            <td className="px-6 py-4 whitespace-nowrap">
             {index+1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {owner.Name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {owner.Email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {owner.Phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              {owner.Adhaar}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              {owner.Licence}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {owner?.block ?
                    <button onClick={()=>handleUnblock(owner._id)}
                    type="button"
                    className="inline-block rounded bg-success px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                       Unblock
                  </button>
                 :
              <button 
              onClick={()=>handleBlock(owner._id)}
              type="button"
              className="inline-block rounded bg-danger px-9 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]">
              Block
            </button>
              }
              </td>
          </tr>
        ))}
          {/* Repeat the previous row for each user */}
        </tbody>
      </table>
    </div>
  </div>
  </Fragment>
  )
}

export default  TheatreManagement
