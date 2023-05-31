import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {CheckJWT} from "../Utilities/CheckJWT";

function FilmInPlaylist(combo:any) {
    const nav= useNavigate()
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    const id = combo.combo.film.url.split("/")[4]
    let film = combo.combo
    let playlist=combo.combo.currentPlaylist
    //console.log(playlist)

    return (
        <div className="flex mx-5 my-5  justify-end">
            <svg id={"svg" + id} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" onClick={() => {
                tryDelete()
            }}
                 style={{visibility: "visible", borderRadius: "14px", height: "32px"}}
                 className="mr-6  justify-self-end bg-red-600 rounded-full cursor-pointer border-[2px] hover:h-10 w-fit hover:border-4 hover:border-neutral-300 border-black z-10 absolute ">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
            </svg>
            <Link id={"front" + id} to={`/films/${film.film.url.split("/")[4]}`}
                  style={{
                      visibility: "visible", width: "260px",
                      background: "linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                          "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"
                  }}
                  className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg h-[390px] hover:shadow-white "}>
                <img className="w-56 h-80 object-cover mt-4 w-auto rounded-xl border-2 border-gray-700 self-center"
                     src={film.film.compressed_poster_file}/>
                <p className="text-white self-center my-auto text-center w-5/6">{film.film.title}</p>
            </Link>
            <div id={"back" + id} style={{
                width: "0px ", visibility: "collapse",
                background: "linear-gradient( rgba(0,0,0, 0.2) 0%, rgba(0,0,0, 0.1) 25%, rgba(0,0,0, 0.2) 50%, rgba(0,0,0, 0.1) 75%, rgba(0,0,0, 0.2) 100%), \n" +
                    "linear-gradient(90deg, rgb(35, 43, 51), rgb(48, 54, 65), rgb(72, 78, 87)"
            }}
                 className="p-4 shadow-gray-900 flex justify-center flex-col rounded-xl border-2 border-stone-900 shadow-lg h-[390px] hover:shadow-white">
                <a className="self-center m-[10%] text-center text-white text-[20px]"><b>{film.film.title}</b><br/><br/>
                    {GetLang().Approve_remove_from_playlist}
                </a>
                <div className="flex flex-row justify-around mt-10 font-bold">
                    <button onClick={getBack}
                            className="bg-red-600 w-[40%] hover:border-2 border-white hover:bg-red-500 rounded-xl text-[20px]">{GetLang().No}
                    </button>
                    <button onClick={Delete}
                        className="bg-blue-600 w-[40%] hover:border-2 border-white hover:bg-blue-500  rounded-xl  text-[20px]">{GetLang().Yes}
                    </button>
                </div>

            </div>
        </div>
    )

    function tryDelete() {
        //@ts-ignore
        document.getElementById("back" + id).style.visibility = "visible"
        //@ts-ignore
        document.getElementById("back" + id).style.width = "260px"
        //@ts-ignore
        document.getElementById("front" + id).style.visibility = "collapse"
        //@ts-ignore
        document.getElementById("front" + id).style.width = "0px"
        //@ts-ignore
        document.getElementById("svg" + id).style.visibility = "collapse"
        //@ts-ignore
        document.getElementById("svg" + id).style.width = "0px"
    }

    function getBack() {
        //@ts-ignore
        document.getElementById("back" + id).style.visibility = "collapse"
        //@ts-ignore
        document.getElementById("back" + id).style.width = "0px"
        //@ts-ignore
        document.getElementById("front" + id).style.visibility = "visible"
        //@ts-ignore
        document.getElementById("front" + id).style.width = "260px"
        //@ts-ignore
        document.getElementById("svg" + id).style.visibility = "visible"
        //@ts-ignore
        document.getElementById("svg" + id).style.width = "40px"
    }

    function Delete() {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            let formdata = new FormData()
            formdata.append("title", playlist.title)
            formdata.append("user_id", playlist.user_id)
            playlist.films.map((f:any, i:number)=>{
                if (f.url!=film.film.url) {
                    formdata.append('films',  f.url.split("/")[4])
                }
            })
            axios.put("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/"+playlist.pk+"/update/", formdata, config)
                .then()
        }
    }
}

export default FilmInPlaylist