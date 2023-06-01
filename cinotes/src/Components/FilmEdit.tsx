import {GetLang} from "../Utilities/Lang";
import DropdownWithSearch from "./DropdownWithSearch";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function FilmEdit(film: any) {
    console.log(film)
    const [title, setTitle] = useState(film.film.title);
    const [poster_image, setPoster_image] = useState("");
    const [rating, setRating] = useState(film.film.rating);
    const [imdb_id, setImdb_id] = useState("");
    const [genreName, setGenreName] = useState("");
    const [genre, setGenre] = useState("");
    const [genreOptions, setGenreOptions] = useState<{ pk: string; title: string; }[]>([]);
    const [genres, setGenres] = useState<{ pk: string; title: string; }[]>([]);
    const [selectedGenreId, setSelectedGenreId] = useState("");
    const [actorName, setActorName] = useState("");
    const [actorsRaw, setActorsRaw] = useState<{ pk: string; name: string; photo_file: string; url: string; }[]>([]);
    const [actorsOptions, setActorsOptions] = useState<string[]>([]);
    const [actors, setActors] = useState<{ pk: string; name: string; photo_file: string; url: string; }[]>([]);
    const [country, setCountry] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [release_date, setRelease_date] = useState(film.film.release_date);
    const [director, setDirector] = useState(film.film.director);
    const [description, setDescription] = useState(film.film.description);
    const [age_restriction, setAge_restriction] = useState(film.film.content_rating);
    const [studio, setStudio] = useState(film.film.studio);
    const [screenshot, setScreenshot] = useState<{ base64string: string; name: string }>();
    const [screenshots, setScreenshots] = useState<{ base64string: string; name: string }[]>([]);
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(() => {
        axios.get("https://back.cintoes.link/films/genres/?page_size=100", config)
            .then(res => {
                setGenreOptions(res.data.results);
            });
        axios.get("https://back.cintoes.link/films/countries/?page_size=100", config)
            .then(res => {
                setCountryOptions(res.data.countries);
            });
        axios.get("https://back.cintoes.link/actors/?page_size=500", config)
            .then(res => {
                setActorsRaw(res.data.results);
                setActorsOptions((res.data.results).map((actor: { name: any; }) => actor.name))
            });
    }, [])

    const handleAddCountry = () => {
        setCountries([...countries, country]);
        setCountry('');
    };
    const handleAddPoster = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null && e.target.files.length != 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPoster_image(base64String);
            }
        }
    }
    const handleAddScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null && e.target.files.length != 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // @ts-ignore
                setScreenshot({base64string: base64String, name: e.target.files[0].name});
            }
        }
    }
    const handleAddScreenshots = () => {
        if (screenshot) {
            setScreenshots([...screenshots, screenshot]);
        }
        setScreenshot(undefined);
    };

    function Add_Film() {
        const arr: { image: string; }[] = [];
        screenshots.map(({base64string}) => {
            const d = {
                image: base64string,
            }
            arr.push(d);
        });
        const formData = new FormData();
        if (title) formData.append('title', title);
        if (genres.length > 0) genres.forEach(({pk}) => {formData.append('genres', pk);});
        if (actors.length > 0) actors.forEach(({pk}) => {formData.append('actors', pk);});
        if (poster_image) formData.append('poster_image', poster_image);
        if (rating) formData.append('rating', rating);
        if (imdb_id) formData.append('imdb_id', imdb_id);
        if (age_restriction) formData.append('content_rating', age_restriction);
        if (description) formData.append('description', description);
        if (release_date) formData.append('release_date', release_date);
        if (director) formData.append('director', director);
        if (studio) formData.append('studio', studio);
        if (countries.length > 0) formData.append('country', countries.join(','));
        if (arr.length > 0) {
            arr.forEach((screenshot, index) => {
                // @ts-ignore
                return formData.append(`screenshot_${index}`, screenshot);
            });
        }
        axios.patch("https://back.cintoes.link/films/"+film.film.pk+"/update/", formData, config)
    }

    return (
        <>
            <div
                className={"flex flex-col fixed mt-[8%] ml-[20%] w-3/5 bg-gray-900 rounded-xl h-4/5 overflow-auto p-4 space-y-2"}>
                <p className={"m-2"}>{GetLang().Title}</p>
                <input
                    className="bg-slate-700  px-4 py-2 rounded-md"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <p className={"m-2"}>{GetLang().Poster_image}</p>
                <input
                    className="bg-slate-700 h-[100px] pb-10 p-4 rounded-md"
                    type={"file"}
                    accept={"image/* "}
                    onChange={(e) => handleAddPoster(e)}
                    placeholder="Poster image"
                />
                <p className={"m-2"}>{GetLang().Rating}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating"
                />
                <p className={"m-2"}>{GetLang().IMDb_id}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={imdb_id}
                    onChange={(e) => setImdb_id(e.target.value)}
                    placeholder="IMDb id"
                />
                <p className={"m-2"}>{GetLang().Genre}</p>
                <DropdownWithSearch options={genreOptions.map((genre) => genre.title)} onSelect={setGenre}/>
                <button
                    className="bg-gray-600 px-4 py-2 rounded-md"
                    onClick={() => {
                        const foundGenre = genreOptions.find((genreo) => genreo.title === genre);
                        if (foundGenre) {
                            setGenres([...genres, foundGenre])
                        }
                    }}
                >
                    {GetLang().Add_genre}
                </button>

                <h1>{GetLang().Genres_list}:</h1>
                <ul>
                    {genres.map((genre, index) => (
                        <li key={index}>
                            {GetLang().PK}: {genre.pk}, {GetLang().Title}: {genre.title}
                        </li>
                    ))}
                </ul>
                <p className={"m-2"}>{GetLang().Actor}</p>
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
                    {GetLang().Add_actor}
                </button>

                <h1>{GetLang().Actors_list}:</h1>
                <ul>
                    {actors.map((actor, index) => (
                        <li key={index}>
                            {GetLang().PK}: {actor.pk}, {GetLang().Name}: {actor.name}, {GetLang().Photo}: {actor.photo_file}, {GetLang().URL}: {actor.url}
                        </li>
                    ))}
                </ul>
                <p className={"m-2"}>{GetLang().Country}</p>
                <DropdownWithSearch options={countryOptions} onSelect={setCountry}/>
                <button
                    className="bg-gray-600 px-4 py-2 rounded-md"
                    onClick={handleAddCountry}
                >
                    {GetLang().Add_country}
                </button>
                <h1>{GetLang().Countries_list}:</h1>
                <ul>
                    {countries?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <p className={"m-2"}>{GetLang().Release_date}</p>
                <input
                    className="bg-slate-700 pb-6 p-4 rounded-md"
                    type="date"
                    value={release_date}
                    onChange={(e) => setRelease_date(e.target.value)}
                    placeholder="Release date"
                />
                <p className={"m-2"}>{GetLang().Director}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="Director"
                />
                <p className={"m-2"}>{GetLang().Description}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <p className={"m-2"}>{GetLang().Age_restriction}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={age_restriction}
                    onChange={(e) => setAge_restriction(e.target.value)}
                    placeholder="Age restriction"
                />
                <p className={"m-2"}>{GetLang().Studio}</p>
                <input
                    className="bg-slate-700 px-4 py-2 rounded-md"
                    type="text"
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)}
                    placeholder="Studio"
                />
                <p className={"m-2"}>{GetLang().Screenshot}</p>
                <input
                    className="bg-slate-700 pb-10 p-4 rounded-md"
                    type={"file"}
                    accept={"image/* "}
                    onChange={(e) => {
                        handleAddScreenshot(e)
                    }}
                />
                <h1>{GetLang().Screenshots_list}:</h1>
                <ul>
                    {screenshots?.map((value, index) => (
                        <li key={index}>{value.name}</li>
                    ))}
                </ul>
                <button
                    className="bg-gray-600 px-4 py-2 rounded-md"
                    onClick={handleAddScreenshots}
                >
                    {GetLang().Add_screenshot}
                </button>
                <button onClick={Add_Film}
                        className="bg-gray-600 px-4 py-2 rounded-md">{GetLang().Add_film}</button>
            </div>
        </>
    )
}