import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
function AA(){
    //FilmInFilms();
    return(
        <>
            f
        </>
    )
}


// async function AddFilms(){
//     const resp = await axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/3/",
//         {headers: {Authorization:"Bearer "+ localStorage["jwt"]}
//         });
//
//     return (
//         <>
//             <FilmInFilms film={resp.data}/>
//         </>
//     )
// }

export function Films() {

    const [films, setFilms]= useState([]);
    const [next, setNext] = useState("adsf");

    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization:"Bearer "+ localStorage["jwt"]}};
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films", config)
            .then(res => {
                if (!ignore) {
                    setFilms(res.data.results);
                }
            });
        return () => {
            ignore = true;
        }
    }, []);

    return (
        <div className="min-h-screen flex bg-neutral-700">
            <HomeHeader/>

            <div id={"side"} className="z-10 w-1/5 p-2 h-full fixed bg-gray-800 pt-20 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">
                <div className="md:w-full mt-5 flex flex-nowrap h-10">
                    <input className="w-3/4 ring-slate-700 text-white block rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={"text"}/>
                    <button className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"submit"}>Search</button>
                </div>
                <div className={"text-white"}>
                    <p className={"text-center text-xl m-8"}>Filtration</p>
                    <p className={"m-2"}>Date <input className={"w-full"}  type="range" step="1" min="1940" max="2023" value="2000" id="myRange"/></p>
                    <p className={"m-2"}>Genre</p>
                    <p className={"m-2"}>Country</p>
                    <p className={"text-center text-xl m-8"}>Sorting</p>
                    <input className={"m-1"} name={"sortBy"} type={"radio"} value={"date"}/><label className={"m-2"}>By Date</label><br/>
                    <input className={"m-1"} name={"sortBy"} type={"radio"} value={"imdbRate"}/><label className={"m-2"}>By IMDb rating</label><br/>
                    <input className={"m-1"} name={"sortBy"} type={"radio"} value={"rate"}/><label className={"m-2"}>By user rating</label><br/>
                    <input className={"m-1"} name={"sortBy"} type={"radio"} value={"num"}/><label className={"m-2"}>By number of ratings</label><br/>
                    <hr/>
                    <input className={"m-1"} name={"sort"} type={"radio"} value={"as"}/><label className={"m-2"}>Ascending</label><br/>
                    <input className={"m-1"} name={"sort"} type={"radio"} value={"des"}/><label className={"m-2"}>Descending</label><br/>
                    <hr/>
                    <button className={"w-1/2 mt-8 rounded-md bg-indigo-600 px-3 py-1.5 mx-auto relative left-1/4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Filtrate</button>
                    <button onClick={() => hideMenu()} className={"md:hidden fixed right-0 bottom-0 rounded-full bg-gray-700 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search</button>
                </div>
            </div>
            <button onClick={() => sideMenu()} className={"md:hidden fixed right-0 bottom-0 rounded-full bg-slate-800 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search</button>
            <div className="flex flex-row md:ml-96 pt-20 h-auto w-auto flex-wrap">
                {
                    films.map(film => {
                        return <>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                            <FilmInFilms film={film}/>
                        </>
                    })
                }
            </div>

        </div>
    );
    function sideMenu(){
        let side = document.getElementById("side");
        // @ts-ignore
        side.style.display = "block"; side.style.width = "100%";
    }
    function hideMenu(){
        let side = document.getElementById("side");
        // @ts-ignore
        side.style.display = "none";
    }
}
