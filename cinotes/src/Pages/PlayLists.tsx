import React from 'react';
import '../App.css';
import {HomeHeader} from "../Components/HomeHeader";

export function Playlists() {
    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(79, 40, 40, 1), rgba(79, 40, 40, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            className="min-h-screen h-full w-full flex justify-center">
            <HomeHeader/>
            <div className="self-center w-5/6 min-h-screen h-full mt-[6%] bg-neutral-700  rounded-3xl border">
            Playlists
            </div>

        </div>
    );
}