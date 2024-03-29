import React, {createElement as e, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import './App.css';
import axios from "axios";
import MainPage from "./Pages/MainPage";
import Author from "./Pages/Author";
import {Films} from "./Pages/Films";
import {Actors} from "./Pages/Actors";
import {Playlists} from "./Pages/PlayLists";
import {Account} from "./Pages/Account";
import {Prem} from "./Pages/Premium";
import Registr from "./Pages/Registr";
import {Ver} from "./Pages/Verification";
import {Film} from "./Pages/Film";
import {APanel} from "./Pages/ForAdmin/AdminPanel";
import {Actor} from "./Pages/Actor";
import Payment from "./Pages/Payment"
import PRec from "./Pages/PasswordRecovery";

function App() {
  return (
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="/sign_in" element={<Author/>}/>
            <Route path="/reg" element={<Registr/>}/>
            <Route path="/films" element={<Films/>}/>
            <Route path="/actors" element={<Actors/>}/>
            <Route path="/playlists" element={<Playlists/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/prem" element={<Prem/>}/>
            <Route path="/ver" element={<Ver/>}/>
            <Route path="/films/:id" element={<Film />}/>
            <Route path="/actors/:id" element={<Actor />}/>
            <Route path="/a_panel" element={<APanel />}/>
            <Route path="/password_rec" element={<PRec />}/>
            <Route path="/payment" element={<Payment />}/>
        </Routes>
  );
}

export default App;
