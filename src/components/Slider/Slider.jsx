import React  from "react";
import Slider from "react-slick";
import Content from './Content'

import img1 from './images/amesterdame.jpg'
import img2 from './images/auckland.jpg'
import img3 from './images/Barcelona_travel_massive.jpg'
import img4 from './images/berlin.jpg'
import img5 from './images/rome.jpg'
import img6 from './images/silversea-asia-cruise-bali-indonesia.jpg'



import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const SlidShow = ()=> {
  
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 4000,
      cssEase: "linear"
    }
    
    return (

      <div>
        
        <Slider {...settings}>
          <div >
           <Content image ={img1}/>
          </div>
          <div>
          <Content image ={img2}/>
          
          </div>
          <div>
          <Content image ={img3}/>
          
          </div>
          <div>
          <Content image ={img4}/>
           
          </div>
          <div>
          <Content image ={img5}/>
          
          </div>
          <div>
          <Content image ={img6}/>
         
          </div>
        </Slider>
      </div>
    )
  
}

export default SlidShow