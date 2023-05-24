import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
import logo from "../Img/logo.png"
import {FilmInPlaylist} from "../Components/FilmInPlaylist"

function MainPage() {
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};

    const [films, setFilms] = useState({
        nFilms: [],
        iFilms: [],
        rFilms: [],
    })
    useEffect(() => {
        const fetchData = async () => {
            const a = axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?release_date_after=2021&release date_before=2024&order_by=imdb&page_size=2&page=1", config);
            const b = axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?order_by=imdb_rating&page_size=2&page=1", config);
            const c = axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?order_by=rating&page_size=2&page=1", config);


            setFilms({
                nFilms: (await a).data.results,
                iFilms: (await b).data.results,
                rFilms: (await c).data.results,
            });
        }

        fetchData();
    }, []);
    return (

        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(54, 32, 54, 1), rgba(54, 32, 54, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
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
                                //console.log(i);
                                //console.log("тут1")
                                //console.log(film)
                                return <>
                                    <FilmInPlaylist film={film}/>
                                </>
                            })
                        }
                    </div>
                    {/*<FilmInFilms film={films.nFilms[0]}/>*/}
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center object-center text-white text-[40px] mr-[10%] text-center  italic">Хіти
                        серед<br/>новинок!</a>
                    {/*<FilmInFilms film={films.nFilms[1]}/>*/}
                </div>
                <div style={{
                    background: "radial-gradient(ellipse closest-side, rgba(20,20,30,0.5) 60%, transparent)",
                    backdropFilter: "blur(20px)"
                }} className="flex flex-row w-[88%] self-end mt-[100px] ml-[6%] mr-[6%] flex-wrap justify-around">
                    {/*<FilmInFilms film={films.iFilms[0]}/>*/}
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center text-white text-[40px]  text-center w-grow  italic">Найпопулярніші<br/><br/>фільми
                        за<br/><br/>версією IMDB</a>
                    {
                        films.iFilms?.map(film => {
                            // console.log("тут2")
                            //console.log(film)
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    {/*<FilmInFilms film={films.iFilms[1]}/>*/}

                </div>
                <div
                    className="flex md:flex-row w-[88%] mt-[100px] ml-[6%] mr-[6%] flex-wrap justify-around flex-row-reverse">
                    {
                        films.rFilms?.map(film => {
                            // console.log("тут3")
                            //console.log(film)
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center text-white text-[40px]  text-center w-grow  italic">Фільми, що<br/>сподобались<br/>нашим<br/>користувачам</a>
                </div>
                {/*{*/}
                {/*    Object.values(films)?.map(val => {*/}
                {/*        return val?.map(film => {console.log(2)*/}
                {/*            return <FilmInFilms film={film}/>*/}
                {/*        })*/}
                {/*    })*/}
                {/*}*/}

            </div>
        </div>
    );
}

export default MainPage;