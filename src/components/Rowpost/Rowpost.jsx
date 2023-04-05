import React,{useState,useEffect} from 'react'
import { imageUrl } from '../../constants/constants';
import "tailwindcss/tailwind.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { getAllMovies } from '../../api/user/users';
import { hideLoading,showLoading } from '../../redux/loadersSlice';


 function Rowpost() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [englishMovies,setEnglishMovies] = useState([])
  
  useEffect(()=>{
    try {
      const fetchData1 = async() => {
        dispatch(showLoading())
        const response = await getAllMovies()
        console.log(response)
        // setEnglishMovies(response1.data.englishMovies)
        // setMalayalamMovies(response1.data.malayalamMovies)
        // setTamilMovies(response1.data.tamilMovies)
        // dispatch(hideLoading())
      }
      fetchData1();
    } catch (error) {
      console.log('something error')
    }
    
  },[])

  return (
    <div className="flex flex-wrap justify-center">
 
    <div className="w-full md:w-1/2 lg:w-1/5 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <a href="#!">
          <img
            className="w-full h-full object-cover object-center"
            
          />
          <div className="text-center pt-1" style={{background:"#1f2937"}}>
          <h6
    className="mt-2  text-1xl font-semibold text-white cursor-pointer"
  >
    
  </h6>
  <div className='mt-1 '>
  <span class="text-yellow-400 ">
  <svg class="inline-block w-4 h-4 " viewBox="0 0 20 20" fill="currentColor">
    <path 
      fill-rule="evenodd" 
      d="M10 15.858L4.273 19.47l.786-5.09L.327 7.529l5.092-.785L10 1.18l4.48 5.564 5.093.785-3.73 6.852.786 5.09L10 15.858z" 
      clip-rule="evenodd" 
    />
  </svg>
  <span class="text-sm pl-1 text-2xl"></span>
</span>
</div>
        </div>
        
        </a>
        
      </div>
    </div>

</div>
  )
}

export default Rowpost
