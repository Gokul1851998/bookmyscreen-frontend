import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { addMovieDetails,getMovies,deleteMovie } from '../../api/admin/admin';
import { getMoviename ,getMovieDetailsByName } from '../../api/movie/movie';
import Swal from 'sweetalert2';
import './AdminMovies.css'
const perPage = 6;
 function AdminMovies() {
    const [movies,setMovies] = useState([])
    const [movieModal,setMovieModal] = useState(false)
    const [inputValue,setInputValue] = useState('')
    const [suggestions,setSuggestions] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await getMovies()
            setMovies(response.data)
        }
        fetchData();
    },[])

    const handleInputChange = async (e) => {
        try {
          const value = e.target.value;
          setInputValue(value);
          const response = await getMoviename(value);
          setSuggestions(response.results);
        } catch (error) {
          console.log(error);
        }
    }

    const onSearch = (searchTerm,movieLanguage) => {
        setInputValue(searchTerm)
    }

    const handleAddMovie = async(e) => {
        e.preventDefault()
        const response = await getMovieDetailsByName(inputValue)
        const response2 = await addMovieDetails({movieDetails:response.results[0]})
        console.log(response2.data)
        if(response2.success){
            Swal.fire(response2.message).then(() => {
              setMovieModal(false),
              setMovies(response2.data)
              });
        }else{
            Swal.fire(response2.message)
        }
    }

    const handledeleteMovie = async(movieId) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You are deleting a movie!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete!'
      }).then(async(result) => {
        if (result.isConfirmed) {
        const response = await deleteMovie({movieId})
        if(response.success){
        Swal.fire(response.message)
        setMovies(response.data)
      }
    }
    })
  }

    const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  const displayedMovies = movies.slice(startIndex, endIndex);

  const totalPages = Math.ceil(movies.length / perPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      
      
    <div className='ml-10 mr-10' style={{ overflowX: 'auto' }} >
    <div className="flex justify-between mb-3 mt-3">
    <h2 className="font-bold text-lg uppercase px-3 py-2">
      Movie List
    </h2>
    <button className=" bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=>setMovieModal(true)}>Add</button>
  </div>
    <div className="overflow-x-auto" >
    <table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold uppercase">No</th>
            <th className="px-6 py-4 text-left font-semibold uppercase">Movie Id</th>
            <th className="px-6 py-4 text-left font-semibold uppercase">Title</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Language</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Release Date</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {displayedMovies.map((movie, index) => (
            <tr key={movie._id} >
              <td className="px-6 py-4 whitespace-nowrap">
                {startIndex + index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {movie.movieId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {movie.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {movie.language}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {movie.releaseDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <button
                   onClick={()=>handledeleteMovie(movie._id)}
                    type="button"
                    className="inline-block rounded bg-danger px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                       Delete
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
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

  {movieModal ?
  <form >
    <div className="formcontainer" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "#fefefe", padding: "20px", borderRadius: "5px", boxShadow: "0 0 20px rgba(0,0,0,0.3)", zIndex: 1 }}>
      
    <h1 className='font-semibold large-heading pb-2'>Add Movies</h1>
      <hr/>
      <div className="container ">
        <label htmlFor="uname mb-5" className='pb-3'><strong>Movie Name</strong></label>
        <hr/>
        <input type="text" placeholder="Enter Movie Name" name="uname" required
          autocomplete="off"
          value={inputValue}
          onChange={(e) => handleInputChange(e)} />
      </div>
      <div className="dropdown w-52">
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
                            .slice(0, 3)
                            .map((suggestion) => (
                            <div
                            onClick={() => onSearch(suggestion.title,suggestion.original_language)}
                            className="dropdown-row"
                            key={suggestion.title}
                            >
                            {suggestion.title}
                            </div>
                            ))}
                            </div>
      <div className="flex justify-center mt-4">
        <button onClick={handleAddMovie} className="bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4">
          Add
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-gray-700 rounded" onClick={() => setMovieModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </form>
  :
  null
}
    </div>
  )
}

export default AdminMovies
