import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";

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

        <div className="min-h-screen bg-neutral-800 flex justify-center">
            <HomeHeader/>
            <div
                className="w-[80%] bg-neutral-700 rounded-2xl flex-col border-2 border-white mt-[4%] self-center flex justify-center ">

                <a className="self-center text-white text-[40px] font-mono font-semibold">
                    Не знаєте щоб подивитися?<br/>
                    Тоді вам до нас!<br/>
                    У Cinotes одна з найбільших баз<br/>
                    фільмів усіх часів та країн.<br/>
                    Тут можна обрати фільм собі до душі<br/>
                    та поділитися своїми враженнями з іншими,<br/>
                    або залишити їх тільки для себе<br/>
                </a>
                <div className="flex flex-row">
                    {
                        films.nFilms?.map((film, i) => {
                            //console.log(i);
                            console.log("тут1")
                            //console.log(film)
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    {
                        films.iFilms?.map(film => {
                            // console.log("тут2")
                            //console.log(film)
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    {
                        films.rFilms?.map(film => {
                            // console.log("тут3")
                            //console.log(film)
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }
                    {/*{*/}
                    {/*    Object.values(films)?.map(val => {*/}
                    {/*        return val?.map(film => {console.log(2)*/}
                    {/*            return <FilmInFilms film={film}/>*/}
                    {/*        })*/}
                    {/*    })*/}
                    {/*}*/}
                </div>
            </div>
        </div>
    );
}

export default MainPage;