import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import axios from "axios";
import {FilmInPlaylist} from "../Components/FilmInPlaylist";
import {DecodeB64} from "../Utilities/DecodeB64";
import {FilmInFilms} from "../Components/FilmInFilms";

interface Film {
    title: string;
    poster_file: string;
    url: string;
}

export function Playlists() {
    const [currentPlaylist, setCurrentPlaylist] = useState<{ title: string, films: Film[], pk: number }>();
    const [playlists, setPlaylists] = useState<{ title: string, films: Film[], pk: number }[]>([]);
    const [playlistResponse, setPlaylistResponse] = useState<{ title: string, url: string }[]>([]);
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        console.log(DecodeB64(localStorage["jwt"]))
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/", config)
            .then(async (res) => {
                if (!ignore) {
                    setPlaylistResponse(res.data);
                    for (let i = 0; i < res.data.results.length; i++) {
                        let id = res.data.results[i].url.split('/')[res.data.results[i].url.split('/').length - 2];

                        try {
                            const playlistRes = await axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/${id}`, config);
                            setPlaylists((prevPlaylists) => [...prevPlaylists, playlistRes.data]);
                            setCurrentPlaylist(playlists[0]);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }).catch((err) => {
            console.log(err.response);
        });
        return () => {
            ignore = true;
        }
    }, []);
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(79, 40, 40, 1), rgba(79, 40, 40, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full w-full flex flex-row justify-center">
            <HomeHeader/>
            <div id={"side"}
                 className="z-10 w-1/5 p-2 h-screen md:mt-0 mt-8 sticky bg-gray-800 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">

            </div>
            <button onClick={() => sideMenu()}
                    className={"md:hidden fixed right-0 bottom-0 rounded-full bg-slate-800 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search
                <button onClick={() => hideMenu()}
                        className={"md:hidden fixed right-0 bottom-0 rounded-full bg-gray-700 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search
                </button>
            </button>
            <div id={"films"}
                 className="flex flex-row w-full justify-center mt-[15%] md:mt-[4%]  h-auto min-h-[400px] bg-blue-500 flex-wrap">
                {

                }
                lalalalal
            </div>
            {/*<div*/}
            {/*    className="self-center border-2 border-white w-5/6 flex flex-col min-h-screen justify-start h-full mt-[6%] bg-neutral-700 rounded-3xl ">*/}
            {/*    <p className={"text-white self-center w-fit p-4 text-3xl bg-black"}>Playlists</p>*/}
            {/*    <div className={"flex flex-row w-[94%] self-center min-h-[80vh] bg-white"}>*/}
            {/*        <div className={"flex flex-col bg-red-400 h-full w-1/4"}>*/}
            {/*            {*/}
            {/*                playlists?.map((playlist) => {*/}
            {/*                    return <>*/}
            {/*                        <button key={playlist.pk} onClick={(e) => {*/}
            {/*                            setCurrentPlaylist(playlists.find(obj => obj.pk === playlist.pk));*/}
            {/*                            console.log(currentPlaylist)*/}
            {/*                        }}*/}
            {/*                                className={"m-2 bg-black text-white"}>*/}
            {/*                            {playlist?.title}*/}
            {/*                        </button>*/}
            {/*                    </>*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div className={"flex flex-row flex-wrap bg-blue-500 h-full w-3/4"}>*/}
            {/*            {*/}
            {/*                currentPlaylist?.films.map((film) => {*/}
            {/*                    return <FilmInPlaylist film={film} pk={currentPlaylist?.pk}/>*/}
            {/*                })*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
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