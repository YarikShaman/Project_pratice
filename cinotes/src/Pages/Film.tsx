import {HomeHeader} from "../Components/HomeHeader";
import Not from "../Img/Not_Found.png"
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ActorInActors} from "../Components/ActorInActors";
import {ActorInFilm} from "../Components/ActorInFilm";
import {ScreenshotInFilm} from "../Components/ScreenshotInFilm";
import {useParams} from "react-router-dom";
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
export function Film() {
    const {id} = useParams()
    const [film, setFilm] = useState<Film | null>(null);
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/${id}/`, config)
            .then(res => {
                if (!ignore) {
                    setFilm(res.data);
                    console.log(res.data);
                }
            }, err=>{
                console.log(err.response);
            });
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className={"min-h-screen flex flex-col text-white bg-neutral-700"}>
            <HomeHeader/>
            <div className={"flex md:w-4/5 my-2 self-center flex-row"}>
                <div className={"flex w-full flex-col"}>
                    <div className={"flex flex-row my-5 ml-5"}>
                        <div className={"text-4xl mr-5 w-full"}>
                            {film?.title}
                        </div>
                        <div className={"w-48 flex bg-gray-600"}>
                            <button className={"grow"}>
                                Add to playlist
                            </button>
                        </div>
                    </div>
                    <div className={"flex flex-row"}>
                        <div className={"bg-stone-800 p-1 rounded-xl "}>
                            <img className={"rounded-xl  w-[270px]"} src={film?.poster_file}/>
                        </div>
                        <div className={"ml-5 w-full bg-neutral-600"}>
                            <p>Genres: {film?.genres.map(genre => genre.title).join(', ')}</p>
                            <p>Release date: {film?.release_date}</p>
                            <p>Country: {film?.country}</p>
                            <p>User rating: {film?.rating}</p>
                            <p>Imdb rating: {film?.imdb_rating}</p>
                            <p>Director: {film?.director}</p>
                            <p>Studio: {film?.studio}</p>
                            <p>Age restriction: {film?.content_rating}</p>
                            <p>Description: {film?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex md:w-4/5 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"text-2xl"}>Screenshots</div>
                <div className={"flex flex-row"}>
                    {
                        film?.screenshots.map(screenshot => {
                            return <>
                                <ScreenshotInFilm screenshot={screenshot}/>
                            </>
                        })
                    }</div>
            </div>
            <div className={"flex md:w-4/5 h-96 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"text-2xl"}>The cast</div>
                <div className={"flex flex-row"}>
                {
                    film?.actors.map(actor => {
                        return <>
                            <ActorInFilm actor={actor}/>
                        </>
                    })
                }</div>
            </div>

            <div className={"flex md:w-4/5 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"border-b-white border-b-2"}>
                    <button className={"w-20 bg-slate-800"}>
                        Reviews
                    </button>
                    <button className={"w-20"}>
                        My notes
                    </button>
                </div>
                Каментьі компонент
            </div>
        </div>
    )
}