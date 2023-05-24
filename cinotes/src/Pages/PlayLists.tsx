import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import axios from "axios";
import {FilmInPlaylist} from "../Components/FilmInPlaylist";

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
        axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists`, config)
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
            className="min-h-screen h-full w-full flex justify-center">
            <HomeHeader/>
            <div
                className="self-center w-5/6 grid grid-cols-1 min-h-[700px] justify-items-center h-full mt-[6%] bg-neutral-700 rounded-3xl border">
                <p className={"text-white h-10 text-3xl bg-black"}>Playlists</p>
                <div className={"grid grid-cols-[25%_75%]"}>
                    <div className={"flex flex-col"}>
                        {
                            playlists?.map((playlist) => {
                                return <>
                                    <button key={playlist.pk} onClick={(e)=>{setCurrentPlaylist(playlists.find(obj => obj.pk === playlist.pk)); console.log(currentPlaylist)}}
                                         className={"m-2 bg-black text-white"}>
                                            {playlist?.title}
                                    </button>
                                </>
                            })
                        }
                    </div>
                    <div className={"flex flex-row flex-wrap"}>
                        {
                            currentPlaylist?.films.map((film)=>{
                                return <FilmInPlaylist film={film} pk={currentPlaylist?.pk}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}