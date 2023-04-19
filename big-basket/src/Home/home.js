import React from "react";
import './home.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () =>{

    var settings = {dots: true,infinite: true,speed: 500,slidesToShow: 1,slidesToScroll: 1,autoplay:true};

    return(
        <div className="home">
            <Slider {...settings}>
                <div>
                    <img src={require('../Asserts/images/homebackground.jpg')} alt='no image'/>
                </div>
                <div>
                    <img src={require('../Asserts/images/logo2.jpg')} alt='no image'/>
                </div>
            </Slider>
        </div>
    );
}

export default Home; 