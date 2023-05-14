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

            <div className="z-10 w-1/5 p-2 h-full fixed bg-gray-800 pt-20 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">
                <div className="md:w-full mt-5 flex flex-nowrap h-10">
                    <input className="flex-1 bg-gray-400 ring-slate-700 text-white block rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type={"text"}/>
                    <button className="flex-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"button"}>Filtr</button>
                    <button className="flex-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type={"submit"}>Search</button>
                </div>
                <div>
                    <p>Date<select>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select></p>
                </div>
            </div>

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
}
