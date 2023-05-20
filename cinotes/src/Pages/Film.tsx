import {HomeHeader} from "../Components/HomeHeader";
import Not from "../Img/Not_Found.png"
import axios from "axios";
import {useEffect, useState} from "react";
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
    age_restriction: number;
    imdb_rating: string;
    studio: string;
    screenshots: {
        file: string;
        compressed_file: string;
    }[];
}
export function Film(filmN:any) {
    const [film, setFilm] = useState<Film | null>(null);
    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/film/4/", config)
            .then(res => {
                if (!ignore) {
                    setFilm(res.data);
                    console.log(res.data);
                }
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

                        </div>
                        <div className={"w-48 flex bg-gray-600"}>
                            <button className={"grow"}>
                                Add to playlist
                            </button>
                        </div>
                    </div>
                    <div className={" flex flex-row"}>
                        <div className={"bg-black"}>
                            <img className={"object-cover h-72"} src={Not}/>
                        </div>
                        <div className={"ml-5 w-full bg-neutral-600"}>
                            Информация
                        </div>
                    </div>
                </div>
            </div>
            <div className={"flex md:w-4/5 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"text-2xl"}>The cast</div>
                актори компонент
            </div>
            <div className={"flex md:w-4/5 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"text-2xl"}>Screenshots</div>
                скриншотьі компонент
            </div>
            <div className={"flex md:w-4/5 my-2 self-center bg-stone-600 flex-col"}>
                <div className={"border-b-white border-b-2"}>
                    <button className={"w-20 bg-slate-800"}>
                        Rewiews
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