import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import axios from "axios";
import FilmInPlaylist from "../Components/FilmInPlaylist";
import {DecodeB64} from "../Utilities/DecodeB64";
import {FilmInFilms} from "../Components/FilmInFilms";
import config from "tailwindcss/defaultConfig";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {CheckJWT} from "../Utilities/CheckJWT";

interface Film {
    title: string;
    poster_file: string;
    url: string;
}

export function Playlists() {
    const nav=useNavigate()
    const [currentPlaylist, setCurrentPlaylist] = useState<{ title: string, films: Film[], pk: number }>();
    const [playlistResponse, setPlaylistResponse] = useState<{ title: string, url: string }[]>([]);
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(() => {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/", config)
                .then(async (res) => {
                    setPlaylistResponse(res.data.results);
                }).catch((err) => {
                console.log(err.response);
            });
        }
    }, []);
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(79, 40, 40, 1), rgba(79, 40, 40, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full w-full flex flex-row justify-center">
            <HomeHeader/>
            <div id={"side"}
                 className="z-10 w-1/5 p-2 h-screen md:mt-0 mt-8 sticky bg-gray-800 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">
                {
                    playlistResponse?.map((playlist) => {
                        return <>
                            <button key={playlist.url.split('/')[4]} onClick={(e) => {
                                if (CheckJWT() > 0)
                                    nav("/sign_in")
                                else {
                                    axios.get(playlist.url, config)
                                        .then(res => setCurrentPlaylist(res.data))
                                        .catch(err => {
                                            console.log(err)
                                        })
                                }
                            }}
                                    className={"m-1 bg-black px-2 py-3 flex-wrap rounded-xl block w-full text-white"}>
                                {playlist?.title}
                            </button>
                        </>
                    })
                }
            </div>
            <button onClick={() => sideMenu()}
                    className={"md:hidden fixed right-0 bottom-0 rounded-full bg-slate-800 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>{GetLang().Search}
            </button>
            <button onClick={() => hideMenu()}
                    className={"md:hidden fixed right-0 bottom-0 rounded-full bg-gray-700 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>{GetLang().Search}
            </button>
            <div id={"films"}
                 className="flex flex-row w-full justify-center mt-[15%] md:mt-[4%]  h-auto min-h-[400px] flex-wrap">
                {
                    currentPlaylist?.films.map((film) => {
                        return <FilmInPlaylist combo={{film, currentPlaylist}} key={film.url.split("/")[4]}/>
                    })
                }
            </div>
        </div>
    );

    function sideMenu() {
        let side = document.getElementById("side");
        let films = document.getElementById("films");
        // @ts-ignore
        side.style.display = "block";
        // @ts-ignore
        side.style.width = "100%";
        // @ts-ignore
        films.style.display = "none";
    }

    function hideMenu() {
        let side = document.getElementById("side");
        let films = document.getElementById("films");
        // @ts-ignore
        side.style.display = "none";
        // @ts-ignore
        films.style.display = "flex";
    }
}