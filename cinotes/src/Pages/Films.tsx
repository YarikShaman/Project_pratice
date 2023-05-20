import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
import '../SelectWithCustomScrollbar.css';

function AA() {
    //FilmInFilms();
    return (
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
    const [filmName, setFilmName] = useState<any>([]);
    const [selectedFDate, setSelectedFDate] = useState("");
    const [selectedSDate, setSelectedSDate] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const handleSDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        if (e.target.value == '-' || selectedValue <= Number(selectedFDate) || selectedFDate == '-') {
            setSelectedSDate(e.target.value);
        } else {
            setSelectedSDate(selectedSDate);
        }
    };

    const handleFDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        if (e.target.value == '-' || selectedValue >= Number(selectedSDate) || selectedSDate == '-') {
            setSelectedFDate(e.target.value);
        } else {
            setSelectedFDate(selectedFDate);
        }
    };
    const [films, setFilms] = useState([]);
    const [next, setNext] = useState("adsf");
    let genreOptions = ["Comedies", "Fighters", "Detectives", "Melodramas", "Thrillers", "Horrors", "Musicals", "Westerns", "Adventures", "Sports", "Fantasy", "Crime", "Dramas", "Short films", "Biography", "Military", "History", "Documentary", "Family", "Anime", "Children's", "Animation", "Fantasy", "Comics"];
    let countryOptions = ["Australia", "Austria", "Azerbaijan", "Albania", "Argentina", "Aruba", "Afghanistan", "Belgium", "Bulgaria", "Botswana", "Brazil", "Vietnam", "Vatican", "United Kingdom", "Venezuela", "Ghana", "Hong Kong", "Greece", "Georgia", "Denmark", "Egypt", "Israel", "India", "Indonesia", "Iran", "Iceland", "Spain", "Italy", "Kazakhstan", "Canada", "Kenya", "China", "Cyprus", "Colombia", "Latvia", "Lithuania", "Liechtenstein", "Luxembourg", "Macedonia", "Malta", "Morocco", "Mexico", "Monaco", "Nepal", "Netherlands", "Germany", "New Zealand", "Norway", "UAE", "Panama", "South Africa", "Peru", "South Korea", "Poland", "Portugal", "Puerto Rico", "Romania", "Saudi Arabia", "Senegal", "Serbia", "Singapore", "Slovakia", "Slovenia", "USA", "Thailand", "Taiwan", "Tunisia", "Turkey", "Hungary", "Uzbekistan", "Ukraine", "Uruguay", "Philippines", "Finland", "France", "Czech Republic", "Chile", "Switzerland", "Sweden", "Japan"];
    let dateOptions = [];
    let to = 1950;
    let from = 2023;
    for (let i = from; i >= to; i--) {
        dateOptions.push(i);
    }
    let genres = genreOptions.map((text, index) => {
        return <option key={index} value={index}>{text}</option>;
    });
    let countries = countryOptions.map((text, index) => {
        return <option key={index} value={index}>{text}</option>;
    });
    let dates = dateOptions.map((text, index) => {
        return <option key={index} value={index}>{text}</option>;
    });

    useEffect(() => {
        let ignore = false;
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
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
        <div className="min-h-screen flex flex-row bg-neutral-700">
            <HomeHeader/>

            <div id={"side"}
                 className="z-10 w-1/5 p-2 h-screen md:mt-0 mt-8 sticky bg-gray-800 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">
                <div className="md:w-full mt-2 flex flex-nowrap h-10">
                    <input
                        value={filmName}
                        onChange={(e)=>setFilmName(e.target.value)}
                        className="w-3/4 ring-slate-700 text-black block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type={"text"}/>
                    <button
                        className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        type={"submit"}>Search
                    </button>
                </div>
                <div className={"text-white"}>
                    <p className={"text-center text-xl m-3"}>Filtration</p>
                    <div className={"m-5 flex flex-row"}>
                        <p className={"m-2 w-4/12"}>Date from </p>
                        <select className={"bg-slate-700 custom-select"}
                                value={selectedFDate}
                                onChange={handleFDateChange}>
                            <option value="-">-</option>
                            {dates}</select>

                    </div>
                    <div className={"m-5 flex flex-row"}>
                        <p className={"m-2 w-4/12"}>to</p>
                        <select className={"bg-slate-700 custom-select"}
                                value={selectedSDate}
                                onChange={handleSDateChange}>
                            <option value="-">-</option>
                            {dates}</select></div>
                    <div className={"m-5 flex flex-row"}>
                        <p className={"m-2 w-4/12"}>Genre</p> <select className={"bg-slate-700 custom-select"}
                                                                      value={selectedGenre}
                                                                      onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="-">-</option>
                        {genres}</select>
                    </div>
                    <div className={"m-5 flex flex-row"}>
                        <p className={"m-2 w-4/12"}>Country</p>
                        <select className={"bg-slate-700 custom-select"} value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}>
                            <option value="-">-</option>
                            {countries}</select>
                    </div>
                    <p className={"text-center text-xl m-3"}>Sorting</p>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"date"}/><label
                    className={"m-2"}>By
                    Date</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"imdbRate"}/><label
                    className={"m-2"}>By IMDb rating</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"rate"}/><label
                    className={"m-2"}>By
                    user rating</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"num"}/><label
                    className={"m-2"}>By
                    number of ratings</label><br/>
                    <hr/>
                    <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"as"}/><label
                    className={"m-2"}>Ascending</label><br/>
                    <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"des"}/><label
                    className={"m-2"}>Descending</label><br/>
                    <hr/>
                    <button
                        className={"w-1/2 my-5 rounded-md bg-indigo-600 px-3 py-1.5 mx-auto relative left-1/4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Filtrate
                    </button>
                    <button onClick={() => hideMenu()}
                            className={"md:hidden fixed right-0 bottom-0 rounded-full bg-gray-700 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search
                    </button>
                </div>
            </div>
            <button onClick={() => sideMenu()}
                    className={"md:hidden fixed right-0 bottom-0 rounded-full bg-slate-800 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>Search
            </button>
            <div id={"films"} className="flex flex-row md:mt-16 mt-6 h-auto w-4/5 flex-wrap">
                {
                    films.map(film => {
                        return <>
                            <FilmInFilms film={film}/>
                        </>
                    })
                }
            </div>
        </div>
    );

    function sideMenu() {
        let side = document.getElementById("side");
        let films = document.getElementById("films");
        // @ts-ignore
        side.style.display = "block";
        // @ts-ignore
        side.style.width = "100%";
        // @ts-ignore
        films.style.display = "none";
    }

    function hideMenu() {
        let side = document.getElementById("side");
        let films = document.getElementById("films");
        // @ts-ignore
        side.style.display = "none";
        // @ts-ignore
        films.style.display = "flex";
    }
}
