import {HomeHeader} from "../Components/HomeHeader";
import Not from "../Img/Not_Found.png"
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ActorInActors} from "../Components/ActorInActors";
import {ActorInFilm} from "../Components/ActorInFilm";
import {ScreenshotInFilm} from "../Components/ScreenshotInFilm";
import {Link, useNavigate, useParams} from "react-router-dom";
import {GetLang} from "../Utilities/Lang";
import {Simulate} from "react-dom/test-utils";
import blur = Simulate.blur;
import {DecodeB64} from "../Utilities/DecodeB64";
import {ReviewsInFilms} from "../Components/ReviewsInFilms";
import {CheckJWT} from "../Utilities/CheckJWT";

interface Comment {
    Id: number;
    FilmId: number;
    Text: string;
    UserId: number;
    CreatedAt: {
        seconds: number;
        nanos: number;
    };
    UpdatedAt: {
        seconds: number;
        nanos: number;
    };
    AvatarLink: string;
    Username: string;
}

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
    content_rating: number;
    imdb_rating: string;
    studio: string;
    screenshots: {
        file: string;
        compressed_file: string;
    }[];
}

let tools = (<></>);
let c = 0;

export function Film() {
    const {id} = useParams()
    const [isReview, setIsReview] = useState(true);
    const [comments, setComments] = useState<Comment[]>();
    const [comment, setComment] = useState("");
    const [film, setFilm] = useState<Film | null>(null);
    const nav = useNavigate()
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    let maxLength = 500;
    if (CheckJWT() > 0)
        nav("/sign_in")
    if (DecodeB64(localStorage["jwt"]).userType == "premium") {
        maxLength = 2000;
    }
    if (DecodeB64(localStorage["jwt"]).userType == "admin" && c == 0) {
        c++
        maxLength = 2000;
        tools = (
            <>
                <button onClick={() => {
                }}
                        className={"w-1/3 bg-red-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-red-600 hover:border-red-800"}>
                    {GetLang().Delete}
                </button>
                <button onClick={() => {
                }}
                        className={"w-1/3 bg-amber-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-amber-600 hover:border-amber-800"}>
                    {GetLang().Edit}
                </button>
            </>
        )
    }

    function Add_Review() {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/add", {
                filmId: Number(id),
                text: comment,
                commentType: "public"
            }, config)
        }
    }

    function Add_Note() {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/add", {
                filmId: Number(id),
                text: comment,
                commentType: "private"
            }, config)
        }
    }

    useEffect(() => {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            let buttonR = document.getElementById("review_add");
            let buttonN = document.getElementById("note_add");
            if (!isReview && buttonN && buttonR) {
                buttonN.style.display = "block";
                buttonR.style.display = "none";
            } else if (buttonN && buttonR) {
                buttonN.style.display = "none";
                buttonR.style.display = "block";
            }
            if (isReview) {
                axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/get-public?filmId=${id}&page=1&amount=3&resp_amount=0`, config)
                    .then(res => {
                        setComments(res.data.comments);
                    }, err => {
                        console.log(err.response);
                    })
            } else {
                axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/get-private?filmId=${id}&page=1&amount=1`, config)
                    .then(res => {
                        setComments(undefined);
                        setComments(res.data.comments.map((comment: Comment) => ({
                            ...comment,
                            Username: comment.Username || DecodeB64(localStorage["jwt"]).username,
                            AvatarLink: comment.AvatarLink || (document.getElementById("ProfileImg") as HTMLImageElement).src
                        })));
                    }, err => {
                        console.log(err.response);
                    })
            }
            axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/${id}/`, config)
                .then(res => {
                    setFilm(res.data);
                }, err => {
                    console.log(err.response);
                });
        }
    }, [isReview]);

    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(255, 130, 0, 1), rgba(255, 130, 0, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className={"min-h-screen h-auto flex flex-col pb-10 text-white bg-neutral-800"}>
            <HomeHeader/>
            <div style={{borderWidth: 2, borderImageSlice: 1, borderColor: ""}}
                 className=" pb-[100px] md:w-4/5 w-[100%] self-center h-auto mt-[20%] md:mt-[5%] rounded-xl px-4 flex flex-col bg-neutral-700">
                <div className={"flex w-full  my-2 self-center flex-row"}>
                    <div className={"flex w-[100%] flex-col"}>
                        <div className={"flex flex-row mt-8 ml-5"}>
                            <div style={{fontFamily: "sans-serif", fontWeight: "bold"}}
                                 className={"text-[40px] mx-5 w-full "}>
                                {film?.title}
                            </div>
                            <div className={"w-96 flex h-2/3 self-center justify-end"}>
                                {tools}
                                <button
                                    className={"w-1/2  bg-green-700 font-semibold border-neutral-400 hover:bg-green-600 rounded-sm border-2 hover:border-2 hover:border-green-800"}>
                                    {GetLang().Add_to_playlist}
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-row mt-[50px]"}>
                            <div className={"p-1 rounded-xl pl-10"}>
                                <img className={"rounded-xl  w-[500px]"} src={film?.poster_file}/>
                            </div>
                            <div className={"mx-5 p-3 w-full text-[24px]"}>
                                <p className="pt-0"><b>{GetLang().Genres}:</b> {film?.genres.map(genre => genre.title).join(', ')}
                                </p>
                                <p className="pt-3"><b>{GetLang().Release_date}:</b> {film?.release_date}</p>
                                <p className="pt-3"><b>{GetLang().Country}:</b> {film?.country}</p>
                                <p className="pt-3"><b>{GetLang().Rating}:</b> {film?.rating}</p>
                                <p className="pt-3"><b>{GetLang().IMDb_rating}:</b> {film?.imdb_rating}</p>
                                <p className="pt-3"><b>{GetLang().Director}:</b> {film?.director}</p>
                                <p className="pt-3"><b>{GetLang().Studio}:</b> {film?.studio}</p>
                                <p className="pt-3"><b>{GetLang().Age_restriction}:</b> {film?.content_rating}</p>
                                <p className="pt-3"><b>{GetLang().Description}:</b> {film?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"flex w-full my-2 self-center flex-col"}>
                    <div
                        // style={{backgroundImage:`url(${KinoLenta})`, backdropFilter:"blur(10px)"}}
                        className={"flex justify-center flex-row mt-[40px]  "}>
                        {
                            film?.screenshots.map(screenshot => {
                                return <>
                                    <ScreenshotInFilm screenshot={screenshot}/>
                                </>
                            })
                        }</div>
                </div>
                <div className={"flex w-full  my-2 self-center flex-col"}>
                    <div className={"text-[42px] mt-[40px] text-center"}>{GetLang().The_cast}</div>
                    <div className={"flex flex-row justify-center mt-[40px]"}>
                        {
                            film?.actors.map(actor => {
                                return <>
                                    <ActorInFilm actor={actor}/>
                                </>
                            })
                        }</div>
                </div>

                <div className={"flex w-11/12 mt-[40px] h-auto self-center bg-stone-600 flex-col"}>
                    <div className={"border-b-white border-b-2 w-full"}>
                        <button id="reviews" onClick={() => setIsReview(true)}
                                style={{backgroundColor: "rgb(31 41 55)"}}
                                className={" text-[20px] px-5 py-2 "}>
                            {GetLang().Reviews}
                        </button>
                        <button id="my_notes" onClick={() => setIsReview(false)}
                                style={{backgroundColor: "rgb(62 82 110)"}}
                                className={"text-[20px] px-5 py-2 "}>
                            {GetLang().My_notes}
                        </button>
                    </div>
                    <div className={"m-4 flex flex-row"}>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500}
                                  className={"w-full h-40 ring-slate-700 text-black block text-xl rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 "}/>
                        <div className={"w-[20%]"}>
                            <button id={"review_add"} onClick={Add_Review}
                                    className={"m-4 bg-black h-[40px] rounded-xl w-[140px]"}>
                                {GetLang().Add_public_review}
                            </button>
                            <button id={"note_add"} onClick={Add_Note}
                                    className={"m-4 bg-black h-[40px] rounded-xl w-[140px]"}>
                                {GetLang().Add_private_note}
                            </button>
                        </div>
                    </div>
                    <div>
                        {comments?.map(comment => {
                            return <>
                                <ReviewsInFilms comment={comment}/>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}