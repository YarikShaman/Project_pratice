import React, {useEffect} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {DecodeB64} from "../Utilities/DecodeB64";
import {useState} from "react";
import acc from "../Img/Account.png"
import axios from "axios";
import {Link} from "react-router-dom";

export function Account() {

    const [data, setData]=useState<{ImageLink:string, FavFilm:number, FavGenre:number, FavActor:number, UserId:number}>()
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(()=>{
        console.log(DecodeB64(localStorage["jwt"]).id)
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/user-data/get?user_id="+DecodeB64(localStorage["jwt"]).id, config)
            .then(res=>{
                console.log(res.data)
                setData(res.data)
            })
    },[])
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(10, 92, 44, 1), rgba(10, 92, 44, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full text-white flex justify-center">
            <HomeHeader/>
            <div className="w-5/6 mt-20 md:h-[80vh] self-center p-5 rounded-xl bg-neutral-800 flex flex-row flex-wrap">
                <div className=" w-1/2 self-center min-w-[400px] flex justify-center flex-col">
                    <img className="bg-white h-40 w-40" src={data?.ImageLink}/>
                    <p>Username</p>
                    <button></button>
                    <p>Email<p>email@mail.com</p></p>
                    <p>Password: <p>******</p></p>
                    <p></p>
                </div>
                <div className="w-1/2 min-w-[400px] self-center  flex justify-center flex-col">
                    <p>User statistics</p>
                    <hr/>
                    <p>Favourite genre: <p>{data?.FavGenre}</p></p>
                    <p>Favourite actor: <Link to={"/actors/"+data?.FavActor}>{data?.FavActor}</Link></p>
                    <p>Favourite film: <Link to={"/films/"+data?.FavFilm}>{data?.FavFilm}</Link></p>
                </div>
            </div>
        </div>
    );
}