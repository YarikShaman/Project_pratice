import {HomeHeader} from "../Components/HomeHeader";
import Not from "../Img/Not_Found.png"
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ActorInActors} from "../Components/ActorInActors";
import {ActorInFilm} from "../Components/ActorInFilm";
import {ScreenshotInFilm} from "../Components/ScreenshotInFilm";
import {Link, useParams} from "react-router-dom";
import {GetLang} from "../Utilities/Lang";
import {Simulate} from "react-dom/test-utils";
import blur = Simulate.blur;
import {DecodeB64} from "../Utilities/DecodeB64";

interface Film {
    pk: number;
    title: string;
    poster_file: string;
    rating: string;
    country: string;
    release_date: string;
    actors: {
        pk: number;
        name: string;
        photo_file: string;
        url: string;
    }[];
    genres: {
        pk: number;
        title: string;
    }[];
    director: string;
    description: string;
    content_rating: number;
    imdb_rating: string;
    studio: string;
    screenshots: {
        file: string;
        compressed_file: string;
    }[];
}

let tools = (<></>)
let c = 0

export function Film() {
    const {id} = useParams()
    const [film, setFilm] = useState<Film | null>(null);
    if (DecodeB64(localStorage["jwt"]).userType == "admin" && c == 0) {
        c++
        tools = (
            <>
                <button onClick={() => {
                }}
                        className={"w-1/3 bg-red-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-red-600 hover:border-red-800"}>
                    Delete
                </button>
                <button onClick={() => {
                }}
                        className={"w-1/3 bg-amber-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-amber-600 hover:border-amber-800"}>
                    Edit
                </button>
            </>
        )
    }
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/${id}/`, config)
            .then(res => {
                if (!ignore) {
                    setFilm(res.data);
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
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(255, 130, 0, 1), rgba(255, 130, 0, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className={"min-h-screen h-auto  flex flex-col pb-10 text-white bg-neutral-800"}>
            <HomeHeader/>
            <div style={{borderWidth: 2, borderImageSlice: 1, borderColor: ""}}
                 className=" pb-[100px] md:w-4/5 self-center h-auto mt-[20%] md:mt-[5%] rounded-xl px-4 flex flex-col bg-neutral-700">
                <div className={"flex w-full  my-2 self-center flex-row"}>
                    <div className={"flex w-full flex-col"}>
                        <div className={"flex flex-row mt-8 ml-5"}>
                            <div style={{fontFamily: "sans-serif", fontWeight: "bold"}}
                                 className={"text-[40px] mx-5 w-full "}>
                                {film?.title}
                            </div>
                            <div className={"w-96 flex h-2/3 self-center justify-end"}>
                                {tools}
                                <button
                                    className={"w-1/2  bg-green-700 font-semibold border-neutral-400 hover:bg-green-600 rounded-sm border-2 hover:border-2 hover:border-green-800"}>
                                    Add to playlist
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-row mt-[50px]"}>
                            <div className={"p-1 rounded-xl pl-10"}>
                                <img className={"rounded-xl  w-[500px]"} src={film?.poster_file}/>
                            </div>
                            <div className={"mx-5 p-3 w-full text-[24px]"}>
                                <p className="pt-0"><b>Genres:</b> {film?.genres.map(genre => genre.title).join(', ')}
                                </p>
                                <p className="pt-3"><b>Release date:</b> {film?.release_date}</p>
                                <p className="pt-3"><b>Country:</b> {film?.country}</p>
                                <p className="pt-3"><b>User rating:</b> {film?.rating}</p>
                                <p className="pt-3"><b>Imdb rating:</b> {film?.imdb_rating}</p>
                                <p className="pt-3"><b>Director:</b> {film?.director}</p>
                                <p className="pt-3"><b>Studio:</b> {film?.studio}</p>
                                <p className="pt-3"><b>Age restriction:</b> {film?.content_rating}</p>
                                <p className="pt-3"><b>Description:</b> {film?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex w-full my-2 self-center flex-col"}>
                    <div
                        // style={{backgroundImage:`url(${KinoLenta})`, backdropFilter:"blur(10px)"}}
                        className={"flex justify-center flex-row mt-[40px]  "}>
                        {
                            film?.screenshots.map(screenshot => {
                                return <>
                                    <ScreenshotInFilm screenshot={screenshot}/>
                                </>
                            })
                        }</div>
                </div>
                <div className={"flex w-full  my-2 self-center flex-col"}>
                    <div className={"text-[42px] mt-[40px] text-center"}>The cast</div>
                    <div className={"flex flex-row justify-center mt-[40px]"}>
                        {
                            film?.actors.map(actor => {
                                return <>
                                    <ActorInFilm actor={actor}/>
                                </>
                            })
                        }</div>
                </div>

                <div className={"flex w-11/12 mt-[40px] h-[400px]  self-center bg-stone-600 flex-col"}>
                    <div className={"border-b-white border-b-2"}>
                        <button id="reviews" style={{backgroundColor: "rgb(31 41 55)"}}
                                className={" text-[20px] px-5 py-2 "}>
                            Reviews
                        </button>
                        <button id="my_notes" style={{backgroundColor: "rgb(31 41 55)"}}
                                className={"text-[20px] px-5 py-2 "}>
                            My notes
                        </button>
                    </div>
                    Каментьі компонент
                </div>
            </div>
        </div>
    )
}