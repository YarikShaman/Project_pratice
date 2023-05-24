import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

export function Prem() {
    return (
        <div
            style={{background:"repeating-linear-gradient(45deg, rgba(10, 92, 44, 1), rgba(10, 92, 44, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
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