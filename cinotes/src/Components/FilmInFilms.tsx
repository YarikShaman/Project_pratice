import React from "react";
import "../App.css";
import {Link} from "react-router-dom";
export function FilmInFilms(film:any,pk:any){
    return(
        <>
            <Link to={`/films/${film.film.url.split("/")[4]}`}
                  style={{background:"linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                          "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"}}
                  className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-[260px] h-[390px] hover:shadow-white mx-5 my-5"}>
                <img className="w-56 h-80 object-cover mt-4 w-auto rounded-xl border-2 border-gray-700 self-center" src={film.film.compressed_poster_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{film.film.title}</p>
            </Link>
        </>
    )
}