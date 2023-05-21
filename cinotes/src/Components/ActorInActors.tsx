import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
export function ActorInActors(actor:any){
    return(
        <>
            <div className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-64 h-96 hover:shadow-white mx-5 my-5"}>
                <img className="w-56 h-80 mt-4 rounded-xl object-cover border-2 border-gray-700 self-center" src={actor.actor.photo_file}/>
                <a className="text-white self-center my-auto text-center w-5/6">{actor.actor.name}</a>
            </div>
        </>
    )
}