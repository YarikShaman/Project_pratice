import React from "react";
import "../App.css";
import Acc from '../Img/Account.png';

export function HomeHeader() {
    return (
        <span className="bg-neutral-800  flex flex-row align-center content-center" >
            <a className="self-center pl-6 text-2xl font-bold text-white select-none italic ">
                Cinotes
            </a>
            <span className=" self-center flex justify-evenly w-full ">
                <div className="bg-sky-900  h-8 w-16 rounded-lg flex justify-center text-white hover:text-sky-700  cursor-pointer">
                    <a href={"/home"} className="self-center text-base  align-middle ">
                        Home
                    </a>
                </div>
                <div className="bg-sky-900  h-8 w-16 rounded-lg flex justify-center text-white hover:text-sky-700  cursor-pointer">
                    <a href={"/films"} className="self-center text-base text-white align-middle cursor-pointer hover:text-sky-700">
                        Films
                    </a>
                </div>
                <div className="bg-sky-900  h-8 w-16 rounded-lg flex justify-center text-white hover:text-sky-700  cursor-pointer">
                    <a href={"/playlists"} className="self-center text-base text-white align-middle cursor-pointer hover:text-sky-700">
                        PlayLists
                    </a>
                </div>
                <div className="bg-sky-900  h-8 w-16 rounded-lg flex justify-center text-white hover:text-sky-700  cursor-pointer">
                    <a href={"/actors"} className=" bg-blend-normal  self-center text-base text-white align-middle cursor-pointer hover:text-sky-700">
                        Actors
                    </a>
                </div>
            </span>
            <span className="justify-center hover:bg-neutral-900 bg-stone-900 my-1 flex flex-col w-20 border-2 border-gray-800 rounded-xl mr-2 text-white hover:text-sky-500 hover:border-sky-900 cursor-pointer select-none">
                <img className=" w-7 h-7 mt-1 bg-cover bg-repeat self-center " alt={"Profile_Pic"} src={Acc}></img>
                <a href={"/sign_in"} className="text-sm self-center text-center">Log in</a>
            </span>
        </span>
    );
}