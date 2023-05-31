import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {CheckJWT} from "../Utilities/CheckJWT";

export function Prem() {
    const nav=useNavigate()
    if (CheckJWT() > 0)
        nav("/sign_in")
    return (
        <div
            style={{background:"repeating-linear-gradient(45deg, rgba(255, 205, 0, 1) 1px, rgba(225, 225, 225, 1) 4px, rgba(255, 215, 0, 1) 6px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen flex flex-col w-full">
            <HomeHeader/>
            <div className={"mt-[5%] rounded-xl pb-8 px-5 bg-gray-600 ml-[20%] w-3/5 flex"}>
                <div className={"text-white inline-block content-center justify-center text-xl"}>
                    <p className={"text-3xl ml-[45%]"}>Premium</p>
                    <p>🎥 Upgrade to Premium on our Films Review Site! 🌟

                        Experience cinema like never before with our Premium membership. Elevate your film reviewing and discovery journey with a range of exclusive benefits designed just for you.<br/><br/>

                        ✍️ Unlimited Comments: Express yourself to the fullest! With Premium, you can write as many comments as you want on your favorite movies. Share your thoughts, insights, and engage in lively discussions with fellow film enthusiasts.<br/><br/>

                        🔍 Expanded Comment Size: Say goodbye to character limits! Premium members enjoy the luxury of longer comments, giving you the space to delve deep into your analysis or share detailed recommendations with others.<br/><br/>

                        📺 Personalized Recommendations via Telegram Bot: Get tailor-made film suggestions delivered directly to your Telegram app. Our intelligent recommendation system, powered by Premium, takes into account your preferences, watch history, and feedback to curate a personalized selection of movies you're bound to love.<br/><br/>

                        📚 Create Your Playlists: Bring your movie collection to life! Premium membership grants you the ability to create and curate your own playlists. Build themed collections, organize must-watch films, and share them with friends or the community. The power to create your cinematic universe is in your hands.<br/><br/>

                        🎉 Join the Premium club today and unlock a whole new level of film exploration. Immerse yourself in the world of movies, engage with a passionate community, and enjoy the perks of being a Premium member.<br/><br/>

                        Upgrade now and experience films like never before! Visit our website or app to discover all the benefits of Premium membership. Lights, camera, action! 🍿🎬✨</p>
                    <a href={""} className={"text-xl hover:text-blue-600 underline ml-[43%]"}>Buy premium now!</a>
                </div>
            </div>
        </div>
    );
}