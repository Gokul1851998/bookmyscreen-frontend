import React,{useState,useEffect} from 'react';
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import axios from 'axios'
import './Banner'
import { getBanner } from '../../api/movie/movie';
import { toast } from 'react-hot-toast';
import { imageUrl } from '../../constants/constants';


const Banner = () => {
  const [movie1,setMovie1] =  useState([])
  const [movie2,setMovie2] =  useState([])
  const [movie3,setMovie3] =  useState([])
  useEffect(()=>{
    const fetchData=async()=>{
     const response = await getBanner()
     if(response.results){
       setMovie1(response.results[0])
       setMovie2(response.results[1])
       setMovie3(response.results[2])
     }else{
      toast.error('Something went wrong')
     }
    }
    fetchData() 
  },[])
 
  return (
    <div className='m-3'>
  <MDBCarousel showIndicators showControls fade>
    <div className="carousel-inner">
    <div className="carousel-item position-relative" style={{ height: '600px' }}>
        <img className="position-absolute w-100 h-100" src={imageUrl+movie1.poster_path} style={{ objectFit: 'cover', filter: 'brightness(30%)' }} />
        <div className="carousel-caption d-flex align-items-center ml-20">
          <div className="p-3" style={{ maxWidth: '700px' }}>
            <div className="d-flex align-items-center">
              <div className="product-img position-relative overflow-hidden mr-3">
                <img className="img-fluid w-80" src={`${imageUrl+movie1.poster_path}`} />
              </div>
              <div>
                <h1 className=" text-white mb-3 animate__animated animate__fadeInDown" style={{fontSize:'30px'}}>
                  {movie1.title}
                </h1>
                <h1 className=" px-5 text-xl animate__animated animate__bounceIn">Releasing on :</h1>
                <h1 className=" px-5 text-xl animate__animated animate__bounceIn">{movie1.release_date}</h1>
      </div>
    </div>
  </div>
</div>
        </div>
      <div className="carousel-item position-relative" style={{ height: '600px' }}>
        <img className="position-absolute w-100 h-100" src={imageUrl+movie2.poster_path} style={{ objectFit: 'cover', filter: 'brightness(30%)' }} />
        <div className="carousel-caption d-flex align-items-center ml-20">
          <div className="p-3" style={{ maxWidth: '700px' }}>
            <div className="d-flex align-items-center">
              <div className="product-img position-relative overflow-hidden mr-3">
                <img className="img-fluid w-80" src={`${imageUrl+movie2.poster_path}`} />
              </div>
              <div>
       <h1 className=" text-white mb-3 animate__animated animate__fadeInDown" style={{fontSize:'30px'}}>
    {movie2.title}
      </h1>
      <h1 className=" px-5 text-xl animate__animated animate__bounceIn">Releasing on :</h1>
                <h1 className=" px-5 text-xl animate__animated animate__bounceIn">{movie2.release_date}</h1>
      </div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-item position-relative" style={{ height: '600px' }}>
        <img className="position-absolute w-100 h-100" src={imageUrl+movie3.poster_path} style={{ objectFit: 'cover', filter: 'brightness(30%)' }} />
        <div className="carousel-caption d-flex align-items-center ml-20">
          <div className="p-3" style={{ maxWidth: '700px' }}>
            <div className="d-flex align-items-center">
              <div className="product-img position-relative overflow-hidden mr-3">
                <img className="img-fluid w-80" src={`${imageUrl+movie3.poster_path}`} />
              </div>
              <div>
                <h5 className=" text-white mb-3 animate__animated animate__fadeInDown" style={{fontSize:'30px'}}>
                  {movie3.title}
                </h5>
                <h1 className=" px-5 text-xl animate__animated animate__bounceIn">Releasing on :</h1>
                <h1 className=" px-5 text-xl animate__animated animate__bounceIn">{movie3.release_date}</h1>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>
    </MDBCarousel>
    </div>
  );
};

export default Banner;