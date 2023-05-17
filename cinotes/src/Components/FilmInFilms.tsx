import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
export function FilmInFilms(film:any){
            return(
                <>
                    <div className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-64 h-96 hover:shadow-white ml-10 my-5"}>
                        <img className="w-5/6 mt-4 h-5/6 w-auto rounded-xl border-2 border-gray-700 self-center" src={film.film.poster_file}/>
                        <a className="text-white self-center my-auto text-center w-5/6">{film.film.title}</a>
                    </div>
                </>
            )
}