import React, {useEffect} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {DecodeB64} from "../Utilities/DecodeB64";
import {useState} from "react";
import acc from "../Img/Account.png"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {CheckJWT} from "../Utilities/CheckJWT";

export function Account() {
    const nav=useNavigate()
    const [data, setData]=useState<{ImageLink:string, FavFilm:number, FavGenre:number, FavActor:number, UserId:number}>()
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};

    useEffect(()=>{
        if (CheckJWT()!=0)
            nav("/sign_in")
        else {
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/user-data/get?user_id=" + DecodeB64(localStorage["jwt"]).id, config)
                .then(res => {
                    console.log(res.data)
                    setData(res.data)
                })
        }
    },[])
    let date = (new Date(DecodeB64(localStorage["jwt"]).exp*1000)).toString()
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(10, 92, 44, 1), rgba(10, 92, 44, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full text-white flex justify-center">
            <HomeHeader/>
            <div className="w-5/6 mt-20 md:h-[80vh] self-center p-5 rounded-xl bg-neutral-800 flex flex-row flex-wrap">
                <div className=" w-1/2 self-center min-w-[400px] flex bg-green-700 flex-col justify-center self-center">
                    <img className="bg-white h-40 self-center w-40" src={data?.ImageLink}/>
                    <p className="self-center">{DecodeB64(localStorage["jwt"]).username}</p>
                    <button></button>
                    <p  className="self-center">{GetLang().Email}<p>{DecodeB64(localStorage["jwt"]).email}</p></p>
                    <p  className="self-center">{GetLang().Account_type}: {DecodeB64(localStorage["jwt"]).username}</p>
                    <p  className="self-center">{GetLang().Resign_in_date}: { date}</p>
                </div>
                <div className="w-1/2 min-w-[400px] self-center bg-blue-500 flex flex-col justify-center self-center">
                    <p>{GetLang().User_statistics}</p>
                    <hr/>
                    <p>{GetLang().Favourite_genre}: <p>{data?.FavGenre}</p></p>
                    <p>{GetLang().Favourite_actor}: <Link to={"/actors/"+data?.FavActor}>{data?.FavActor}</Link></p>
                    <p>{GetLang().Favourite_film}: <Link to={"/films/"+data?.FavFilm}>{data?.FavFilm}</Link></p>
                </div>
            </div>
        </div>
    );
}