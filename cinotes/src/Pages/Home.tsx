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
function Home() {

    if (a==1)
        return (<Navigate replace to="/sign_in" />)
    else
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
const a=1;
export  default  Home;