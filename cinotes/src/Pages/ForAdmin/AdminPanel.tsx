import React, {useEffect, useState} from 'react';
import '../../App.css';
import {HomeHeader} from "../../Components/HomeHeader";
import axios from "axios";
import DropdownWithSearch from "../../Components/DropdownWithSearch";
import {toBase64} from "js-base64";
import {useNavigate} from "react-router-dom";
import {GetLang} from "../../Utilities/Lang";
import {DecodeB64} from "../../Utilities/DecodeB64";
import {CheckJWT} from "../../Utilities/CheckJWT";
import Table from "../../Components/Table";

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
    const nav = useNavigate()
    const [isExpandedFilm, setIsExpandedFilm] = useState(false);
    const [isExpandedActor, setIsExpandedActor] = useState(false);
    const [isExpandedGenre, setIsExpandedGenre] = useState(false);
    const [isExpandedUser, setIsExpandedUser] = useState(false);
    const [users, setUsers] = useState<{ UserId: number; Email: string, UserType: string, Username: string }[]>([]);
    const [user, setUser] = useState<string>("");
    const [selectedUserType, setSelectedUserType] = useState<string>("basic");
    const [filmsOptions, setFilmOptions] = useState<{ url: string; title: string; }[]>([]);
    const [film, setFilm] = useState("");
    const [films, setFilms] = useState<{ url: string; title: string; }[]>([]);
    const [actor, setActor] = useState("");
    const [birth, setBirth] = useState("");
    const [death, setDeath] = useState("");
    const [actorDescription, setActorDescription] = useState("");
    const [actorPhoto, setActorPhoto] = useState("");
    const [title, setTitle] = useState("");
    const [poster_image, setPoster_image] = useState("");
    const [rating, setRating] = useState("");
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
    const [release_date, setRelease_date] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [age_restriction, setAge_restriction] = useState("");
    const [studio, setStudio] = useState("");
    const [screenshot, setScreenshot] = useState<{ base64string: string; name: string }>();
    const [screenshots, setScreenshots] = useState<{ base64string: string; name: string }[]>([]);
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(() => {
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        if (CheckJWT() > 0)
            nav("/sign_in")
        else {
            axios.get("https://back.cintoes.link/films/?page_size=200", config)
                .then(res => {
                    setFilmOptions(res.data.results.map((film: { url: any; title: any; }) => ({
                        url: film.url.match(/\/films\/(\d+)\//)[1],
                        title: film.title,
                    })));

                });
            axios.get("https://back.cintoes.link/films/genres/?page_size=100", config)
                .then(res => {
                    setGenreOptions(res.data.results);
                });
            axios.get("https://back.cintoes.link/admin", config)
                .then(res => {
                    setUsers(res.data.Users);
                    console.log(res.data.Users)
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
        }
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
    const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files != null && e.target.files.length != 0) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setActorPhoto(base64String);
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
            };
            arr.push(d);
        });
        axios.post("https://back.cintoes.link/films/", {
            title: title,
            genres: genres.map(({pk}) => (Number(pk))),
            actors: actors.map(({pk}) => (Number(pk))),
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
        }, config);
    }

    function Add_Actor() {
        axios.post("https://back.cintoes.link/actors/", {
            name: actor,
            photo_image: actorPhoto,
            description: actorDescription,
            birth_date: birth,
            death_date: death,
            films: films.map(item => item.url)
        }, config);
    }

    function Add_Genre() {
        axios.post("https://back.cintoes.link/films/genres/", {
            title: genreName
        }, config);
        window.location.reload();
    }

    function Change_Genre() {
        axios.put("https://back.cintoes.link/films/genres/" + selectedGenreId + "/update/", {
            title: genreName
        }, config);
        window.location.reload();
    }

    function Delete_Genre() {
        axios.delete("https://back.cintoes.link/films/genres/" + selectedGenreId + "/delete/", config);
        window.location.reload();
    }

    function Change_User() {
        // @ts-ignore
        let userid = users.find((userS) => userS.Email === user).UserId
        axios.patch("https://back.cintoes.link/admin/user-type", {
            UserId: userid,
            UserType: selectedUserType
        }, config);
        window.location.reload();
    }

    function Delete_User() {
        // @ts-ignore
        let userid = users.find((userS) => userS.Email === user).UserId
        axios.delete("https://back.cintoes.link/admin/user?user_id=" + userid, config);
        window.location.reload();
    }

    return (
        <div className="bg-neutral-700 flex flex-col min-h-screen">
            <HomeHeader/>
            <div
                className={"mt-[20%] md:mt-[5%] self-center text-white w-3/5"}>
                <div className=" text-2xl bg-gray-600 m-2 pl-[40%] rounded-xl"
                     onClick={() => setIsExpandedFilm(!isExpandedFilm)}>{GetLang().Film_addition}</div>
                {isExpandedFilm && (
                    <div className={"flex flex-col space-y-2"}>
                        <p className={"m-2"}>{GetLang().Title}</p>
                        <input
                            className="bg-slate-700 px-4 py-2 rounded-md"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <p className={"m-2"}>{GetLang().Poster_image}</p>
                        <input
                            className="bg-slate-700 px-4 py-2 rounded-md"
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
                            className="bg-slate-700 px-4 py-2 rounded-md"
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
                            className="bg-slate-700 px-4 py-2 rounded-md"
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
                    </div>)}
                <div onClick={() => setIsExpandedActor(!isExpandedActor)}
                     className={"text-2xl pl-[40%] bg-gray-600 rounded-xl m-2 text-white"}>{GetLang().Actor_addition}</div>
                {isExpandedActor && (
                    <div className={"text-white flex space-y-2 flex-col"}>
                        <p>{GetLang().Name}</p>
                        <input className="bg-slate-700 px-4 py-2 rounded-md"
                               value={actor}
                               onChange={(e) => setActor(e.target.value)}
                               type="text"/>
                        <p>{GetLang().Birth_date}</p>
                        <input className="bg-slate-700 px-4 py-2 rounded-md"
                               onChange={(e) => setBirth(e.target.value)}
                               value={birth}
                               type="date"/>
                        <p>{GetLang().Death_date}</p>
                        <input className="bg-slate-700 px-4 py-2 rounded-md"
                               onChange={(e) => setDeath(e.target.value)}
                               value={death}
                               type="date"/>
                        <p>{GetLang().Description}</p>
                        <input className="bg-slate-700 px-4 py-2 rounded-md"
                               onChange={(e) => setActorDescription(e.target.value)}
                               value={actorDescription}
                               type="text"/>
                        <p>{GetLang().Photo}</p>
                        <input className="bg-slate-700 px-4 py-2 rounded-md"
                               onChange={(e) => handleAddPhoto(e)}
                               type={"file"}
                               accept={"image/* "}/>
                        <p>{GetLang().Films}</p>
                        <DropdownWithSearch options={filmsOptions.map((film) => film.title)} onSelect={setFilm}/>
                        <button className="bg-gray-600 px-4 py-2 rounded-md" onClick={() => {
                            const foundFilm = filmsOptions.find((filmo) => filmo.title === film);
                            console.log(foundFilm)
                            if (foundFilm) {
                                setFilms([...films, foundFilm])
                            }
                        }}>{GetLang().Add_film}
                        </button>
                        <h1>{GetLang().Films_list}:</h1>
                        <ul>
                            {films?.map((value, index) => (
                                <li key={index}>{value.title}</li>
                            ))}
                        </ul>
                        <button onClick={Add_Actor}
                                className="bg-gray-600 px-4 py-2 rounded-md">{GetLang().Add_actor}</button>
                    </div>)}
                <div onClick={() => setIsExpandedGenre(!isExpandedGenre)}
                     className={"text-2xl pl-[40%] bg-gray-600 rounded-xl m-2 text-white"}>{GetLang().Genres}</div>
                {isExpandedGenre && (
                    <div className={"flex flex-row ml-[35%] relative items-stretch"}>
                        <Table data={genreOptions}/>
                        <div className="mx-5 space-y-4 flex flex-col">
                            <div>{GetLang().Genre}</div>
                            <input className="bg-slate-700 px-4 py-2 rounded-md"
                                   value={genreName}
                                   onChange={(e) => setGenreName(e.target.value)}
                                   type="text"/>
                            <button
                                className="bg-gray-600 px-4 py-2 rounded-md"
                                onClick={() => {
                                    Add_Genre()
                                }}>
                                {GetLang().Add_genre}
                            </button>
                            <div>{GetLang().Genre + " Id"}</div>
                            <select value={selectedGenreId} onChange={(e) => setSelectedGenreId(e.target.value)}
                                    className={"bg-slate-700 custom-select"}>
                                <option value="-">-</option>
                                {Object.entries(genreOptions).map(([key, genre]) => {
                                    return <option key={genre.pk} value={genre.pk}>{genre.pk}</option>;
                                })}</select>
                            <button
                                className="bg-gray-600 px-4 py-2 rounded-md"
                                onClick={() => {
                                    Change_Genre()
                                }}>
                                Change the genre
                            </button>
                            <button
                                className="bg-gray-600 px-4 py-2 rounded-md"
                                onClick={() => {
                                    Delete_Genre()
                                }}>
                                Delete the genre
                            </button>
                        </div>
                    </div>)}
                <div onClick={() => setIsExpandedUser(!isExpandedUser)}
                     className={"text-2xl pl-[40%] bg-gray-600 rounded-xl m-2 text-white"}>{GetLang().Users}</div>
                {isExpandedUser && (
                    <div>
                        <div className={"flex justify-around"}>
                            <DropdownWithSearch options={users.map((genre) => genre.Email)} onSelect={setUser}/>
                            <select value={selectedUserType} onChange={(e) => {
                                setSelectedUserType(e.target.value);
                                console.log(selectedUserType)
                            }}
                                    className={"bg-slate-700 custom-select"}>
                                <option value={"premium"}>Premium</option>
                                <option value={"basic"}>Basic</option>
                                <option value={"admin"}>Admin</option>
                            </select>
                            <button className="bg-gray-600 px-4 py-2 rounded-md" onClick={() => {
                                Change_User()
                            }}>
                                Change user type
                            </button>
                            <button className="bg-gray-600 px-4 py-2 rounded-md" onClick={() => {Delete_User()}}>
                                Delete user
                            </button>

                        </div>
                        <Table data={users}/>
                    </div>
                )}
            </div>

        </div>
    )
}