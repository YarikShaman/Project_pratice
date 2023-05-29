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
            <div

                style={{background: "repeating-linear-gradient(45deg, rgba(65, 65, 135, 0.3) , rgba(64, 64, 64, 0.3) 250px, rgba(65, 65, 95, 0.3) 500px, rgba(64, 64, 74, 0.3) 750px, rgba(65, 65, 135, 0.3) 1000px), rgba(0,0,0,1)"}}
                 className="w-[100%] pt-[10vh] rounded-2xl flex-col border-0 border-white mt-[0%] self-center flex justify-center ">
                <div className="flex flex-col mt-[100px] w-[100%] justify-center ">
                    <img src={logo} className=" w-fit self-center h-[200px] float-right"/>
                    <div

                        className="block w-full">
                        <a className="self-center text-white text-[40px] font-mono text-center font-semibold flex flex-col">
                            <br/>Не знаєш чого-б подивитися? Тобі до нас!<br/>
                            У Cinotes одна з найбільших баз<br/>
                            фільмів усіх часів та країн.<br/>
                            Тут можна обрати фільм собі до душі<br/>
                            та поділитися своїми враженнями з іншими,<br/>
                            або залишити їх тільки для себе<br/>
                        </a>
                    </div>

                </div>
                {/*"rgba(0,0,20,0.4)", backdropFilter: "blur(0px)"*/}
                <div
                    style={{background: "rgba(205, 80, 205, 0.07)"}}
                    className="flex md:flex-row self-center border-t-[6px] border-b-[6px] w-[100%] mt-[140px] py-12 border-[rgba(0,0,0,0.4)] flex-wrap flex-row-reverse justify-around">
                    {
                        films.nFilms?.map((film, i) => {
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    <a style={{fontFamily: "fantasy"}}
                       className="self-center object-center text-white text-[40px] mr-[10%] text-center  italic">Хіти
                        серед<br/>новинок!</a>
                </div>
                {/*"repeating-linear-gradient(45deg, rgba(64, 64, 64, 1) 1px, rgba(85, 85, 135, 1) 200px)"*/}
                <div

                    style={{background: "rgba(205, 205, 5, 0.07)"}}
                    className="flex flex-row w-[100%] self-end mt-[100px] border-[rgba(0,0,0,0.4)] border-t-8 border-b-8 py-12 px-[6%] flex-wrap justify-around">
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
                <div style={{background: "rgba(5, 205, 205, 0.07)"}}
                     className="flex md:flex-row w-[100%]  my-[100px] py-12 border-[rgba(0,0,0,0.4)] border-t-8 border-b-8 flex-wrap justify-around flex-row-reverse">
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