import React, {useEffect, useState} from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";
import {FilmInFilms} from "../Components/FilmInFilms";
import axios from "axios";
import '../SelectWithCustomScrollbar.css';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;


export function Films() {
    const [isSearch, setIsSearch] = useState(false);
    const [change, setChange] = useState(false);
    const [genreOptions, setGenreOptions] = useState<{[key: string]: { pk: number; title: string }}>({} );
    const [countryOptions, setCountryOptions] = useState([]);
    const [filmName, setFilmName] = useState<any>([]);
    const [selectedFDate, setSelectedFDate] = useState("");
    const [selectedSDate, setSelectedSDate] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedPage, setSelectedPage] = useState(1);
    const [films, setFilms] = useState([]);
    const [maxPages, setMaxPages] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [sort, setSort] = useState('');
    const handleSDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value);
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
        let ignore = false;
        let order ="";
        if(sort!="" && sortBy!=""){
            order+='&order_by=';
            if(sort=="des") order+="-";
            switch (sortBy){
                case "date":
                    order+="release_date";
                    break
                case "imdbRate":
                    order+="imdb_rating";
                    break
                case "rate":
                    order+="rating";
                    break
                case "num":
                    order+="";
                    break
            }
        }
        const config = { headers: { Authorization: "Bearer " + localStorage["jwt"] } };
        let sort_type = "release_date";
        let p_size = 10;
        let genre = selectedGenre;
        if(selectedGenre=="-") genre="";
        let country = selectedCountry;
        if(selectedCountry=="-") country="";
        let page = selectedPage;
        let query = "/?release_date_after=" + selectedFDate +
            "&release_date_before=" + selectedSDate +
            "&country=" + country +
            "&genre=" + genre +
            "&order_by=" + sort_type +
            "&page_size=" + p_size.toString() +
            "&page=" + page.toString() + order;
        if(isSearch==true) {
            query="/search/?page_size=" + p_size.toString() +"&page="+ page.toString()+"&q=" + filmName;
        }
        console.log("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films" + query)
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films" + query, config)
            .then(res => {
                if (!ignore) {
                    setFilms(res.data.results);
                    setMaxPages(Math.ceil(res.data.count / p_size));
                    scrollToTop();
                }
            });
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/genres/?page_size=100", config)
            .then(res => {
                if (!ignore) {
                    setGenreOptions(res.data.results);
                }
            });
        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/countries/", config)
            .then(res => {
                if (!ignore) {
                    setCountryOptions(res.data.countries);
                }
            });
        return () => {
            ignore = true;
        };
    }, [selectedPage,change, isSearch]);
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
        <div className={"bg-neutral-700 min-h-screen pb-5 "}>
        <div className="min-h-screen flex flex-row">
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
                        type={"submit"} onClick={()=>setIsSearch(true)}>Search
                    </button>
                </div>
                <div className={"text-white"}>
                    <p className={"text-center text-xl m-3"}>Filtration</p>
                    <div className={"m-5 flex flex-row"}>
                        <p className={"m-2 w-5/12"}>Date from </p>
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
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"date"} onChange={handleSortByChange}/>
                    <label className={"m-2"}>By Date</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"imdbRate"} onChange={handleSortByChange}/>
                    <label className={"m-2"}>By IMDb rating</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"rate"} onChange={handleSortByChange}/>
                    <label className={"m-2"}>By user rating</label><br/>
                    <input className={"m-2 ml-8"} name={"sortBy"} type={"radio"} value={"num"} onChange={handleSortByChange}/>
                    <label className={"m-2"}>By number of ratings</label><br/>
                    <hr/>
                    <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"as"} onChange={handleSortChange}/>
                    <label className={"m-2"}>Ascending</label><br/>
                    <input className={"m-2 ml-8"} name={"sort"} type={"radio"} value={"des"} onChange={handleSortChange}/>
                    <label className={"m-2"}>Descending</label><br/>
                    <hr/>
                    <button onClick={()=>setChange(!change)}
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
            <div id={"films"} className="flex flex-row justify-center mt-[15%] md:mt-[4%] justify-self-center h-auto flex-wrap">
                {
                    films.map(film => {
                        return <>
                            <FilmInFilms film={film}/>
                        </>
                    })
                }

            </div>
        </div>
        <div className={"relative w-[200px] left-[53%] rounded-xl bg-slate-700 flex flex-row justify-center space-x-2 my-5 text-white"}>
            <button onClick={()=>{if(selectedPage!=1)setSelectedPage(selectedPage-1)}} className={" text-4xl pb-2"}>{"<"}</button>
            <input value={selectedPage} onChange={(e) => setSelectedPage(Number(e.target.value))} className={"w-12 text-center text-xl font-semibold bg-gray-600"} min={1} type={"number"}/>
            <p className={" text-4xl "}>/</p>
            <div className={"w-12 text-center pt-[10px] text-xl font-semibold bg-gray-600"}>{maxPages}</div>
            <button onClick={()=>{if(selectedPage!=maxPages)setSelectedPage(selectedPage+1)}} className={" text-4xl pb-2"}>{">"}</button>
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
