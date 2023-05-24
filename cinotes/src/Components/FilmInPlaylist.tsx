import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
import {Link} from "react-router-dom";

export function FilmInPlaylist(film: any, pl_pk: number, pk: any) {
    return (
        <div className="flex mx-5 my-5 justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 style={{visibility:"hidden", borderRadius: "14px"}}
                 className="w-8 h-8 justify-self-end bg-red-600 rounded-full cursor-pointer border-[2px] hover:h-10 hover:w-10 hover:border-4 hover:border-neutral-300 border-black z-10 absolute ">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
            <Link to={`/films/${film.film.url.split("/")[4]}`}
                  style={{
                      visibility:"hidden",
                      background: "linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                          "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"
                  }}
                  className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg w-[260px] h-[390px] hover:shadow-white "}>
                <img className="w-56 h-80 object-cover mt-4 w-auto rounded-xl border-2 border-gray-700 self-center"
                     src={film.film.poster_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{film.film.title}</p>
            </Link>
            <div style={{ background: "linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                    "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"}}
                className="p-4 shadow-gray-900 flex justify-center flex-col rounded-xl border-2 border-stone-900 shadow-lg w-[260px] h-[390px] hover:shadow-white">
                <a className="self-center m-[10%] text-center text-white text-[20px]"><b>{film.film.title}</b><br/><br/>
                    Ви дійсно бажаєте видалити цей фільм з плейлисту
                </a>
                <div className="flex flex-row justify-around mt-10">
                    <button className="bg-red-600 w-[40%] rounded-xl text-[20px]">Ні</button>
                    <button className="bg-blue-600 w-[40%]  rounded-xl  text-[20px]">Так</button>
                </div>

            </div>
        </div>
    )
}