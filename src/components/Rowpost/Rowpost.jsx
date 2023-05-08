import React,{Fragment, useState,useEffect} from 'react'
import { imageUrl } from '../../constants/constants';
import "tailwindcss/tailwind.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hideLoading,showLoading } from '../../redux/loadersSlice';
import { viewMovie } from '../../api/user/users';
import { getHomeMovies } from '../../api/movie/movie';
import Loading from '../Loader/Loading';


 function Rowpost() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(true)
  const [movies,setMovies] = useState([])
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(showLoading());
        const response = await viewMovie();
        const moviePromises = response.data.map(async (movie) => {
          const response2 = await getHomeMovies(movie.movieId);
          return response2;
        });
        const movies = await Promise.all(moviePromises);
        setMovies(movies.filter((movie) => movie)); // filter out null or undefined responses
        dispatch(hideLoading());
       
      } catch (error) {
        console.log("something error");
      }
    };
    
    if (movies.length === 0) { // Only run if movies haven't been fetched yet
      fetchData();
    }  
  }, [movies]);

  useEffect(()=>{
   setTimeout(() => {
    setLoading(false)
   }, 1000);
  },[movies])
  
 const singlePage=(movieId)=>{
     navigate('/singleMoviePage',{state:movieId})
 }

  return (
     <Fragment>
      <div className="relative pb-4 pl-6 pt-10 flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <h1 className="text-black  " style={{ fontWeight: 'bold',fontSize:'24px',fontFamily:'Arial, sans-serif' }}>
         Recommented Movies
       </h1> 
      </div>
   
    <div className="flex flex-wrap justify-center">
     {loading?
     (
      <Loading/>
     )  :(
    <>
     {movies && movies.slice(0, 5).map((movie)=>(
    
    <div className="w-full md:w-1/2 lg:w-1/5 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <a key={movie.id} onClick={()=>singlePage(movie.id)}>
          <img src={imageUrl + movie.poster_path}
            className="w-full h-full object-cover object-center"
          />
          <div className="text-center pt-1" style={{background:"#1f2937",minHeight: '90px'}}>
          <h6 
    className="mt-2  text-1xl font-semibold text-white cursor-pointer"
  >
    {movie.title}
  </h6>
  <div className='mt-1 '  >
  <span className="text-yellow-400 ">
  <svg className="inline-block w-4 h-4 " viewBox="0 0 20 20" fill="currentColor">
    <path 
      fillRule="evenodd" 
      d="M10 15.858L4.273 19.47l.786-5.09L.327 7.529l5.092-.785L10 1.18l4.48 5.564 5.093.785-3.73 6.852.786 5.09L10 15.858z" 
      clipRule="evenodd" 
    />
  </svg>
  <span className="text-sm pl-1 text-2xl">{movie.vote_average}</span>
</span>
</div>
        </div>
        
        </a>
        
      </div>
    </div>
   ))}
    </>
   ) }
     
</div>
</Fragment>
  )
}

export default Rowpost
