import React, {useEffect, useState} from 'react';
import '../../App.css';
import {HomeHeader} from "../../Components/HomeHeader";

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
    const [title, setTitle] = useState("");
    const [poster_image, setPoster_image] = useState("");
    const [rating, setRating] = useState("");
    const [imdb_id, setImdb_id] = useState("");
    const [genrePk, setGenrePk] = useState("");
    const [genreTitle, setGenreTitle] = useState("");
    const [genres, setGenres] = useState<{ pk: string; title: string; }[]>([]);
    const [actorPk, setActorPk] = useState("");
    const [actorName, setActorName] = useState("");
    const [actorPhoto, setActorPhoto] = useState("");
    const [actorUrl, setActorUrl] = useState("");
    const [actors, setActors] = useState<{ pk: string; name: string; photo: string; url: string; }[]>([]);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState<string[]>([]);
    const [release_date, setRelease_date] = useState("");
    const [director, setDirector] = useState("");
    const [description, setDescription] = useState("");
    const [age_restriction, setAge_restriction] = useState("");
    const [studio, setStudio] = useState("");
    const [studios, setStudios] = useState<string[]>([]);
    const [screenshot, setScreenshot] = useState("");
    const [screenshots, setScreenshots] = useState<string[]>([]);
    const handleAddGenre = () => {
        const genre = {
            pk: genrePk,
            title: genreTitle
        };
        setGenres([...genres, genre]);
        setGenrePk("");
        setGenreTitle("");
    }
    const handleAddActor = () => {
        const actor = {
            pk: actorPk,
            name: actorName,
            photo: actorPhoto,
            url: actorUrl
        };
        setActors([...actors, actor]);
        setActorPk("");
        setActorName("");
        setActorPhoto("");
        setActorUrl("");
    };
    const handleAddCountry = () => {
        setCountries([...countries, country]);
        setCountry('');
    };
    const handleAddStudio = () => {
        setStudios([...studios, studio]);
        setStudio('');
    };
    const handleAddScreenshot = () => {
        setScreenshots([...screenshots, screenshot]);
        setScreenshot('');
    };
    return (
        <div className="bg-neutral-700 grid grid-cols-2 content-start gap-4 justify-items-center min-h-screen">
            <HomeHeader/>
            <div className={"grid grid-cols-2 col-start-1 content-start gap-4 text-white justify-items-center"}>
                <div className="col-span-2 text-2xl">Film Addition</div>
                <div className="flex flex-col space-y-2">
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={poster_image}
                        onChange={(e) => setPoster_image(e.target.value)}
                        placeholder="Poster image"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="Rating"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={imdb_id}
                        onChange={(e) => setImdb_id(e.target.value)}
                        placeholder="IMDb id"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={genrePk}
                        onChange={(e) => setGenrePk(e.target.value)}
                        placeholder="Genre PK"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={genreTitle}
                        onChange={(e) => setGenreTitle(e.target.value)}
                        placeholder="Genre Title"
                    />
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddGenre}
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
                <div className="flex flex-col space-y-2">
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={actorPk}
                        onChange={(e) => setActorPk(e.target.value)}
                        placeholder="Actor PK"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={actorName}
                        onChange={(e) => setActorName(e.target.value)}
                        placeholder="Actor Name"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={actorPhoto}
                        onChange={(e) => setActorPhoto(e.target.value)}
                        placeholder="Actor Photo"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={actorUrl}
                        onChange={(e) => setActorUrl(e.target.value)}
                        placeholder="Actor URL"
                    />
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddActor}
                    >
                        Add Actor
                    </button>

                    <h1>Actors Array:</h1>
                    <ul>
                        {actors.map((actor, index) => (
                            <li key={index}>
                                PK: {actor.pk}, Name: {actor.name}, Photo: {actor.photo}, URL: {actor.url}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col space-y-2">
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    />
                    <h1>Countries Array:</h1>
                    <ul>
                        {countries?.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddCountry}
                    >
                        Add Country
                    </button>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={release_date}
                        onChange={(e) => setRelease_date(e.target.value)}
                        placeholder="Release date"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        placeholder="Director"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="flex flex-col space-y-2">

                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={age_restriction}
                        onChange={(e) => setAge_restriction(e.target.value)}
                        placeholder="Age restriction"
                    />
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={studio}
                        onChange={(e) => setStudio(e.target.value)}
                        placeholder="Studio"
                    />
                    <h1>Studios Array:</h1>
                    <ul>
                        {studios?.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddStudio}
                    >
                        Add Studio
                    </button>
                    <input
                        className="bg-slate-700 px-4 py-2 rounded-md"
                        type="text"
                        value={screenshot}
                        onChange={(e) => setScreenshot(e.target.value)}
                        placeholder="Screenshots"
                    />
                    <h1>Screenshots Array:</h1>
                    <ul>
                        {screenshots?.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-md"
                        onClick={handleAddScreenshot}
                    >
                        Add Screenshot
                    </button>
                </div>
            </div>
        </div>
    )
}