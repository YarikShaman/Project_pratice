import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {CheckJWT} from "../Utilities/CheckJWT";

export function Prem() {
    const nav=useNavigate()
    const [isPremium, setIsPremium] = useState(false);
    if (CheckJWT() > 0)
        nav("/sign_in")
    useEffect(()=>{setIsPremium( DecodeB64(localStorage["jwt"]).userType=="premium")},[])

    return (
        <div
            style={{background:"repeating-linear-gradient(45deg, rgba(255, 205, 0, 1) 1px, rgba(225, 225, 225, 1) 4px, rgba(255, 215, 0, 1) 6px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen flex flex-col w-full">
            <HomeHeader/>
            <div className={"mt-[5%] rounded-xl pb-8 px-5 bg-gray-600 ml-[20%] w-3/5 flex"}>
                <div className={"text-white flex flex-col items-center justify-center text-xl"}>
                    <p className={"text-3xl my-3"}>{GetLang().Premium}</p>
                    <p>🎥 {GetLang().pr1} 🌟
                        {GetLang().pr2}<br/><br/>

                        ✍️ {GetLang().pr3}<br/><br/>

                        🔍 {GetLang().pr4}<br/><br/>

                        📺 {GetLang().pr5}<br/><br/>

                        📚 {GetLang().pr6}<br/><br/>

                        🎉{GetLang().pr7}<br/><br/>

                        {GetLang().pr8}🍿🎬✨</p>
                    {!isPremium&&(<a href={"./payment"} className={"text-xl hover:text-blue-600 underline "}>{GetLang().pr9}</a>)}
                </div>
            </div>
        </div>
    );
}