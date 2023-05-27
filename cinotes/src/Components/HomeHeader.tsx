import React, {useEffect, useState} from "react";
import "../App.css";
import Acc from '../Img/Account.png';
import Eng from "../Img/EngLang.png";
import Ukr from "../Img/UkrLang.png";
import {Link} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import axios from "axios";

//let lang=GetLang();
let c = 0
let apanel = <></>
let mstate = false;


export function HomeHeader() {
    const [source, setSourse] = useState(Acc)
    const [link, setLink] = useState("/sign_in")
    const [label, setLabel]=useState(GetLang().Sign_in)
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    const OpenMenu = () => {
        if (!mstate) {
            // @ts-ignore
            document.getElementById("menu").style.display = "block";
            // @ts-ignore
            document.getElementById("lang").style.display = "block";
            mstate = true;
        } else {
            // @ts-ignore
            document.getElementById("menu").style.display = "none";
            // @ts-ignore
            document.getElementById("lang").style.display = "none";
            mstate = false;
        }
    }
    if (!document.cookie.includes("language=")) {
        document.cookie = "language=1; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
    }
    // @ts-ignore
    let language = document.cookie.split('; ').find(row => row.startsWith('language=')).split('=')[1];
    SetLang(Number(language));
    useEffect(() => {
        if (localStorage["jwt"]!=undefined)
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/user-data/get?user_id=" + DecodeB64(localStorage["jwt"]).id.toString(), config)
                .then(res=>{
                    console.log(res.data)
                    setSourse(res.data.ImageLink)
                })
        if (language == "2") {
            let engm = document.getElementById("m1");
            let ukrm = document.getElementById("m2");
            let eng = document.getElementById("1");
            let ukr = document.getElementById("2");
            // @ts-ignore
            engm.style.filter = "brightness(0.5)";
            // @ts-ignore
            ukrm.style.filter = "brightness(1.25)";
            // @ts-ignore
            eng.style.filter = "brightness(0.5)";
            // @ts-ignore
            ukr.style.filter = "brightness(1.25)";
        }
    }, []);
    //console.log(DecodeB64(localStorage["jwt"]))
    if (localStorage["jwt"].exists) {
        setLabel(DecodeB64(localStorage["jwt"]).userName)
        if (DecodeB64(localStorage["jwt"]).userType == "admin" && c == 0) {
            c++
            apanel = (
                <Link className={"flex flex-grow"} to={"/a_panel"}>
                    <div
                        className="hover:bg-sky-900 rounded-lg h-full  flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                        <p className="self-center">{GetLang().Premium}</p>
                    </div>
                </Link>
            )
        }
    }
    return (
        <>
            <div id={"main"}
                 className="z-40 h-[8%] fixed border-b-2 border-b-neutral-900 bg-neutral-800 flex flex-row space-x-5 w-full items-center justify-between">
                <p className="self-center pl-6 text-2xl font-bold text-white select-none italic ">
                    Cinotes
                </p>
                <div className={"flex flex-row w-full items-center h-full hidden md:flex justify-between"}>
                    <div className="flex w-1/2 h-full">
                        <Link className={"flex flex-grow"} to={"/"}>
                            <div
                                className="hover:bg-sky-900 h-full rounded-lg py-7 flex self-center flex-grow justify-center text-white  cursor-pointer">
                                <p className="self-center">{GetLang().Home}</p>
                            </div>
                        </Link>
                        <Link className={"flex flex-grow"} to={"/films"}>
                            <div
                                className="hover:bg-sky-900 rounded-lg h-full flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                                <p className="self-center">{GetLang().Films}</p>
                            </div>
                        </Link>
                        <Link className={"flex flex-grow"} to={"/playlists"}>
                            <div
                                className="hover:bg-sky-900 rounded-lg h-full flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                                <p className="self-center">{GetLang().Playlists}</p>
                            </div>
                        </Link>
                        <Link className={"flex flex-grow"} to={"/actors"}>
                            <div
                                className="hover:bg-sky-900 rounded-lg h-full  flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                                <p className="self-center">{GetLang().Actors}</p>
                            </div>
                        </Link>
                        <Link className={"flex flex-grow"} to={"/prem"}>
                            <div
                                className="hover:bg-sky-900 rounded-lg h-full  flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                                <p className="self-center">{GetLang().Premium}</p>
                            </div>
                        </Link>
                        {apanel}
                    </div>
                    <div className="flex flex-row space-x-5">
                        <div
                            className="flex flex-col mt-3 overflow-hidden rounded-xl border-2 border-slate-700 hover:border-slate-600 h-10"
                            onClick={() => LangCh()}>
                            <img
                                id="1" className="h-5 w-8 brightness-125" alt={"Set another lang?"} src={Eng}/>
                            <img
                                id="2" className="h-5 w-8 brightness-50" alt={"Set another lang?"} src={Ukr}/>
                        </div>
                        <Link to={"/sign_in"}>
                            <div
                                className="hover:bg-neutral-900 bg-stone-900 my-1 flex flex-col w-20 border-2 border-gray-800 rounded-xl mr-2 text-white hover:text-sky-500 hover:border-sky-900 cursor-pointer select-none">
                                <img className=" w-7 h-7 mt-1 bg-cover bg-repeat self-center " alt={"Profile_Pic"}
                                     src={Acc}></img>
                                <p className="text-sm self-center text-center">{label}</p>
                            </div>
                        </Link>

                    </div>

                </div>

                <div className={" md:hidden flex flex-row"}>
                    <div id={"lang"}
                         className="flex hidden flex-col mt-2 mr-2 overflow-hidden rounded-xl border-2 border-slate-700 hover:border-slate-600 h-10"
                         onClick={() => LangCh()}>
                        <img
                            id="m1" className="h-5 w-8 brightness-125" alt={"Set another lang?"} src={Eng}/>
                        <img
                            id="m2" className="h-5 w-8 brightness-50" alt={"Set another lang?"} src={Ukr}/>
                    </div>
                    <button className="w-10 h-10 mt-2 mr-2" onClick={() => OpenMenu()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="white">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                        </svg>
                    </button>
                </div>

            </div>
            <div className="hidden fixed pt-14 pb-1 w-1/2 right-0 bg-neutral-800" id="menu">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    <a href={"/"}
                       className={"text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>{GetLang().Home}</a>
                    <a href={"/films"}
                       className={"text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>{GetLang().Films}</a>
                    <a href={"/playlists"}
                       className={"text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>{GetLang().Playlists}</a>
                    <a href={"/actors"}
                       className={"text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>{GetLang().Actors}</a>
                    <a href={"/premium"}
                       className={"text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"}>{GetLang().Premium}</a>
                </div>
                <Link to={link}>
                    <div
                        className="hover:bg-neutral-900 bg-stone-900  flex flex-row   border-2 border-gray-800 rounded-xl m-3 py-1 text-white hover:text-sky-500 hover:border-sky-900 cursor-pointer select-none">
                        <img className=" w-7 h-7 m-2 bg-cover bg-repeat self-center " alt={"Profile_Pic"}
                             src={source}></img>
                        <p className="text-sm self-center text-center">{label}</p>
                    </div>
                </Link>

            </div>
        </>
    );
}

function LangCh() {
    if (!document.cookie.includes("language=")) {
        document.cookie = "language=1; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
    }
    // @ts-ignore
    let language = document.cookie.split('; ').find(row => row.startsWith('language=')).split('=')[1];
    if (mstate) {
        let eng = document.getElementById("m1");
        let ukr = document.getElementById("m2");
        // @ts-ignore
        if (language == 1) {
            document.cookie = "language=2; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
            // @ts-ignore
            let language2 = document.cookie
                .split('; ')
                .find(row => row.startsWith('language='))
                .split('=')[1];
            // @ts-ignore
            ukr.style.filter = "brightness(1.25)";
            // @ts-ignore
            eng.style.filter = "brightness(0.5)";
            SetLang(Number(language2));
        } else {
            document.cookie = "language=1; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
            // @ts-ignore
            const language2 = document.cookie
                .split('; ')
                .find(row => row.startsWith('language='))
                .split('=')[1];
            // @ts-ignore
            ukr.style.filter = "brightness(0.5)";
            // @ts-ignore
            eng.style.filter = "brightness(1.25)";
            SetLang(Number(language2));
        }
    } else {
        let eng = document.getElementById("1");
        let ukr = document.getElementById("2");
        // @ts-ignore
        if (language == 1) {
            document.cookie = "language=2; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
            // @ts-ignore
            const language2 = document.cookie
                .split('; ')
                .find(row => row.startsWith('language='))
                .split('=')[1];
            // @ts-ignore
            ukr.style.filter = "brightness(1.25)";
            // @ts-ignore
            eng.style.filter = "brightness(0.5)";
            SetLang(Number(language2));
        } else {
            document.cookie = "language=1; expires=Thu, 17 May 2024 00:00:00 UTC; path=/";
            // @ts-ignore
            const language2 = document.cookie
                .split('; ')
                .find(row => row.startsWith('language='))
                .split('=')[1];
            // @ts-ignore
            ukr.style.filter = "brightness(0.5)";
            // @ts-ignore
            eng.style.filter = "brightness(1.25)";
            SetLang(Number(language2))
        }
        window.location.reload();
    }
}

