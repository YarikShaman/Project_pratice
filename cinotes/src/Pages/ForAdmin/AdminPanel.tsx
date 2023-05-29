import React, {useEffect, useState} from 'react';
import '../../App.css';
import {HomeHeader} from "../../Components/HomeHeader";
import axios from "axios";
import DropdownWithSearch from "../../Components/DropdownWithSearch";
import {toBase64} from "js-base64";
import {useNavigate} from "react-router-dom";
import {DecodeB64} from "../../Utilities/DecodeB64";
interface Actor {
    pk: number;
    name: string;
    birth_date: string;
    death_date: string | null;
    description: string;
    photo_file: string;
    films: number[];
}
/*{
    'title': 'Test',
    'poster_image': base64_string,
    'rating': '10.00',
    'imdb_id': 'tt1375666',
    'genres': [3],
    'actors': [3],
    'country': 'Test',
    'release_date': '2022-03-12',
    'director': 'test director',
    'description': 'Test description',
    'age_restriction': '18',
    'studio': 'Test studio',
    'screenshots': [
    {
        "image": base64_string,
    },
    {
        "image": base64_string,
    },
]
}*/
export function APanel() {
    const nav=useNavigate()
    if (localStorage["jwt"]==undefined && DecodeB64(localStorage["jwt"].isVerified)==true)
        nav("../sign_in")
    const [filmsOptions, setFilmOptions] = useState<{ pk: string; title: string; }[]>([]);
    const [film, setFilm] = useState("");
    const [films, setFilms] = useState<{ pk: string; title: string; }[]>([]);
    const [actor, setActor] = useState("");
    const [birth, setBirth] = useState("");
    const [death, setDeath] = useState("");
    const [actorDescription, setActorDescription] = useState("");
    const [actorPhoto,setActorPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [poster_image, setPoster_image] = useState("");
    const [rating, setRating] = useState("");
    const [imdb_id, setImdb_id] = useState("");
    const [genre, setGenre] = useState("");
    const [genreOptions, setGenreOptions] = useState<{ pk: string; title: string; }[]>([]);
    const [genres, setGenres] = useState<{ pk: string; title: string; }[]>([]);
    const [actorName, setActorName] = useState("");
    const [actorsRaw, setActorsRaw] = useState<{ pk: string; name: string; photo_file: string; url: string; }[]>([]);
    const [actorsOptions, setActorsOptions] = useState<string[]>([]);
    const [actors, setActors] = useState<{ pk: string; name: string; photo_file: string; url: string; }[]>([]);
    const [country, setCountry] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [release_date, setRelease_date] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [age_restriction, setAge_restriction] = useState("");
    const [studio, setStudio] = useState("");
    const [screenshot, setScreenshot] = useState<{base64string: string; name: string}>();
    const [screenshots, setScreenshots] = useState<{base64string: string; name: string}[]>([]);
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?page_size=200", config)
                .then(res => {
                    setFilmOptions(res.data.results);
                });
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/genres/?page_size=100", config)
                .then(res => {
                    setGenreOptions(res.data.results);
                });
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/countries/?page_size=100", config)
                .then(res => {
                    setCountryOptions(res.data.countries);
                });
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/?page_size=500", config)
                .then(res => {
                    setActorsRaw(res.data.results);
                    setActorsOptions((res.data.results).map((actor: { name: any; }) => actor.name))
                });
        }
        return () => {
            ignore = true;
        };
    }, [])
    const handleAddCountry = () => {
        setCountries([...countries, country]);
        setCountry('');
    };
    const handleAddPoster = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files!=null && e.target.files.length!=0)
        {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPoster_image(base64String);
            }}}
    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files!=null && e.target.files.length!=0)
        {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setActorPhoto(base64String);
            }}}
    const handleAddScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files!=null && e.target.files.length!=0)
        {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // @ts-ignore
                setScreenshot({base64string:base64String, name:e.target.files[0].name});
            }}}
    const handleAddScreenshots = () => {
        if (screenshot) {
        setScreenshots([...screenshots, screenshot]);
        }
        setScreenshot(undefined);
    };
    function Add_Film(){
        const arr: { image: string; }[] = [];
        screenshots.map(({ base64string }) => {
            const d = {
                image: base64string,
            }
            arr.push(d);
        });
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/", {
            title: title,
            genres: genres.map(({ pk }) => ( Number(pk) )),
            actors: actors.map(({ pk }) => ( Number(pk) )),
            poster_image: poster_image,
            rating: rating,
            imdb_id: imdb_id,
            content_rating: age_restriction,
            description: description,
            release_date: release_date,
            director: director,
            studio: studio,
            country: countries.toString(),
            screenshots: arr,
        }, config)
    }
    return (
        <div className="bg-neutral-700 grid grid-cols-2 content-center gap-4 justify-items-center min-h-screen">
            <HomeHeader/>
            <div
                className={"grid grid-cols-2 col-start-1 content-start gap-4 mt-[20%] md:mt-[10%] text-white justify-items-center"}>
                <div className="col-span-2 text-2xl">Film Addition</div>
                <div className="flex flex-col w-full space-y-2">
                    <p className={"m-2"}>Title</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <p className={"m-2"}>Poster Image</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type={"file"}
                        accept={"image/* "}
                        onChange={(e) => handleAddPoster(e)}
                        placeholder="Poster image"
                    />
                    <p className={"m-2"}>Rating</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                    />
                    <p className={"m-2"}>IMDb id</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={imdb_id}
                        onChange={(e) => setImdb_id(e.target.value)}
                        placeholder="IMDb id"
                    />
                        <p className={"m-2"}>Genre</p>
                        <DropdownWithSearch options={genreOptions.map((genre)=>genre.title)} onSelect={setGenre}/>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={() => {const foundGenre = genreOptions.find((genreo) => genreo.title === genre);
                            if (foundGenre) {
                                setGenres([...genres, foundGenre])
                            }
                        }}
                    >
                        Add genre
                    </button>

                    <h1>Genres Arrey:</h1>
                    <ul>
                        {genres.map((genre, index) => (
                            <li key={index}>
                                PK: {genre.pk}, Title: {genre.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col w-full space-y-2">
                        <p className={"m-2"}>Actor</p>
                        <DropdownWithSearch options={actorsOptions} onSelect={setActorName}/>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={() => {
                            const foundActor = actorsRaw.find((actor) => actor.name === actorName);
                            if (foundActor) {
                                setActors([...actors, foundActor]);
                            }
                        }}
                    >
                        Add Actor
                    </button>

                    <h1>Actors Array:</h1>
                    <ul>
                        {actors.map((actor, index) => (
                            <li key={index}>
                                PK: {actor.pk}, Name: {actor.name}, Photo: {actor.photo_file}, URL: {actor.url}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <p className={"m-2"}>Country</p>
                    <DropdownWithSearch options={countryOptions} onSelect={setCountry}/>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddCountry}
                    >
                        Add Country
                    </button>
                    <h1>Countries Array:</h1>
                    <ul>
                        {countries?.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                    <p className={"m-2"}>Release date</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="date"
                        value={release_date}
                        onChange={(e) => setRelease_date(e.target.value)}
                        placeholder="Release date"
                    />
                    <p className={"m-2"}>Director</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        placeholder="Director"
                    />
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <p className={"m-2"}>Description</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                    <p className={"m-2"}>Age restriction</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={age_restriction}
                        onChange={(e) => setAge_restriction(e.target.value)}
                        placeholder="Age restriction"
                    />
                    <p className={"m-2"}>Studio</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={studio}
                        onChange={(e) => setStudio(e.target.value)}
                        placeholder="Studio"
                    />
                    <p className={"m-2"}>Screenshot</p>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type={"file"}
                        accept={"image/* "}
                        onChange={(e)=>{handleAddScreenshot(e)}}
                    />
                    <h1>Screenshots Array:</h1>
                    <ul>
                        {screenshots?.map((value, index) => (
                            <li key={index}>{value.name}</li>
                        ))}
                    </ul>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddScreenshots}
                    >
                        Add Screenshot
                    </button>
                </div>
                <button onClick={Add_Film} className="bg-gray-600 px-4 py-2 rounded-md">Add film</button>
            </div>
            <div className={"text-white mt-[10%]"}><div className={"text-2xl"}>Actor addiction</div>
                <p >Name</p>
                <input className="bg-slate-700 px-4 py-2 rounded-md"
                       value={actor}
                       onChange={(e) => setActor(e.target.value)}
                       type="text"/>
                <p>Birth date</p>
                <input className="bg-slate-700 px-4 py-2 rounded-md"
                       onChange={(e) => setBirth(e.target.value)}
                       value={birth}
                       type="date"/>
                <p>Death date</p>
                <input className="bg-slate-700 px-4 py-2 rounded-md"
                       onChange={(e) => setDeath(e.target.value)}
                       value={death}
                       type="date"/>
                <p>Description</p>
                <input className="bg-slate-700 px-4 py-2 rounded-md"
                       onChange={(e) => setActorDescription(e.target.value)}
                       value={actorDescription}
                       type="text"/>
                <p>Photo</p>
                <input className="bg-slate-700 px-4 py-2 rounded-md"
                       value={actorPhoto}
                       onChange={(e) => handleAddPhoto(e)}
                       type={"file"}
                       accept={"image/* "}/>
                <p>Films</p>
                <DropdownWithSearch options={filmsOptions.map((film)=>film.title)} onSelect={setFilm}/>
                <button className="bg-gray-600 px-4 py-2 rounded-md" onClick={()=>{const foundFilm = filmsOptions.find((filmo) => filmo.title === film);
                    if (foundFilm) {
                    setFilms([...films, foundFilm])
                }
                }}>Add Film</button>
                <h1>Films Array:</h1>
                <ul>
                    {films?.map((value, index) => (
                        <li key={index}>{value.title}</li>
                    ))}
                </ul>
                <button className="bg-gray-600 px-4 py-2 rounded-md">Add actor</button>
            </div>
        </div>
    )}