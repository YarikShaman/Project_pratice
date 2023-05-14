import React, {createElement as e, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import axios from "axios";
import MainPage from "./Pages/MainPage";
import Author from "./Pages/Author";
import Home from "./Pages/Home";
import {Films} from "./Pages/Films";
import {Actors} from "./Pages/Actors";
import {Playlists} from "./Pages/PlayLists";
import {Account} from "./Pages/Account";
import {Prem} from "./Pages/Premium";
import Registr from "./Pages/Registr";

function App() {
  return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/sign_in" element={<Author/>}/>
            <Route path="/reg" element={<Registr/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/films" element={<Films/>}/>
            <Route path="/actors" element={<Actors/>}/>
            <Route path="/playlists" element={<Playlists/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/prem" element={<Prem/>}/>
        </Routes>
  );
}

async function forAxios(){
    const resp=await axios.post("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/singin", {
        email: "myarik01@gmail.com",
        password: ""
    });
        // {headers:{authorization: "bearer jwt"}}

}

export default App;
