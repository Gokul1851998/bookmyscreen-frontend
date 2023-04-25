import React,{Fragment,useEffect,useState,useMemo} from 'react'

import axios from 'axios'
import { adminUrl } from '../../../apiLinks/apiLinks'
import Swal from 'sweetalert2'
import 'animate.css'
import { useTable ,usePagination} from 'react-table';



function UserList() {
  const [users,setUsers]=useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getAllUsers();
        if (response.success) {
          setUsers(response.data);
        } else {
          console.log("no users");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  
  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(`${adminUrl}adminuser`,{headers});
      return response.data;
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const handleBlock = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are blocking a user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await axios.post(`${adminUrl}block-user`,{userId})
        console.log(response);
        if(response.data.success){
        Swal.fire(
          'Blocked!',
          'The User is blocked.',
          'success'
        ).then(()=>{
          setUsers(response.data.data)
        })

        }
        
      }
    })
  }

  const handleUnblock = async(userId) => {
    const response =await axios.post(`${adminUrl}unblock-user`,{userId})
     Swal.fire(
       'Unblocked',
       'The User is unblocked',
       'success'
     ).then(()=>{
       setUsers(response.data.data)
     })
   }
     
  
  const COLUMNS = [
    
    {
        Header:'Name',
        accessor:'signName'
    },
    {
        Header:'Email',
        accessor:'signEmail'
    },
    {
        Header:'Phone',
        accessor:'signPhone'
    }
]

const columns = useMemo(()=>COLUMNS,[])
const data = useMemo(()=>users,[users])

const tableInstance = useTable({
  columns,
  data
},
  usePagination
)


const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  nextPage,
  previousPage,
  prepareRow
} = tableInstance


  return (
    <Fragment>
     <div className='ml-10 mr-10' style={{ overflowX: 'auto' }}>
        <h2 className="font-bold text-lg uppercase px-6 py-4">
          Users List
        </h2>
        <div className="overflow-x-auto">
          <table id="myTable" {...getTableProps()} style={{ border: "0.5px solid black" }} className="table-auto min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-900 text-white">
            {headerGroups && headerGroups.map((headerGroup)=>(
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th className="px-6 py-4 text-left font-semibold uppercase">No</th>
                {
                 headerGroup.headers.map((column)=>(
                <th className="px-6 py-4 text-left font-semibold uppercase" {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))
              }
                <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
          
              </tr>
               ))}
            </thead>
            <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
            {
          page.map((row)=>{
           prepareRow(row)
           return(
              <tr {...row.getRowProps()} >
                <td className="px-6 py-4 whitespace-nowrap" >
                {+row.id + 1 }
                </td>

                {
                row.cells.map((cell)=>{
                  return <td className="px-6 py-4 whitespace-nowrap" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                </td>
                  })
                }
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                {row?.original?.block===false ? 
                        <button 
                        onClick={()=>handleBlock(row.original._id)}
                        type="button"
                        className="inline-block rounded bg-danger px-9 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]">
                        Block
                      </button>
                        :  <button onClick={()=>handleUnblock(row.original._id)}
                    type="button"
                    className="inline-block rounded bg-success px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                       Unblock
                  </button>
                        }
                        </td>
              </tr>
                 )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default UserList
