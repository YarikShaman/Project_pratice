import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {ActorInActors} from "../Components/ActorInActors";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {CheckJWT} from "../Utilities/CheckJWT";

export function Actors() {
    const nav = useNavigate()
    if (CheckJWT() > 0)
        nav("/sign_in")
    const [change, setChange] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [actorName, setActorName] = useState<any>([]);
    const [actors, setActors] = useState([]);
    const [selectedPage, setSelectedPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    useEffect(() => {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            let p_size = 10;
            let query = '?page=';
            const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
            if (isSearch == true) {
                query = "search/?q=" + actorName + '&page=';
            }
            axios.get("https://back.cintoes.link/actors/" + query + selectedPage, config)
                .then(res => {
                    setActors(res.data.results);
                    setMaxPages(Math.ceil(res.data.count / p_size));
                });
        }
    }, [selectedPage, isSearch,change]);
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(30, 32, 74, 1), rgba(30, 32, 74, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="bg-neutral-700 min-h-screen grid grid-cols-1 content-start gap-1 justify-items-center">
            <HomeHeader/>
            <div className="md:w-1/3 flex my-2 flex-nowrap mt-[20%] md:mt-[6%] h-10">
                <input
                    value={actorName}
                    onChange={(e) => setActorName(e.target.value)}
                    className="w-3/4 ring-slate-700 text-black block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type={"text"}/>
                <button
                    className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type={"submit"} onClick={() => {setIsSearch(true);setChange(!change)}}>{GetLang().Search}
                </button>
            </div>
            <div id={"actors"} className="flex w-5/6 flex-row h-auto justify-center flex-wrap">
                {
                    actors.map(actor => {
                        return <>
                            <ActorInActors actor={actor}/>
                        </>
                    })
                }
            </div>
            <div
                className={"w-[200px]  rounded-xl bg-slate-700 flex flex-row justify-center space-x-2 my-5 text-white"}>
                <button onClick={() => {
                    if (selectedPage != 1) setSelectedPage(selectedPage - 1)
                }} className={" text-4xl pb-2"}>{"<"}</button>
                <input value={selectedPage} onChange={(e) => setSelectedPage(Number(e.target.value))}
                       className={"w-12 text-center text-xl font-semibold bg-gray-600"} min={1} type={"number"}/>
                <p className={" text-4xl "}>/</p>
                <div className={"w-12 text-center pt-[10px] text-xl font-semibold bg-gray-600"}>{maxPages}</div>
                <button onClick={() => {
                    if (selectedPage != maxPages) setSelectedPage(selectedPage + 1)
                }} className={" text-4xl pb-2"}>{">"}</button>
            </div>
        </div>
    );
}