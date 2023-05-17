import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

export function Account() {
    return (
        <div className="bg-neutral-700 min-h-screen h-full text-white flex justify-center">
            <HomeHeader/>
            <div className="w-5/6 mt-20 h-4/6 self-center p-5 rounded-xl bg-neutral-800 flex flex-row">
                <div className=" w-1/2 h-full">
                    <img className={"bg-white"}/>
                    <p>Username</p>
                    <button></button>
                    <p>Email<p>email@mail.com</p></p>
                    <p>Password: <p>******</p></p>
                    <p></p>
                </div>
                <div className="w-1/2 h-full">
                    <p>User statistics</p>
                    <hr/>
                    <p>Favourite genre: <p>Drama</p></p>
                    <p>Favourite actor: <p>Ryan Gosling</p></p>
                    <p>Number of films viewed this year: <p>228</p></p>
                </div>
            </div>
        </div>
    );
}