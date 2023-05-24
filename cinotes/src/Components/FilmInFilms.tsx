import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
import {Link} from "react-router-dom";
export function FilmInFilms(film:any,pk:any){
    return(
        <>
            <Link to={`/films/${film.film.url.split("/")[4]}`} className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-[260px] h-[390px] hover:shadow-white mx-5 my-5"}>
                <img className="w-56 h-80 object-cover mt-4 w-auto rounded-xl border-2 border-gray-700 self-center" src={film.film.poster_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{film.film.title}</p>
            </Link>
        </>
    )
}