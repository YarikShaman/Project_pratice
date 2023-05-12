import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
function AA(){
    //FilmInFilms();
    return(
        <>
            f
        </>
    )
}

export function Films() {
    return (
        <div className="h-screen flex flex-row bg-neutral-600 ">
            <HomeHeader/>

            <div style={{minWidth:300}}  className="z-10 mt-20 w-1/6 h-full fixed bg-neutral-700 rounded-lg drop-shadow-xl shadow-black shadow-md">
                <div className="md:w-screen md:w-4/6 xl:w-4/6 mt-5 flex flex-nowrap self-center h-10">
                    <input className="flex-1 bg-slate-800 ring-slate-700 text-white block  rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={"text"}/>
                    <button className="flex-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"button"}>Filtr</button>
                    <button className="flex-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"submit"}>Search</button>
                </div>
            </div>
            <div className="mt-20 bg-white ml-80 w-full min-h-full">
                {
                    FilmInFilms(axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/3/", {
                        headers: {
                            "Authorization": "Bearer" + localStorage["jwt"],
                        },
                    }))
                }
            </div>

        </div>
    );
}

// function AddFilms(){
//     FilmInFilms(axios.get("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films"));
//     FilmInFilms(axios.get("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films"));
//     FilmInFilms(axios.get("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films"));
//     FilmInFilms(axios.get("cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films"));
//
// }