import {GetLang} from "../Utilities/Lang";
import DropdownWithSearch from "./DropdownWithSearch";
import React, {useEffect, useState} from "react";
import axios from "axios";

export function ActorEdit(actor: any) {
    const [filmsOptions, setFilmOptions] = useState<{ url: string; title: string; }[]>([]);
    const [film, setFilm] = useState("");
    const [films, setFilms] = useState<{ url: string; title: string; }[]>([]);
    const [actorName, setActorName] = useState(actor.actor.name.toString());
    const [birth, setBirth] = useState(actor.actor.birth_date);
    const [death, setDeath] = useState(actor.actor.death_date);
    const [actorDescription, setActorDescription] = useState(actor.actor.description);
    const [actorPhoto, setActorPhoto] = useState("");
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    useEffect(()=>{axios.get("https://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/films/?page_size=200", config)
        .then(res => {
            setFilmOptions(res.data.results.map((film: { url: any; title: any; }) => ({
                url: film.url.match(/\/films\/(\d+)\//)[1],
                title: film.title,
            })));})},[])

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
    const Add_Actor = () => {
        let data = new FormData();
        if(actorName) data.append("name", actorName);
        if(birth) data.append("birth_date",birth);
        if(death) data.append("death_date",death);
        if(actorDescription) data.append("description",actorDescription);
        if(actorPhoto) data.append("photo_file",actorPhoto);
        if(films.length!=0) { // @ts-ignore
            data.append("films",films.map(item => Number(item.url)));
        }
        axios.patch(`https://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/actors/${actor.actor.pk}/update/`,data, config);
    }
    return (
        <>
            <div className={"fixed mt-[8%] ml-[20%] w-3/5 bg-gray-900"}>
                <div className={"text-white flex space-y-2 flex-col"}>
                    <p>{GetLang().Name}</p>
                    <input className="bg-slate-700 px-4 py-2 rounded-md"
                           value={actorName}
                           onChange={(e) => setActorName(e.target.value)}
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
                            className="bg-gray-600 px-4 py-2 rounded-md">Save_Changes</button>
                </div>
            </div>
        </>
    )
}