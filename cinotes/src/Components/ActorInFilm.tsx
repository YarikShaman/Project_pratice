import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
import {Link} from "react-router-dom";
export function ActorInFilm(actor:any){
    return(
        <>
            <Link
                style={{background:"linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                        "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"}}
                to={"/actors/"+actor.actor.url.split("/")[4]} className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-44 h-72 hover:shadow-white mx-5 my-5"}>
                <img className="w-36 h-56 mt-4 rounded-xl object-cover border-2 border-gray-700 self-center" src={actor.actor.photo_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{actor.actor.name}</p>
            </Link>
        </>
    )
}