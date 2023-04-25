import React, { Fragment, useEffect, useState } from 'react'
import { getAllOwners, ownerApprove,ownerDenied } from '../../api/admin/admin';
import Swal from 'sweetalert2'
import 'animate.css'
import './OwnerList.css'



 function OwnerList() {
    const [owners,setOwners] = useState([])
    const [viewImage,setViewImage] = useState(false)
    const [preImage,setPreImage] = useState('')
    useEffect(() => {
        const fetchOwner = async () => {
          const response = await getAllOwners();
          // console.log(response.data);
          if (response.success) {
            setOwners(response.data);
          } else {
            console.log("no owners");
          }
        };
        fetchOwner();
      }, []);
    
      const handleApproved = (ownerId) =>{
        console.log('loh');
        Swal.fire({
          title: 'Are you sure?',
          text: "You are giving Approval to a theater Owner!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#198754',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Approve!'
        }).then(async(result)=>{
          if (result.isConfirmed){
            const response = await ownerApprove({ownerId})
            if(response.success){
              Swal.fire(
                'Aprroved',
                'The Theatre Owner can login now.',
                'success'
              ).then(()=>{
                setOwners(response.data)
              })
      
              }
          }
        })
      }
  
      
      const handleDenied= async(ownerId)=>{
        const response = await ownerDenied({ownerId})
        console.log(response);
        Swal.fire(
          'Denied',
          'The Owner request Denied',
          'warning'
        ).then(()=>{
          setOwners(response.data)
        })
      }


  return (
    <Fragment>
    <div className='ml-5 mr-5' style={{ overflowX: 'auto' }}>
    <h2 className="font-bold text-lg uppercase px-6 py-4">
     Theatre Owners Approval List
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
            <th className="px-6 py-4 text-center font-semibold uppercase">Location</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">ID Proof</th>
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
              {owner.Location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <img src={owner.images} alt='ID Proof' onClick={()=>{setViewImage(true);setPreImage(owner.images)}} className="cursor-pointer"/>
              </td>
             
              <td className="px-6 py-4 whitespace-nowrap">
              <select
  value={owner?.status}
  onChange={(e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === 'Approved') {
      handleApproved(owner._id);
    } else if (selectedStatus === 'Denied') {
      handleDenied(owner._id);
    } else {
      handlePending(owner._id);
    }
  }}
  className={`inline-block rounded px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out ${
    owner?.status === 'Approved' ? 'bg-success' : owner?.status === 'Denied' ? 'bg-danger' : owner?.status === 'Pending' ? 'bg-info' : ''
  } hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]`}
>
  <option value="Pending" className="bg-white text-black font-bold">
    Pending
  </option>
  <option value="Approved" className="bg-white text-black font-bold">
    Approved
  </option>
  <option value="Denied" className="bg-white text-black font-bold">
    Denied
  </option>
</select>

</td>
          </tr>
        ))}
          {/* Repeat the previous row for each user */}
        </tbody>
      </table>
    </div>
  </div>
  {viewImage && (
             <div className="modal" onClick={() => setViewImage(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={preImage} alt='ID Proof' className="modal-image" />
            </div>
             </div>
               )}
  </Fragment>
  )
}

export default OwnerList
