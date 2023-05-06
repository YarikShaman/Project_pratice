import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

function MainPage() {
    return (
        <div className="h-screen">
            <HomeHeader/>
            <body className="App-body">
            Main Page
            </body>
            <footer className="App-footer">

            </footer>
        </div>
    );
}

export default MainPage;