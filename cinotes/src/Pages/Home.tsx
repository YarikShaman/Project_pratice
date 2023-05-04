import React from 'react';
import logo from '../logo.png';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

function Home() {
    return (
        <div className="App">
            <HomeHeader/>
            <body className="App-body">
            Home
            </body>
            <footer className="App-footer">

            </footer>
        </div>
    );
}

export  default  Home;