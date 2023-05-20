import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {ActorInActors} from "../Components/ActorInActors";
import axios from "axios";

export function Actors() {
    const [actorName, setActorName] = useState<any>([]);
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
        <div className="bg-neutral-700 min-h-screen grid grid-cols-1 content-start gap-1 justify-items-center">
            <HomeHeader/>
            <div className="md:w-1/3 flex my-2 flex-nowrap h-10">
                <input
                        value={actorName}
                        onChange={(e)=>setActorName(e.target.value)}
                        className="w-3/4 ring-slate-700 text-black block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={"text"}/>
                <button
                        className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type={"submit"}>Search
                </button>
            </div>
            <div id={"actors"} className="flex flex-row h-auto justify-center flex-wrap">
                {
                    actors.map(actor => {
                        return <>
                            <ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/><ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/>
                            <ActorInActors actor={actor}/>

                        </>
                    })
                }
            </div>
        </div>
    );
}