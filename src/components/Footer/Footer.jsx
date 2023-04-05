import React from 'react';
import './Footer.css';

function Footer() {
    return (
    <footer className="relative footer-main pt-8 pb-6 mt-1">
        <div className="flex justify-center text-white font-bold pl-6 pr-3" style={{fontSize: "24px"}}>
          <h2>book<span className="text-danger font-bold">my</span>screen</h2><hr className="border-t-2 bg-white" />
        </div>
     
                <div className="flex justify-center">
                    
                    <div className="mt-6 lg:mb-0 mb-6">
                        <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-twitter"></i></button><button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-facebook-square"></i></button><button className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-dribbble"></i></button><button className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center text-white  pl-6 pr-3 pt-3" style={{fontSize: "10px"}}>
          <p>Copyright 2023  © Gokul entertainment</p>
        </div>
        <div className="flex justify-center text-white  pl-6 pr-3 pt-1" style={{fontSize: "10px"}}>
          <p>The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.</p>
        </div>
        
    </footer >
    
 )
}

export default Footer;