import React, {useEffect} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {DecodeB64} from "../Utilities/DecodeB64";
import {useState} from "react";
import acc from "../Img/Account.png"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {GetLang} from "../Utilities/Lang";
import {CheckJWT} from "../Utilities/CheckJWT";
import DropdownWithSearch from "../Components/DropdownWithSearch";

export function Account() {
    const nav = useNavigate()
    const [data, setData] = useState<{ ImageLink: string, FavFilm: number, FavGenre: number, FavActor: number, UserId: number }>()
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    const [film, setFilm] = useState("");
    const [genre, setGenre] = useState("")
    const [actor, setActor] = useState("")
    const [filmS, setFilmS] = useState("");
    const [genreS, setGenreS] = useState("")
    const [actorS, setActorS] = useState("")
    const [actorsRaw, setActorsRaw] = useState<{ pk: string; name: string; photo_file: string; url: string; }[]>([]);
    const [genreRaw, setGenreRaw] = useState<any[]>([])
    const [filmOptions, setFilmOptions] = useState<any[]>([]);
    const [genreOptions, setGenreOptions] = useState<any[]>([])
    const [actorOptions, setActorOptions] = useState<any[]>([])


    function OpenEditor() {
        //@ts-ignore
        document.getElementById("accData").style.display = "none";
        //@ts-ignore
        document.getElementById("accDataEditor").style.display = "block";
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/genres/?page_size=1000", config)
            .then((res) => {
                console.log(res.data.results)
                setGenreRaw(res.data.results)
                setGenreOptions(res.data.results.map((genre: { title: any; }) => genre.title))
                console.log(res.data.results.map((genre: { title: any; }) => genre.title))
            })
    }

    function HideEditor() {
        //@ts-ignore
        document.getElementById("accDataEditor").style.display = "none";
        //@ts-ignore
        document.getElementById("accData").style.display = "block";
    }
    function SetFavorite() {
        let data = new FormData();
        if(genre) data.append("fav-genre",genre);
        if(film) data.append("fav-film",film);
        if(actor) data.append("fav-actor",actor);
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/user-data/add",data, config);
    }
    useEffect(() => {
        if (CheckJWT() != 0)
            nav("/sign_in")
        else {
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/user-data/get?user_id=" + DecodeB64(localStorage["jwt"]).id, config)
                .then(res => {
                    setData(res.data)
                    axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/" + res.data.FavFilm.toString() + "/", config)
                        .then((resp) => {
                            setFilm(resp.data.title)
                        })
                    axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/genres/" + res.data.FavGenre.toString() + "/", config)
                        .then((resp) => {

                            setGenre(resp.data.title)
                        })
                    axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/" + res.data.FavActor.toString() + "/", config)
                        .then((resp) => {
                            setActor(resp.data.name)
                        })

                })
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?page_size=500", config)
                .then(res => {
                    setFilmOptions(res.data.results.map((film: { url: any; title: any; }) => ({
                        url: film.url.match(/\/films\/(\d+)\//)[1],
                        title: film.title,
                    })));

                });
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/?page_size=500", config)
                .then(res => {
                    setActorsRaw(res.data.results);
                    setActorOptions((res.data.results).map((actor: { name: any; }) => actor.name))
                });
        }
    }, [])
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(10, 92, 44, 1), rgba(10, 92, 44, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full w-full text-white flex justify-center">
            <HomeHeader/>
            <div
                className="w-5/6 mt-20 md:min-h-[80vh] self-center p-5 rounded-xl  bg-neutral-800 flex flex-row flex-wrap">
                <div
                    className=" w-1/2 self-center block h-full min-w-[400px] flex  flex-col justify-center self-center">
                    <img className="bg-white h-[300px] self-center w-[300px] rounded" src={data?.ImageLink}/>
                    <p className="self-center text-[40px]">{DecodeB64(localStorage["jwt"]).username}</p>
                    <p className="self-center text-[25px]">{GetLang().Email}: {DecodeB64(localStorage["jwt"]).email}</p>
                    <p className="self-center text-[25px]">{GetLang().Account_type}: {DecodeB64(localStorage["jwt"]).userType}</p>
                    <button
                        className="h-12 text-[25px]  hover:border-2 w-40 bg-red-500 rounded-3xl mt-10 self-center">{GetLang().Log_out}</button>
                </div>
                <div
                    className="w-1/2 min-w-[400px] block h-full p-10 mt-14 mb-40 flex flex-col justify-start self-center">
                    <div id="accData"
                         className="flex  flex-col text-[25px] mb-28 justify-start flex-wrap">
                        <p className="mb-6">{GetLang().User_information}</p>
                        <hr className="mb-6"/>
                        <p className="mb-6">{GetLang().Favourite_genre}: {genre}</p>
                        <p className="mb-6">
                            {GetLang().Favourite_actor}: <Link to={"/actors/" + data?.FavActor}
                                                               className="cursor-pointer hover:text-indigo-500 text-indigo-300 font-bold">{actor}</Link>
                        </p>
                        <p className="mb-6">
                            {GetLang().Favourite_film}: <Link to={"/films/" + data?.FavFilm}
                                                              className="cursor-pointer hover:text-indigo-500 text-indigo-300 font-bold">{film}</Link>
                        </p>
                        <button onClick={() => {
                            OpenEditor()
                        }}
                                className="h-12 w-40 bg-amber-600 hover:border-2 rounded-3xl self-start">
                            {GetLang().Edit}
                        </button>
                    </div>
                    <div id="accDataEditor" style={{display: "none"}}
                         className="flex flex-col space-y-6 justify-between flex-wrap">
                        <p className="text-[25px]">{GetLang().Favourite_genre}</p>
                        <DropdownWithSearch options={genreOptions} onSelect={setGenre}/>

                        <p className="text-[25px]">{GetLang().Favourite_actor}</p>
                        <div className="flex flex-row">
                            <DropdownWithSearch options={actorOptions} onSelect={setActor}/>
                        </div>
                        <p className="text-[25px]">{GetLang().Favourite_film}</p>
                        <div className="flex flex-row">
                            <DropdownWithSearch options={filmOptions.map((film) => film.title)} onSelect={setFilm}/>
                        </div>
                        <div className="flex flex-row justify-around">
                            <button
                                onClick={() => {
                                    HideEditor()
                                }}
                                className="h-12 w-40 rounded-3xl hover:border-2 text-[25px] bg-amber-600">
                                {GetLang().Cancel}
                            </button>
                            <button
                                onClick={() => {
                                    SetFavorite();
                                    HideEditor();
                                }}
                                className="h-12 w-40 rounded-3xl hover:border-2 text-[25px] bg-green-700">
                                {GetLang().Edit}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


