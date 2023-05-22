import React from "react";
import "../App.css";
import {GetLang, SetLang} from "../Utilities/Lang";
export function ScreenshotInFilm(screenshot:any){
    console.log(screenshot)
    return(
        <>
            <div className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg hover:shadow-white mx-5 my-5"}>
                <img onClick={()=>{}} className="m-1 h-44 w-72 rounded-xl object-fit border-2 border-gray-700 self-center" src={screenshot.screenshot.compressed_file}/>
            </div>
        </>
    )
}