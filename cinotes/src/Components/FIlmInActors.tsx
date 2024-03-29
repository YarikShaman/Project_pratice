import React from "react";
import {Link} from "react-router-dom";
export function FilmInActor(films:any){
    return(
        <>
            <Link to={`/films/${films.films.url.split("/")[4]}`} className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-44 h-72 hover:shadow-white mx-5 my-5"}>
                <img className="w-36 h-56 mt-4 rounded-xl object-cover border-2 border-gray-700 self-center" src={films.films.poster_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{films.films.title}</p>
            </Link>
        </>
    )
}