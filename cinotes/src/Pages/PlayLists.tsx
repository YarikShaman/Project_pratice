import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import axios from "axios";
interface Film {
    title: string;
    poster_file: string;
    url: string;
}
export function Playlists() {
    const [playlists, setPlaylists] = useState<{ title: string, films: Film[] }[]>([]);
    const [playlistResponse, setPlaylistResponse] = useState<{title:string,url:string}[]>([])
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists`, config)
            .then(async (res) => {
                if (!ignore) {
                    setPlaylistResponse(res.data);
                    console.log(res.data.results);

                    for (let i = 0; i < res.data.results.length; i++) {
                        let id = res.data.results[i].url.split('/')[res.data.results[i].url.split('/').length - 2];

                        try {
                            const playlistRes = await axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/${id}`, config);
                            setPlaylists((prevPlaylists) => [...prevPlaylists, playlistRes.data]);
                            console.log(playlistRes.data);
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
            <div className="self-center w-5/6 grid grid-cols-1 min-h-[700px] justify-items-center h-full mt-[6%] bg-neutral-700 rounded-3xl border">
                <p className={"text-white  h-10 text-3xl bg-black"}>Playlists</p>
                {
                    playlists?.map((playlist)=>{
                        return <>
                            <div key={playlist.title} className={"flex flex-col"}>
                                <div>
                                    {playlist?.title}
                                </div>
                                <div className={"flex flex-row"}>
                                    {playlist?.films.map((film)=>{
                                        return <></>
                                    })}
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    );
}