import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {DecodeB64} from "../Utilities/DecodeB64";
import axios from "axios";
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInActor} from "../Components/FIlmInActors";
import {GetLang, SetLang} from "../Utilities/Lang";
import {CheckJWT} from "../Utilities/CheckJWT";
import DropdownWithSearch from "../Components/DropdownWithSearch";
import {ActorEdit} from "../Components/ActorEdit";

interface Actor {
    pk: number;
    name: string;
    birth_date: string;
    death_date: string | null;
    description: string;
    photo_file: string;
    films: Film[];
}

interface Film {
    title: string;
    poster_file: string;
    url: string;
}

const Tool = ({deleteActor, setIsExpandedActor, isExpandedActor}:any) => {
    if (DecodeB64(localStorage["jwt"]).userType == "admin") {
        return (
            <>
                <button
                    onClick={deleteActor}
                    className={"w-1/3 bg-red-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-red-600 hover:border-red-800"}>
                    {GetLang().Delete}
                </button>
                <button
                    onClick={() =>setIsExpandedActor(!isExpandedActor)}
                    className={"w-1/3 bg-amber-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-amber-600 hover:border-amber-800"}>
                    {GetLang().Edit}
                </button>
            </>
        )
    }

    return <></>
}
let alive;

export function Actor() {
    const nav = useNavigate();
    if (CheckJWT() > 0)
        nav("/sign_in");
    const {id} = useParams();
    const [actor, setActor] = useState<Actor | null>(null);
    const [isExpandedActor, setIsExpandedActor] = useState(false);
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    const deleteActor = () => {
        axios.delete(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/${id}/delete/`, config);
        nav("../");
    }
    if (actor?.death_date == null) alive = 'alive';
    else alive = actor?.death_date;
    useEffect(() => {
        console.log(isExpandedActor)
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/${id}/`, config)
                .then(res => {
                    setActor(res.data);
                }, err => {
                    console.log(err.response);
                });
        }
    }, []);

    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(0, 255, 255, 1), rgba(0, 255, 255, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className={"min-h-screen h-auto  flex flex-col pb-10 text-white bg-neutral-800"}>
            <HomeHeader/>
            {isExpandedActor && (
                <ActorEdit actor={actor}/>
            )}
            <div style={{borderWidth: 2, borderImageSlice: 1, borderColor: ""}}
                 className=" pb-[100px] md:w-4/5 self-center h-auto mt-[20%] md:mt-[5%] rounded-xl px-4 flex flex-col bg-neutral-700">
                <div className={"flex w-full  my-2 self-center flex-row"}>
                    <div className={"flex w-full flex-col"}>
                        <div className={"flex flex-row mt-8 ml-5"}>
                            <div style={{fontFamily: "sans-serif", fontWeight: "bold"}}
                                 className={"text-[40px] mx-5 w-full "}>
                                {actor?.name}
                            </div>
                            <div className={"w-96 flex h-2/3 self-center justify-end"}>
                                <Tool deleteActor={deleteActor} setIsExpandedActor={setIsExpandedActor} isExpandedActor={isExpandedActor}/>
                            </div>
                        </div>
                        <div className={"flex flex-row mt-[50px]"}>
                            <div className={"p-1 rounded-xl pl-10"}>
                                <img className={"rounded-xl  w-[500px]"} src={actor?.photo_file}/>
                            </div>
                            <div className={"mx-5 p-3 w-full text-[24px]"}>
                                <p className="pt-0"><b>{GetLang().Birth_date}:</b> {actor?.birth_date}</p>
                                <p className="pt-3"><b>{GetLang().Death_date}:</b> {alive}</p>
                                <p className="pt-3"><b>{GetLang().Description}:</b> {actor?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex w-full  my-2 self-center flex-col"}>
                    <div className={"text-[42px] mt-[40px] text-center"}>{GetLang().Films}</div>
                    <div className={"flex flex-row justify-center mt-[40px]"}>
                        {
                            actor?.films.map(films => {
                                return <>
                                    <FilmInActor films={films}/>
                                </>
                            })
                        }</div>
                </div>
            </div>
        </div>)
}