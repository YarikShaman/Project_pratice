import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
import {Link} from "react-router-dom";
export function ActorInFilm(actor:any){
    return(
        <>
            <Link to={"/actors/"+actor.actor.url.split("/")[4]} className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-44 h-72 hover:shadow-white mx-5 my-5"}>
                <img className="w-36 h-56 mt-4 rounded-xl object-cover border-2 border-gray-700 self-center" src={actor.actor.photo_file}/>
                <a className="text-white self-center my-auto text-center w-5/6">{actor.actor.name}</a>
            </Link>
        </>
    )
}