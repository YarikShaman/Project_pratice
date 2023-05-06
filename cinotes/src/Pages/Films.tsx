import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

export function Films() {
    return (
        <div className="h-screen flex flex-col">
            <HomeHeader/>
            <div className="w-4/6 mt-5 flex flex-nowrap self-center h-10">
                <input className=" flex-1 bg-slate-800 ring-slate-700 text-white block  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={"text"}/>
                <button className=" flex-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"submit"}>Search</button>
            </div>
        </div>
    );
}