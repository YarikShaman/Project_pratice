import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

export function Account() {
    return (
        <div className="bg-neutral-700 text-white">
            <HomeHeader/>
            <body>
                <div>
                    <div>
                        <img className={"bg-white"}/>
                        <p>Username</p>
                        <button></button>
                        <p>Email<p>email@mail.com</p></p>
                        <p>Password: <p>******</p></p>
                        <p></p>
                    </div>
                    <div>
                        <p>User statistics</p>
                        <hr/>
                        <p>Favourite genre: <p>Drama</p></p>
                        <p>Favourite actor: <p>Ryan Gosling</p></p>
                        <p>Number of films viewed this year: <p>228</p></p>
                    </div>
                </div>
            </body>
        </div>
    );
}