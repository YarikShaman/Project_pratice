import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
import '../CustomStyles.css';
import {Navigate, useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {CheckJWT} from "../Utilities/CheckJWT";


export function Films() {
    const nav=useNavigate()
    if (CheckJWT() > 0)
        nav("/sign_in")

    const [ignore, setIgnore] = useState(true);
    const [isSearch, setIsSearch] = useState(false);
    const [change, setChange] = useState(false);
    const [genreOptions, setGenreOptions] = useState<{ [key: string]: { pk: number; title: string } }>({});
    const [countryOptions, setCountryOptions] = useState([]);
    const [filmName, setFilmName] = useState<any>([]);
    const [selectedFDate, setSelectedFDate] = useState("-");
    const [selectedSDate, setSelectedSDate] = useState("-");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedPage, setSelectedPage] = useState(1);
    const [films, setFilms] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [sort, setSort] = useState('');
    function setCookie(name: string, value: string, hours: number) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    function getCookie(name: string) {
        const cookieName = name + "=";
        if(document.cookie==null) return "";
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
    function saveFilmNameToCookie(){
        const filmName = document.getElementById("filmName") as HTMLInputElement;
        if (filmName) setCookie("filmName", filmName.value, 30);
    }
    function saveSettingsToCookie() {
        console.log(selectedGenre)
        if (selectedFDate!="-") setCookie("selectedFDate", selectedFDate, 30);
        if (selectedSDate!="-") setCookie("selectedSDate", selectedSDate, 30);
        if (selectedGenre) setCookie("selectedGenre", selectedGenre, 30);
        if (selectedCountry) setCookie("selectedCountry", selectedCountry, 30);
    }
    function loadSettingsFromCookie() {
        if (getCookie("filmName") !== '') setFilmName(getCookie("filmName"));
        if (getCookie("selectedFDate") !== '') setSelectedFDate(getCookie("selectedFDate"));
        if (getCookie("selectedSDate") !== '') setSelectedSDate(getCookie("selectedSDate"));
        if (getCookie("selectedGenre") !== '') setSelectedGenre(getCookie("selectedGenre"));
        if (getCookie("selectedCountry") !== '') setSelectedCountry(getCookie("selectedCountry"));
        setChange(true)
    }

    const handleSDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        let fDate = document.getElementById("selectedFDate")
        if (e.target.value == '-' || selectedValue >= Number(selectedFDate) || selectedFDate == '-') {
            setSelectedSDate(e.target.value);
        } else {
            setSelectedSDate(selectedSDate);
        }
    };

    const handleFDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
        if (e.target.value == '-' || selectedValue <= Number(selectedSDate) || selectedSDate == '-') {
            setSelectedFDate(e.target.value);
        } else {
            setSelectedFDate(selectedFDate);
        }
    };
    const handleSortByChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSortBy(e.target.value);
    };
    const handleSortChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSort(e.target.value);
    };
    let dateOptions = [];
    let to = 1936;
    let from = 2023;
    for (let i = from; i >= to; i--) {
        dateOptions.push(i);
    }
    useEffect(() => {
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            if (ignore)
            loadSettingsFromCookie();
            let order = "";
            if (sort != "" && sortBy != "") {
                order += '&order_by=';
                if (sort == "des") order += "-";
                switch (sortBy) {
                    case "date":
                        order += "release_date";
                        break
                    case "imdbRate":
                        order += "imdb_rating";
                        break
                    case "rate":
                        order += "rating";
                        break
                    case "num":
                        order += "";
                        break
                }
            }
            const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
            let sort_type = "-release_date";
            let p_size = 10;
            let genre = selectedGenre;
            if (selectedGenre == "-") genre = "";
            let country = selectedCountry;
            if (selectedCountry == "-") country = "";
            let page = selectedPage;
            let query = "/?release_date_after=" + selectedFDate +
                "&release_date_before=" + selectedSDate +
                "&country=" + country +
                "&genre=" + genre +
                "&order_by=" + sort_type +
                "&page_size=" + p_size.toString() +
                "&page=" + page.toString() + order;
            if (isSearch == true) {
                query = "/search/?page_size=" + p_size.toString() + "&page=" + page.toString() + "&q=" + filmName;
            }
            axios.get("https://back.cintoes.link/films" + query, config)
                .then(res => {
                        setFilms(res.data.results);
                        setMaxPages(Math.ceil(res.data.count / p_size));
                        scrollToTop();
                });
            axios.get("https://back.cintoes.link/films/genres/?page_size=100", config)
                .then(res => {
                        setGenreOptions(res.data.results);
                });
            axios.get("https://back.cintoes.link/films/countries/", config)
                .then(res => {
                        setCountryOptions(res.data.countries);
                });
            return () => {
                setIgnore(false);
            };
        }
    }, [selectedPage, change, isSearch]);
    document.addEventListener("DOMContentLoaded", function() {
        loadSettingsFromCookie();
    });
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    let genres = Object.entries(genreOptions).map(([key, genre]) => {
        return <option key={genre.pk} value={genre.title}>{genre.title}</option>;
    });
    let countries = countryOptions.map(country => {
        return <option key={country} value={country}>{country}</option>;
    });
    let dates = dateOptions.map((text, index) => {
        return <option key={index} value={text}>{text}</option>;
    });

    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(10, 92, 44, 1), rgba(10, 92, 44, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className={"bg-neutral-700 min-h-screen pb-5 "}>
            <div className="min-h-screen flex flex-row">
                <HomeHeader/>

                <div id={"side"}
                     className="z-10 w-1/5 p-2 h-screen md:mt-0 mt-8 sticky bg-gray-800 rounded-lg drop-shadow-xl md:block hidden shadow-black shadow-md">
                    <div className="md:w-full mt-2 flex flex-nowrap h-10">
                        <input
                            value={filmName}
                            id={"filmName"}
                            onChange={(e) => setFilmName(e.target.value)}
                            className="w-3/4 ring-slate-700 text-black block rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type={"text"}/>
                        <button
                            className="w-3/12 md:1/4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type={"submit"} onClick={() => {setIsSearch(true);setChange(!change);saveFilmNameToCookie()}}>{GetLang().Search}
                        </button>
                    </div>
                    <div className={"text-white"}>
                        <p className={"text-center text-xl m-3"}>{GetLang().Filtration}</p>
                        <div className={"m-5 flex flex-row"}>
                            <p className={"m-2 w-5/12"}>{GetLang().Date_from}</p>
                            <select className={"bg-slate-700 custom-select"}
                                    id={"selectedFDate"}
                                    value={selectedFDate}
                                    onChange={handleFDateChange}>
                                <option value="-">-</option>
                                {dates}</select>

                        </div>
                        <div className={"m-5 flex flex-row"}>
                            <p className={"m-2 w-4/12"}>{GetLang().To}</p>
                            <select className={"bg-slate-700 custom-select"}
                                    value={selectedSDate}
                                    id={"selectedSDate"}
                                    onChange={handleSDateChange}>
                                <option value="-">-</option>
                                {dates}</select></div>
                        <div className={"m-5 flex flex-row"}>
                            <p className={"m-2 w-4/12"}>{GetLang().Genre}</p> <select className={"bg-slate-700 custom-select"}
                                                                          value={selectedGenre}
                                                                          onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="-">-</option>
                            {genres}</select>
                        </div>
                        <div className={"m-5 flex flex-row"}>
                            <p className={"m-2 w-4/12"}>{GetLang().Country}</p>
                            <select className={"bg-slate-700 custom-select"} value={selectedCountry}
                                    id={"selectedCountry"}
                                    onChange={(e) => setSelectedCountry(e.target.value)}>
                                <option value="-">-</option>
                                {countries}</select>
                        </div>
                        <p className={"text-center text-xl m-3"}>{GetLang().Sorting}</p>
                        <input className={"m-2 ml-8"} name={"sortBy"} id={"selectedCountry"} type={"radio"} value={"date"}
                               onChange={handleSortByChange}/>
                        <label className={"m-2"}>{GetLang().By_date}</label><br/>
                        <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"imdbRate"}
                               onChange={handleSortByChange}/>
                        <label className={"m-2"}>{GetLang().By_IMDb_rating}</label><br/>
                        <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"rate"}
                               onChange={handleSortByChange}/>
                        <label className={"m-2"}>{GetLang().By_user_rating}</label><br/>
                        <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"num"}
                               onChange={handleSortByChange}/>
                        <label className={"m-2"}>{GetLang().By_number_of_ratings}</label><br/>
                        <hr/>
                        <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"as"}
                               onChange={handleSortChange}/>
                        <label className={"m-2"}>{GetLang().Ascending}</label><br/>
                        <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"des"}
                               onChange={handleSortChange}/>
                        <label className={"m-2"}>{GetLang().Descending}</label><br/>
                        <hr/>
                        <button onClick={() => {setChange(!change);saveSettingsToCookie()}}
                                id={"filtrateButton"}
                                className={"w-1/2 my-5 rounded-md bg-indigo-600 px-3 py-1.5 mx-auto relative left-1/4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>{GetLang().Filtrate}
                        </button>
                        <button onClick={() => hideMenu()}
                                className={"md:hidden fixed right-0 bottom-0 rounded-full bg-gray-700 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>{GetLang().Search}
                        </button>
                    </div>
                </div>
                <button onClick={() => sideMenu()}
                        className={"md:hidden fixed right-0 bottom-0 rounded-full bg-slate-800 px-3 py-1.5 w-16 h-16 m-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}>{GetLang().Search}
                </button>
                <div id={"films"}
                     className="flex flex-row justify-center mt-[15%] md:mt-[4%] justify-self-center h-auto flex-wrap">
                    {
                        films.map(film => {
                            return <>
                                <FilmInFilms film={film}/>
                            </>
                        })
                    }

                </div>
            </div>
            <div
                className={"relative w-[200px] left-[53%] rounded-xl hidden bg-slate-700 md:flex flex-row justify-center space-x-2 my-5 text-white"}>
                <button onClick={() => {
                    if (selectedPage != 1) setSelectedPage(selectedPage - 1)
                }} className={" text-4xl pb-2"}>{"<"}</button>
                <input value={selectedPage} onChange={(e) => setSelectedPage(Number(e.target.value))}
                       className={"w-12 text-center text-xl font-semibold bg-gray-600"} min={1} type={"number"}/>
                <p className={" text-4xl "}>/</p>
                <div className={"w-12 text-center pt-[10px] text-xl font-semibold bg-gray-600"}>{maxPages}</div>
                <button onClick={() => {
                    if (selectedPage != maxPages) setSelectedPage(selectedPage + 1)
                }} className={" text-4xl pb-2"}>{">"}</button>
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
