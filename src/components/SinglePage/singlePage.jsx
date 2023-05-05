import React,{Fragment,useState,useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { getMovieDetails,getCastDetails } from '../../api/movie/movie';
import { imageUrl } from '../../constants/constants';


 function SinglePage() {
     const navigate = useNavigate()
     const location = useLocation()
     const movieId = location.state

     const [movieDetails,setMovieDetails] = useState('')
     const [genres,setGenres] = useState([])
     const [cast,setCast] = useState([])
     const [language,setLanguage] = useState([])

     useEffect(()=>{
        const fetchData = async() => {
          const response = await getMovieDetails(movieId)
          const response2 = await getCastDetails(movieId)
          console.log(response);
          setMovieDetails(response)
          setGenres(response?.genres)
          setLanguage(response?.original_language)
          setCast(response2.cast)
        }
        fetchData();
        window.scrollTo(0, 0);
      },[movieId])
      
      const shows=(movieId)=>{
        navigate('/shows',{state:movieId})
    }
     
  return (
    <Fragment>
     <div className='' style={{minHeight:'650px'}}>
  <div className="relative" data-te-carousel-init data-te-carousel-slide>
    <div className="carousel-item position-relative active" style={{height: '600px'}}>
      <img
        className="position-absolute w-100 h-100"
        src={`${imageUrl+movieDetails?.backdrop_path}`}
        style={{ filter: 'brightness(30%)'}}
      />
      <div className="d-flex align-items-center mt-20 ml-20" >
        <div className="product-img position-relative overflow-hidden mr-3">
          <img className="img-fluid w-60" src={`${imageUrl+movieDetails?.poster_path}`} />
        </div>
        <div className="p-3 " >
          <h1 className="display-6 text-white  mb-3 animate__animated animate__fadeInDown" style={{ fontWeight: 'bold' }}>
            {movieDetails.title}
          </h1>
          
        <h1 style={{ fontSize: '1.5rem' }} className=" text-white mb-3   animate__animated animate__fadeInDown"><span className="text-red-500 text-lg fa fa-star checked "></span> Star Rating : <span className='pl-1 text-lg' style={{ fontSize: '1.5rem' }}>{movieDetails.vote_average}</span></h1>
        <h1 style={{ fontSize: '1.2rem' }} 
          className=" text-white mb-1 pl-6   animate__animated animate__fadeInDown">{movieDetails.vote_count} Votes</h1>
          <button className="btn btn-outline-grey mb-3 py-0.5 px-1 mt-3 animate__animated animate__fadeInUp"  style={{color: '#000', backgroundColor: 'white',fontWeight:'bold'}}>
          {language}
          </button><br/>
          <h1 style={{ fontSize: '1.2rem' }} 
          className=" text-white mb-3   animate__animated animate__fadeInDown">
          {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m <button className="ml-1 mr-2 btn btn-outline-grey py-0.5 px-0.5  animate__animated animate__fadeInUp"  style={{color: '#000', backgroundColor: 'white',fontWeight:'bold'}}></button>
          {genres.map((gen, index) => (
          <span key={gen.id}>
          {gen.name}
          {index !== genres.length - 1 && ", "}
          </span>
          ))} <button className="ml-1 mr-2 btn btn-outline-grey py-0.5 px-0.5  animate__animated animate__fadeInUp"  style={{color: '#000', backgroundColor: 'white',fontWeight:'bold'}}></button>
          {new Date(movieDetails.release_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
          </h1>
          <button onClick={()=>shows(movieDetails.id)}  className="btn btn-outline-red py-2 px-4 mt-3 animate__animated animate__fadeInUp" style={{color: 'white', backgroundColor: '#f84464'}}>Book tickets</button>
        </div>
      </div>
      
    </div>
  </div>
</div>

<div className='ml-10 mr-5'>
 
   <h1 className="text-black mb-3 " style={{ fontWeight: 'bold',fontSize:'4vh',fontFamily:'Arial, sans-serif' }}>
   About the movie 
   </h1>
   <p style={{fontFamily:'Arial, sans-serif',fontSize:'2.5vh'}}>{movieDetails.overview}</p>   
   <div className="relative pb-4 pt-10 flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
        <h1 className="text-black  " style={{ fontWeight: 'bold',fontSize:'4vh',fontFamily:'Arial, sans-serif' }}>
   Cast 
   </h1> 
      </div>
</div>

 <div className="flex flex-wrap">
  {cast &&
    cast.slice(0, 6).map((actor) => (
      <div className="flex flex-col items-center ml-6 mr-5 mb-5">
        {actor?.profile_path?
        <img
          className="w-32 h-32 object-cover rounded-full shadow-lg mb-2"
          src={`https://image.tmdb.org/t/p/w300/${actor.profile_path}`}
          alt={actor.name}
        /> :
        <img
          className="w-32 h-32 object-cover rounded-full shadow-lg mb-2"
          src='https://www.pngkey.com/png/detail/810-8105695_person-icon-grey-person-icon-grey-png.png'
          alt={actor.name}
        />
      }
        <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-black">
          {actor.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {actor.character}
        </span>
      </div>
    ))}
</div>


 </Fragment>
  )
}

export default SinglePage
