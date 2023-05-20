import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import {ActorInActors} from "../Components/ActorInActors";
import axios from "axios";

export function Actors() {

    const [actors, setActors] = useState([]);
    const [next, setNext] = useState("adsf");
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors", config)
            .then(res => {
                if (!ignore) {
                    setActors(res.data.results);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);
    return (
        <div className="bg">
            <HomeHeader/>
            <div className="md:w-full mt-2 flex flex-nowrap h-10">
                <input
                        className="w-3/4 ring-slate-700 text-white block rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={"text"}/>
                <button
                        className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type={"submit"}>Search
                </button>
            </div>
            <div id={"actors"} className="flex flex-row md:mt-16 mt-6 h-auto w-4/5 flex-wrap">

            </div>
        </div>
    );
}