import React from "react";
import "../App.css";
import Acc from '../Img/Account.png';

export function HomeHeader() {
    return (
        <span style={{height:"10vh", background:"#2a2a2a", display:"flex"}}  >
            <a className="self-center pl-6 text-2xl font-bold text-white select-none italic ">
                Cinotes
            </a>
            <span className=" self-center flex justify-evenly w-full ">
                <a href={"/home"} className="self-end text-base text-white align-middle cursor-pointer hover:text-sky-700">
                    Home
                </a>
                <a href={"/films"} className="self-end text-base text-white align-middle cursor-pointer hover:text-sky-700">
                    Films
                </a>
                <a href={"/playlists"} className="self-end text-base text-white align-middle cursor-pointer hover:text-sky-700">
                    PlayLists
                </a>
                <a href={"/actors"} className="self-end text-base text-white align-middle cursor-pointer hover:text-sky-700">
                    Actors
                </a>
            </span>
            <span  className="justify-center my-1 flex flex-col w-12 border-2 border-black rounded-lg mr-2 text-white hover:text-sky-700 cursor-pointer select-none">
                <img className=" w-7 h-7 mt-1 bg-cover bg-repeat self-center rounded-full" alt={"Profile_Pic"} src={Acc}></img>
                <a href={"/sign_in"} style={{color:"white", fontSize:"2vh", justifySelf:"center", textAlign:"center", paddingBottom:"0"}}>log in</a>
            </span>
        </span>
    );
}