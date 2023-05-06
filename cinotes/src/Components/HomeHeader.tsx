import React from "react";
import "../App.css";
import Acc from '../Img/Account.jpg';

export function HomeHeader() {
    return (
        <span className="bg-neutral-800 h-14 flex flex-row align-center content-center" >
            <a className="self-center pl-6 text-2xl font-mono font-black text-white select-none italic ">
                Cinotes
            </a>
            <span className=" self-center flex justify-evenly w-full ">
                <a className="self-end text-base font-mono font-black text-white italic align-middle cursor-pointer hover:text-sky-700">
                    Home
                </a>
                <a className="self-end text-base font-mono font-black text-white italic align-middle cursor-pointer hover:text-sky-700">
                    Films
                </a>
                <a className="self-end text-base font-mono font-black text-white italic align-middle cursor-pointer hover:text-sky-700">
                    PlayLists
                </a>
                <a className="self-end text-base font-mono font-black text-white italic align-middle cursor-pointer hover:text-sky-700">
                    Actors
                </a>
            </span>
            <span className="justify-around flex flex-col w-1/12">
                <img className="h-10 w-10 rounded-full " src={Acc}></img>
                <a className="text-white text-sm">log in</a>
            </span>
        </span>
    );
}