import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {useNavigate} from "react-router-dom";
import {DecodeB64} from "../Utilities/DecodeB64";

export function Prem() {
    const nav=useNavigate()
    if (localStorage["jwt"]==undefined && DecodeB64(localStorage["jwt"].isVerified)==true)
        nav("../sign_in")
    return (
        <div
            style={{background:"repeating-linear-gradient(45deg, rgba(255, 205, 0, 1) 1px, rgba(225, 225, 225, 1) 4px, rgba(255, 215, 0, 1) 6px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen w-full">
            <HomeHeader/>
            <body className="App-body">
            Premium
            </body>
            <footer className="App-footer">

            </footer>
        </div>
    );
}