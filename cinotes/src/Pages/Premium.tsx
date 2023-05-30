import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {CheckJWT} from "../Utilities/CheckJWT";

export function Prem() {
    const nav=useNavigate()
    if (CheckJWT() > 0)
        nav("/sign_in")
    return (
        <div
            style={{background:"repeating-linear-gradient(45deg, rgba(255, 205, 0, 1) 1px, rgba(225, 225, 225, 1) 4px, rgba(255, 215, 0, 1) 6px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen w-full">
            <HomeHeader/>
            <body className="App-body">
            {GetLang().Premium}
            </body>
            <footer className="App-footer">

            </footer>
        </div>
    );
}