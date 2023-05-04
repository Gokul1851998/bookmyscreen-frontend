import React,{useEffect, useState} from 'react'
import { addShow, deleteShow, editShow, getMovieName, getSelectScreen, getShows } from '../../api/owner/ownerInstance';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
const perPage = 8;
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getUTCDate().toString().padStart(2, '0')}--${(date.getUTCMonth()+1).toString().padStart(2, '0')}--${date.getUTCFullYear()}`;
}

function AddShowList() {
    const owner = useSelector(state => state.owners.owner);
    const [showModal, setShowModal] = useState(false);
    const [time,setTime] = useState('')
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')
    const [price,setPrice] = useState('')
    const [screen,setScreen] = useState('')
    const [screenSuggestions,setScreenSuggestion] = useState([])
    const [shows,setShows] = useState([])
    const [editModal,setEditModal] = useState(false)
    const [editData,setEditData] = useState([])
    const [editId,setEditId] = useState('')
    const [movieName, setMovieName] = useState("")
    const [showTime,setShowTime] = useState('')
    // const [end,setEnd] = useState('')
    // const [start,setStart] = useState('')
    const [editprice,setEditprice] = useState('')
    // const [screenNo,setScreenNo] = useState('')
   
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestion, setShowSuggestions] = useState(false);
    const [inputValue, setInputvalue] = useState("");
    const [language,setLanguage] = useState("");

    const showsData = {
    editId,
    owner,
    inputValue,
    time,
    startDate,
    endDate,
    price,
    screen,
    }

    const dataEdit ={
      editId,
      owner,
      showTime,
      editprice,
      inputValue,
      startDate,
      endDate,
      screen
    }

    useEffect(()=>{
      const data = () => {
        setMovieName(editData.movieName)
        setShowTime(editData.showTime)
        setEditprice(editData.price)
      }
      data()
    },[editData])

    useEffect(()=>{
      const fetchData = async()=>{
           try {
              if(owner){
             
              const response = await getShows(owner._id);
              if(response.success){
                  setShows(response.data)
              }else{
                  toast.error(response.message)
              }
              }
          
        } catch (error) {
          console.log(error);
        } 
      }
      fetchData();
  },[owner])
    
    const handleInputChange = async (e) => {
      try {
        const value = e.target.value;
        setInputvalue(value);
        const response = await getMovieName();
        setSuggestions(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.log(error);
      }
    };

    const handleScreen=async(e)=>{
      try{
        const value = e.target.value;
        setScreen(value)
        const response = await getSelectScreen(owner._id)
        if(response.success){
          setScreenSuggestion(response.data)
        }else{
          toast.error(response.message)
        }
      }catch (error) {
        console.log(error);
      }
    }

    function toggleModal() {
        setShowModal(!showModal);
      }

      function actionModal(){
        setEditModal(!editModal)
      }

     const handleAccept=async(e)=>{
      try{
        e.preventDefault();
        const response = await addShow(showsData)
        if(response.success){
          setShows(response.data)
          toast.success(response.message)
          toggleModal();
        }else{
          toast.error(response.message)
        }  
          }catch (error) {
            console.log(error);
          }
        }

      const editAccept = async(e)=>{
        try{
          e.preventDefault();
          const response = await editShow(dataEdit)
          if(response.success){
            setShows(response.data)
            toast.success(response.message)
            actionModal();
          }else{
            toast.error('Something went wrong')
          }  
            }catch (error) {
              console.log(error);
            }
      }

      function handleDecline() {
        toggleModal();
      }

      function closeModal(){
        actionModal();
      }

      const onSearch = (searchTerm,movieLanguage) => {
        setInputvalue(searchTerm)
        setLanguage(movieLanguage)
      };

      const handelDetete = (showId) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You are deleting a Show!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
          }).then(async(result) => {
            if (result.isConfirmed) {
            const response = await deleteShow({showId})
            if(response.success){
            Swal.fire(response.message)
            setShows(response.data)
          }else{
            toast.error('Something error')
          }
        }
        })
      }


      const [currentPage, setCurrentPage] = useState(1);

      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
    
      const displayedlist = shows.slice(startIndex, endIndex);
    
      const totalPages = Math.ceil(shows.length / perPage);
    
      const handlePrevClick = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };
    
      const handleNextClick = () => {
        setCurrentPage((prevPage) => prevPage + 1);
      };

  return (
    <>
    <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
    <div className="flex justify-between mb-3 mt-1">
    <h2 className="font-bold text-lg uppercase px-3 py-2">
      Shows 
    </h2>
    <button className=" bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={toggleModal}>Add</button>
  </div>
    <div className="overflow-x-auto" >
    <table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>  
  <thead className="bg-gray-900 text-white">
    <tr>
      <th className="px-6 py-4 text-center font-semibold uppercase">No</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Movie Name</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Screen Number</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Show Time</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Start Date</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">End Date</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Price</th>
      <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
     
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
      {displayedlist.map((list,index)=>(
        
      <tr key={list._id}>
        <td className="px-6 py-4  text-center">
         {index+1}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
         {list.movieName}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
         {list.screen}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
        {list.showTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
         {new Date(list.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
       </td>
        <td className="px-6 py-4 font-semibold text-center">
         {new Date(list.endDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
        </td>
        <td className="px-6 py-4 font-semibold text-center">
         Rs.{list.price}
        </td>
        <td className="px-6 py-4 text-center">
          <div className='mb-2'>
          <button
          onClick={()=>(setEditModal(true),setEditData(list),setEditId(list._id))}
            type="button"
            className="inline-block  rounded bg-info px-10 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
              Edit
          </button></div>
          <div>
          <button
          onClick={()=>handelDetete(list._id)}
            type="button"
            className="inline-block rounded bg-danger px-8 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
              Delete
          </button>
          </div>
        </td>
      </tr>
  ))}
  </tbody>
</table>
<div className="flex justify-center mt-3">
      <button
        type="button"
          className="inline-block rounded  mr-4"
           onClick={handlePrevClick}
          disabled={currentPage === 1}
         >
         <i className="fas fa-chevron-left" style={{fontSize: '1.5em'}}></i>
       </button>
         <button
        type="button"
         className="inline-block rounded "
         onClick={handleNextClick}
         disabled={currentPage === totalPages}
         >
       <i className="fas fa-chevron-right" style={{fontSize: '1.5em'}}></i>

        </button>

        </div>
    
    </div>
  </div>
      





      {showModal && (
        <form onSubmit={handleAccept}>
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className=" rounded-lg shadow " style={{backgroundColor:'#49154e'}}>
            <div className=" p-4 border-b rounded-t dark:border-gray-600 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
             Add Shows
           </h3>
          </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 m-3 ">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Name</label>
            <input type="text" value={inputValue}  onChange={(e) => handleInputChange(e)}  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
         
  {suggestions
    .filter((item) => {
      const searchTerm = inputValue.toLowerCase();
      const title = item.title.toLowerCase();

      return (
        searchTerm &&
        title.startsWith(searchTerm) &&
        title !== searchTerm
      );
    })
    .slice(0, 5)
    .map((suggestion) => (
      <option 
        onClick={() => onSearch(suggestion.title,suggestion.original_language)}
        value={suggestion.title}
        key={suggestion.title}
        className="dropdown-row bg-white"
      >
        {suggestion.title}
      </option>
    ))}

          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Time</label>
            <input  type="time" onChange={(e)=>setTime(e.target.value)} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Date</label>
            <input type="date" onChange={(e)=>setStartDate(e.target.value)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>  
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending Date</label>
            <input type="date" onChange={(e)=>setEndDate(e.target.value)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Price</label>
            <input type="number" onChange={(e)=>setPrice(e.target.value)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Screen Number</label>
            <select id="screen"  onClick={(e) => handleScreen(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500">
    {screenSuggestions.map((suggestion) => (
      <option value={suggestion.screen} key={suggestion._id}>{suggestion.screen}</option>
    ))}
  </select>
          </div>
        </div>
             <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
               <button data-modal-hide="defaultModal"  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
               <button data-modal-hide="defaultModal" onClick={handleDecline} type="button" className="text-gray-500 bg-red-700 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600">Cancel</button>
             </div>
             
           </div>
         </div>
       </div>
       </form>
        )}



{editModal && (
        <form onSubmit={editAccept}>
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full flex justify-center items-center">
        <div className="relative w-full h-full max-w-2xl md:h-auto">
            <div className=" rounded-lg shadow " style={{backgroundColor:'#49154e'}}>
            <div className=" p-4 border-b rounded-t dark:border-gray-600 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
             Edit Shows
           </h3>
          </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 m-3 ">
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Name</label>
            <input type="text" value={inputValue}  onChange={(e) => (handleInputChange(e),setMovieName(e.target.value))}  id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
         
  {suggestions
    .filter((item) => {
      const searchTerm = inputValue.toLowerCase();
      const title = item.title.toLowerCase();

      return (
        searchTerm &&
        title.startsWith(searchTerm) &&
        title !== searchTerm
      );
    })
    .slice(0, 5)
    .map((suggestion) => (
      <option 
        onClick={() => onSearch(suggestion.title,suggestion.original_language)}
        value={suggestion.title}
        key={suggestion.title}
        className="dropdown-row bg-white"
      >
        {suggestion.title}
      </option>
    ))}

          </div>
          <div>
            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Show Time</label>
            <input value={showTime} type="time" onChange={(e)=>(setTime(e.target.value),setShowTime(e.target.value))} id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
          </div>
          <div>
            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Starting Date</label>
            <input  type="date" onChange={(e)=> setStartDate(e.target.value)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>  
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ending Date</label>
            <input type="date" onChange={(e)=>setEndDate(e.target.value)} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Price</label>
            <input value={editprice} type="number" onChange={(e)=>(setPrice(e.target.value),setEditprice(e.target.value))} id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Screen Number</label>
            <select  id="screen"  onClick={(e) => handleScreen(e)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
    {screenSuggestions.map((suggestion) => (
      <option value={suggestion.screen} key={suggestion._id}>{suggestion.screen}</option>
    ))}
  </select>
          </div>
        </div>
 
     
             {/* Modal footer */}
             <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
               <button data-modal-hide="defaultModal"  type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
               <button data-modal-hide="defaultModal" onClick={closeModal} type="button" className="text-gray-500 bg-red-700 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-red-700 dark:text-gray-300 dark:border-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-600">Cancel</button>
             </div>
             
           </div>
         </div>
       </div>
       </form>
        )}
        
      </>
  )
}

export default  AddShowList
