import React, {createElement as e, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
//import 'swiper/css';
//import { Swiper, SwiperSlide } from 'swiper/react';
import axios from "axios";
import MainPage from "./Pages/MainPage";
import Author from "./Pages/Author";
import Home from "./Pages/Home";
import {Films} from "./Pages/Films";
import {Actors} from "./Pages/Actors";
import {Playlists} from "./Pages/PlayLists";

function App() {
  return (

    <div className="App">
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/sing_in" element={<Author/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/films" element={<Films/>}/>
            <Route path="/actors" element={<Actors/>}/>
            <Route path="/playlists" element={<Playlists/>}/>
        </Routes>
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
