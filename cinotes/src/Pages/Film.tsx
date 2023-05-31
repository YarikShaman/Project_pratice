import {HomeHeader} from "../Components/HomeHeader";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {ActorInFilm} from "../Components/ActorInFilm";
import {ScreenshotInFilm} from "../Components/ScreenshotInFilm";
import {useNavigate, useParams} from "react-router-dom";
import {GetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {ReviewsInFilms} from "../Components/ReviewsInFilms";
import {CheckJWT} from "../Utilities/CheckJWT";
import {ActorEdit} from "../Components/ActorEdit";
import {FilmEdit} from "../Components/FilmEdit";

interface Comment {
    Id: number;
    FilmId: number;
    Text: string;
    LikesAmount: number;
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
    Type: string;
    IsLiked?: boolean;
}

interface Film {
    pk: number;
    title: string;
    compressed_poster_file: string;
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



export function Film() {
    const nav = useNavigate();
    if (CheckJWT() > 0) {
        //console.log("errror")
        nav("/sign_in")
    }
    const Tool = ({deleteFilm, setIsExpandedFilm, isExpandedFilm}: any) => {
        if (CheckJWT()!=1&& DecodeB64(localStorage["jwt"]).userType == "admin") {
            return (
                <>
                    <button
                        onClick={deleteFilm}
                        className={"w-1/2 bg-red-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-red-600 hover:border-red-800"}>
                        {GetLang().Delete}
                    </button>
                    <button
                        onClick={() => setIsExpandedFilm(!isExpandedFilm)}
                        className={"w-1/2  bg-amber-700 border-neutral-400 font-semibold rounded-sm border-2 hover:border-2 hover:bg-amber-600 hover:border-amber-800"}>
                        {GetLang().Edit}
                    </button>
                </>
            )
        }

        return <></>
    }
    const {id} = useParams();
    const [isReview, setIsReview] = useState(true);
    const [isState, setIsState] = useState(true);
    const [srcForPoster, setSrcForPoster] = useState("");
    const [comments, setComments] = useState<Comment[]>();
    const [comment, setComment] = useState("");
    const [commentCount, setCommentCount] = useState(3);
    const [film, setFilm] = useState<Film | null>(null);
    const [scale, setScale] = useState(1);
    const [isExpandedFilm, setIsExpandedFilm] = useState(false);
    const [dropPL, setDropPL] = useState(false)
    const [PLOptions, setPLOptions] = useState<{ title: string, url: string }[]>([])
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    let maxLength = 500;
    if (localStorage["jwt"]&& DecodeB64(localStorage["jwt"]).userType == "premium") {
        maxLength = 2000;
    }
    const deleteFilm = () => {
        axios.delete(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/${id}/delete/`, config);
        nav("../");
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
        setIsState(!isState);
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
        setIsState(!isState);
    }

    useEffect(() => {
        if (CheckJWT() > 0) {
            //console.log("errror")
            nav("/sign_in")
        }
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
                axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/get-public?filmId=${id}&page=1&amount=${commentCount}&resp_amount=0`, config)
                    .then(res => {
                        //setComments(undefined);
                        setComments(res.data.comments?.map((comment: Comment) => ({
                            ...comment,
                            Type: "public"
                        })));
                    }, err => {
                        console.log(err.response);
                    })
            } else {
                axios.get(`http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/comment/get-private?filmId=${id}&page=1&amount=10`, config)
                    .then(res => {
                        setComments(res.data.comments?.map((comment: Comment) => ({
                            ...comment,
                            Username: comment.Username || DecodeB64(localStorage["jwt"]).username,
                            AvatarLink: comment.AvatarLink || (document.getElementById("ProfileImg") as HTMLImageElement).src,
                            Type: "private"
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
    }, [isReview, isState, commentCount]);
    const handleZoomIn = () => {
        setScale(scale + 0.1);
    };

    const handleZoomOut = () => {
        if (scale > 0.1) {
            setScale(scale - 0.1);
        }
    };

    function visChange(id: any) {
        let el = document.getElementById(id);
        if (el == null) return
        if (el.style.display == "block") {
            el.style.display = "none";
        } else {
            if (film?.poster_file !== undefined)
                setSrcForPoster(film?.poster_file);
            el.style.display = "block";
        }
    }

    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(255, 130, 0, 1), rgba(255, 130, 0, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className={"min-h-screen h-auto flex flex-col pb-10 text-white bg-neutral-800"}>
            <HomeHeader/>
            {isExpandedFilm && (
                <div>
                <FilmEdit film={film}/>
                <button onClick={() =>setIsExpandedFilm(!isExpandedFilm)} className={"w-10 h-10 fixed top-[16%] right-[21%] bg-opacity-50 bg-black text-3xl rounded-full z-10"}>X</button>
                </div>
            )}
            <div id="poster"
                 className={"fixed bg-black divimg overflow-auto hidden top-[10%] h-[88%] w-2/5 left-[30%] rounded-xl border-4 border-white"}>
                <button onClick={() => {
                    visChange("poster")
                }} className={"w-10 h-10 fixed right-[31%] bg-opacity-50 bg-black text-3xl rounded-full z-10"}>X
                </button>
                <img src={srcForPoster} alt={"screenshot"} style={{
                    transform: `scale(${scale})`, pointerEvents: 'none', position: "absolute",
                    top: "0", left: "0", transformOrigin: "top left"
                }} className={"object-contain h-full w-full"}/>
                <button onClick={handleZoomOut}
                        className="w-10 h-10 text-3xl bg-opacity-50 bg-black fixed rounded-full right-[47%] bottom-[3%]">
                    -
                </button>
                <button onClick={handleZoomIn}
                        className="w-10 h-10 text-3xl bg-opacity-50 bg-black fixed rounded-full right-[51%] bottom-[3%]">
                    +
                </button>
            </div>
            <div style={{borderWidth: 2, borderImageSlice: 1, borderColor: ""}}
                 className=" pb-[100px] md:w-4/5 w-[100%] self-center h-auto mt-[20%] md:mt-[5%] rounded-xl px-4 flex flex-col bg-neutral-700">
                <div className={"flex w-full  my-2 self-center flex-row"}>
                    <div className={"flex w-[100%] flex-col"}>
                        <div className={"flex flex-row mt-8 ml-5"}>
                            <div style={{fontFamily: "sans-serif", fontWeight: "bold"}}
                                 className={"text-[40px] mx-5 w-full "}>
                                {film?.title}
                            </div>
                            <div className={"w-[600px] flex h-2/3 self-center justify-end"}>
                                <div className={"flex h-full w-[180px] self-center justify-end"}>
                                    <Tool deleteFilm={deleteFilm} setIsExpandedFilm={setIsExpandedFilm}
                                          isExpandedFilm={isExpandedFilm}/>
                                </div>
                                <button
                                    className={"bg-green-700 font-semibold border-neutral-400 hover:bg-green-600 rounded-sm border-2 hover:border-2 hover:border-green-800"}
                                    onClick={() => {
                                        if (!dropPL) {
                                            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/?user_id=" + DecodeB64(localStorage["jwt"]), config)
                                                .then((res) => {
                                                    console.log(res.data.results)
                                                    setPLOptions(res.data.results)
                                                })
                                            setDropPL(true)
                                        } else
                                            setDropPL(false)
                                    }}>
                                    {GetLang().Add_to_playlist}
                                </button>
                                {dropPL && (
                                    <div className=" mt-10 fixed">
                                        <select id="drop_pl"
                                                className="bg-slate-700 px-4 w-40 py-2 rounded-md"
                                                value=""
                                                onChange={(e) => {
                                                    if (e.target.value.length > 0) {
                                                        axios.get(e.target.value, config)
                                                            .then((res) => {
                                                                console.log(DecodeB64(localStorage["jwt"]))
                                                                let formdata = new FormData()
                                                                formdata.append("title", res.data.title)
                                                                formdata.append("user_id", DecodeB64(localStorage["jwt"]).id)
                                                                res.data.films.map((f: any, i: number) => {
                                                                    formdata.append('films', f.url.split("/")[4])
                                                                })
                                                                //@ts-ignore
                                                                formdata.append("films", id.toString())
                                                                axios.put("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/playlists/" + res.data.pk + "/update/", formdata, config)
                                                                    .then(() => {
                                                                        setDropPL(false)
                                                                    })
                                                            })
                                                    }
                                                }}
                                        >
                                            <option value="" className="text-end">x</option>
                                            {PLOptions?.map((option) => {
                                                return (
                                                    <option key={option.url} value={option.url}>
                                                        {option.title}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className={"flex flex-row mt-[50px]"}>
                            <div className={"p-1 rounded-xl pl-10"}>
                                <img onClick={() => {
                                    visChange("poster")
                                }} alt={"screenshot"} className={"rounded-xl  w-[500px]"}
                                     src={film?.compressed_poster_file}/>
                            </div>
                            <div className={"mx-5 p-3 w-full text-[24px]"}>
                                <p className="pt-0">
                                    <b>{GetLang().Genres}:</b> {film?.genres.map(genre => genre.title).join(', ')}</p>
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
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={maxLength}
                                  className={"w-full h-40 ring-slate-700 text-black block text-xl rounded-md border-0 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 "}/>
                        <div className={"w-[20%]"}>
                            <button id={"review_add"} onClick={Add_Review}
                                    className={"m-4 bg-black h-[60px] rounded-xl w-[140px]"}>
                                {GetLang().Add_public_review}
                            </button>
                            <button id={"note_add"} onClick={Add_Note}
                                    className={"m-4 bg-black h-[60px] rounded-xl w-[140px]"}>
                                {GetLang().Add_private_note}
                            </button>
                        </div>
                    </div>
                    <div className={"mb-5"}>
                        {comments?.map(commentar => {
                            return <>
                                <ReviewsInFilms onUpdateParentState={() => setIsState(!isState)} comment={commentar}
                                                pk={commentar.Id}/>
                            </>
                        })}
                        {isReview && (
                            <button className="bg-gray-800 px-4 py-2 w-[20%] ml-[40%] rounded-md" onClick={() => {
                                setCommentCount(commentCount + 3)
                            }}>Load more comments</button>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}