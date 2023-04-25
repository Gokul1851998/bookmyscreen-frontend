import React,{useState,useEffect} from 'react';
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import axios from 'axios'
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
     if(response){
      console.log(response.results);
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
    <div className='m-3' >
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem
        className="w-100  d-block"
        style={{height:'650px',borderRadius:'10px'}}
        itemId={1}
        src={imageUrl+movie1.poster_path}
        alt="..."
      >
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>

      {/* <MDBCarouselItem
        className="w-100 d-block"
        style={{height:'500px'}}
        itemId={2}
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
        alt="..."
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="w-100 d-block"
        style={{height:'500px'}}
        itemId={3}
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
        alt="..."
      >
        <h5>Third slide label</h5>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </MDBCarouselItem> */}
    </MDBCarousel>
    </div>
  );
};

export default Banner;