import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";

export function FilmInFilms(film:any){
    return(
        <>
            <div className="hover:bg-neutral-700 flex flex-col bg-black rounded-xl border-2 w-48 h-auto pb-3 mt-10 ml-20 text-black">
                <img className="w-5/6 mt-4 h-5/6 self-center pb-1" src={film.film.poster_file}/>
                <a className="text-white self-center flex-wrap text-center w-5/6">{film.film.title}</a>
            </div>
        </>
    )
}