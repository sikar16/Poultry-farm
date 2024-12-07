import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import React from 'react'
import { assets} from '../assets/asset'


const Hero = () => {
  const images = [assets.h1, assets.h2, assets.h3];
  
  const [imageIndex, setImageIndex] = useState(0);
  
  useEffect(() => {
    // this is interval to change image every 3 seconds
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col sm:flex-row  ">
      {/* Left side of the hero */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] break-words">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p>hhhhhh</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            hhhhhhhh
          </h1>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">for you</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>

          {/* First set of registration and login */}
          <div className="mt-4 w-full flex items-center justify-center">
            <Link  to={'signup'}  className="bg-black text-white rounded-full py-5 px-3 w-34">
              signup
            </Link>
            <Link to={'signin'} className="bg-[#A56F59] text-white rounded-full py-5 px-10 ml-4 w-34 ">
              signin   
            </Link>
          </div>
        </div>
      </div>

      {/* Right side of the hero */}
      <img className="w-full sm:w-1/2" src={images[imageIndex]} alt="Hero" />
    </div>
  )
}

export default Hero
