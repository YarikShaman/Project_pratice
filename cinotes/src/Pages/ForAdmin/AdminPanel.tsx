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
    const [title, setTitle] = useState();
    const [poster_image, setPoster_image] = useState();
    const [rating, setRating] = useState();
    const [imdb_id, setImdb_id] = useState();
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [actor, setActor] = useState("");
    const [actors, setActors] = useState<string[]>([]);
    const [country, setCountry] = useState("");
    const [countries, setCountries] = useState<string[]>([]);
    const [release_date, setRelease_date] = useState();
    const [director, setDirector] = useState();
    const [description, setDescription] = useState();
    const [age_restriction, setAge_restriction] = useState();
    const [studio, setStudio] = useState("");
    const [studios, setStudios] = useState<string[]>([]);
    const [screenshot, setScreenshot] = useState("");
    const [screenshots, setScreenshots] = useState<string[]>([]);
    const handleAddGenre = () => {
        setGenres([...genres, genre]);
        setGenre('');
    };
    const handleAddActor = () => {
        setActors([...actors, actor]);
        setActor('');
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
        <div className="bg-neutral-700 min-h-screen grid grid-cols-1 content-start gap-1 justify-items-center">
            <HomeHeader/>
            <div className={"text-white"}>Film addition</div>
            <div className={"flex flex-col text-white space-y-5"}>
                <input className={"bg-slate-700"} placeholder={"Title"}/>
                <input className={"bg-slate-700"} placeholder={"Poster image"}/>
                <input className={"bg-slate-700"} placeholder={"Rating"}/>
                <input className={"bg-slate-700"} placeholder={"Imdb id"}/>
                <input className={"bg-slate-700"} value={genre} onChange={(e)=>{setGenre(e.target.value)}} placeholder={"Genres"}/>
                <ul>
                    {genres?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <button className={"bg-gray-600"} onClick={handleAddGenre}>Add to array</button>
                <input className={"bg-slate-700"} value={actor} onChange={(e)=>{setActor(e.target.value)}} placeholder={"Actors"}/>
                <ul>
                    {actors?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <button className={"bg-gray-600"} onClick={handleAddActor}>Add to array</button>
                <input className={"bg-slate-700"} value={country} onChange={(e)=>{setCountry(e.target.value)}} placeholder={"Country"}/>
                <ul>
                    {countries?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <button className={"bg-gray-600"} onClick={handleAddCountry}>Add to array</button>
                <input className={"bg-slate-700"} placeholder={"Release date"}/>
                <input className={"bg-slate-700"} placeholder={"Director"}/>
                <input className={"bg-slate-700"} placeholder={"Description"}/>
                <input className={"bg-slate-700"} placeholder={"Age restriction"}/>
                <input className={"bg-slate-700"} value={studio} onChange={(e)=>{setStudio(e.target.value)}} placeholder={"Studio"}/>
                <ul>
                    {studios?.map((value, index) => (
                        <li key={index}>{value}</li>
                    ))}
                </ul>
                <button className={"bg-gray-600"} onClick={handleAddStudio}>Add to array</button>
                <input className={"bg-slate-700"} value={screenshot} onChange={(e)=>{setScreenshot(e.target.value)}} placeholder={"Screenshots"}/>
                <ul>
                {screenshots?.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
                </ul>
                <button className={"bg-gray-600"} onClick={handleAddScreenshot}>Add to array</button>
            </div>
        </div>
    );
}