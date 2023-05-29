import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
import logo from "../Img/logo.png"

function MainPage() {
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};

    const [films, setFilms] = useState({
        nFilms: [],
        iFilms: [],
        rFilms: [],
    })
    useEffect(() => {
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/mane-page")
            .then((res) => {
                setFilms({
                    nFilms: res.data.newFilms.results,
                    iFilms: res.data.IBMRatingFilms.results,
                    rFilms: res.data.localRatingFilms.results
                })
            })
    }, []);
    return (

        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen flex justify-center">
            <HomeHeader/>
            <div style={{background: "rgb(64 68 64)", backdropFilter: "blur(0px)"}}
                 className="w-[80%]  rounded-2xl flex-col border-2 border-white mt-[6%] self-center flex justify-center ">
                <div className="flex flex-col mt-[100px] justify-center ">
                    <img src={logo} className=" w-fit self-center h-[200px] float-right"/>
                    <a className="self-center text-white text-[40px] font-mono text-center font-semibold flex flex-col">
                        <br/>Не знаєш чого-б подивитися? Тобі до нас!<br/>
                        У Cinotes одна з найбільших баз<br/>
                        фільмів усіх часів та країн.<br/>
                        Тут можна обрати фільм собі до душі<br/>
                        та поділитися своїми враженнями з іншими,<br/>
                        або залишити їх тільки для себе<br/>
                    </a>

                </div>
                <div style={{background: "rgba(0,0,20,0.4)", backdropFilter: "blur(0px)"}}
                     className="flex md:flex-row rounded-3xl w-[88%] mt-[140px] ml-[6%] mr-[6%]  flex-wrap flex-row-reverse justify-around">
                    <div className="flex flex-row">
                        {
                            films.nFilms?.map((film, i) => {
                                return <>
                                    <FilmInFilms film={film}/>
                                </>
                            })
                        }
                    </div>
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center object-center text-white text-[40px] mr-[10%] text-center  italic">Хіти
                        серед<br/>новинок!</a>
                </div>
                <div style={{background: "repeating-linear-gradient(45deg, rgba(205, 205, 205, 1) 1px, rgba(44, 44, 44, 1) 110px, rgba(64, 64, 64, 1) 200px)"}}
                     className="flex flex-row w-[88%] self-end mt-[100px] ml-[6%] mr-[6%] flex-wrap justify-around">
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center text-white text-[40px]  text-center w-grow  italic">Найпопулярніші<br/><br/>фільми
                        за<br/><br/>версією IMDB</a>
                    {
                        films.iFilms?.map(film => {
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                </div>
                <div style={{background: "rgba(0,0,20,0.4)", backdropFilter: "blur(0px)"}}
                    className="flex md:flex-row w-[88%]  mt-[100px] ml-[6%] mr-[6%] flex-wrap justify-around flex-row-reverse">
                    {
                        films.rFilms?.map(film => {
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center text-white text-[40px]  text-center w-grow  italic">Фільми, що<br/>сподобались<br/>нашим<br/>користувачам</a>
                </div>

            </div>
        </div>
    );
}

export default MainPage;