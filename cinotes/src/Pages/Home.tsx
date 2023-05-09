import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import { redirect } from "react-router-dom";
import {
    Routes,
    Route,
    Link,
    Navigate,
} from 'react-router-dom';
import axios from "axios";
const a=Number(2);
function Home() {

    if (a==1)
        return (<Navigate replace to="/sign_in" />)
    else
        return (
            <>
            <HomeHeader/>
            <div className="App">

                <body className="App-body">
                Home
                </body>
                <footer className="App-footer">

                </footer>
            </div>
            </>
        );
}

export  default  Home;