import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Base64} from "js-base64";
import axios from "axios";
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInActor} from "../Components/FIlmInActors";

interface Film {
    title: string;
    poster_file: string;
    url: string;
}

let c = 0;

export function Playlist() {
    const {id} = useParams()
    const [playlist, setPlaylist] = useState<{ title: string, films: Film[] }>();
    let tools = (
        <>
            <button
                onClick={()=>{}}
                className={"w-1/3 bg-red-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-red-600 hover:border-red-800"}>
                Delete
            </button>
        </>
    )
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/${id}`, config)
            .then(res => {
                if (!ignore) {
                    setPlaylist(res.data);
                    console.log(res.data);
                }
            }, err => {
                console.log(err.response);
            });
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className={"min-h-screen h-auto  flex flex-col pb-10 text-white bg-neutral-800"}>
            <HomeHeader/>
            <div style={{borderWidth: 2, borderImageSlice: 1, borderColor: ""}}
                 className=" pb-[100px] md:w-4/5 self-center h-auto mt-[20%] md:mt-[5%] rounded-xl px-4 flex flex-col bg-neutral-700">
                <div className={"flex flex-row mt-8 ml-5"}>
                    <div style={{fontFamily: "sans-serif", fontWeight: "bold"}} className={"text-[40px] mx-5 w-full "}>
                        {playlist?.title}
                    </div>
                    <div className={"w-96 flex h-2/3 self-center justify-end"}>
                        {tools}
                    </div>
                </div>
                <div className={"flex flex-row "}>
                    <img className={"rounded-xl border-4 border-black my-5 h-[600px] w-[400px]"}
                         src={playlist?.films[0].poster_file}/>
                    <div className={"flex flex-row justify-center flex-wrap"}>
                        {
                            playlist?.films.map(films => {
                                return <>
                                    <FilmInActor films={films}/>
                                </>
                            })
                        }</div>
                </div>
            </div>
        </div>)
}

