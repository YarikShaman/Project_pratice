import React, {createElement as e, useState} from 'react';
import logo from './logo.png';
import {Routes, Route} from "react-router-dom";
import './App.css';
import 'swiper/css';
// import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import MainPage from "./Pages/MainPage";
import Author from "./Pages/Author";
import Home from "./Pages/Home";
// import MainPage from "./Pages/MainPage";

function App() {
  return (

    <div className="App">
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/signin" element={<Author/>}/>
            <Route path="/home" element={<Home/>}/>
            {/*<Route path="/" element{<Home/>}/>*/}
        </Routes>
      <header className="App-header">
        <a className="App-logo">
            Cinotes
        </a>
      </header>
      <body className="App-body">
        <div>
            {/*<Swiper*/}
            {/*    spaceBetween={0}*/}
            {/*    slidesPerView={3}*/}
            {/*    onSlideChange={() => console.log('slide change')}*/}
            {/*    onSwiper={(swiper) => console.log(swiper)}*/}
            {/*>*/}
            {/*    <SwiperSlide>Slide 1</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 2</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 3</SwiperSlide>*/}
            {/*    <SwiperSlide>Slide 4</SwiperSlide>*/}
            {/*    ...*/}
            {/*</Swiper>*/}
        </div>
      </body>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

async function forAxios(){
    const resp=await axios.post("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/singin", {
        email: "myarik01@gmail.com",
        username:"",
        password: ""
    });
        // {headers:{authorization: "bearer jwt"}}

}

export default App;
