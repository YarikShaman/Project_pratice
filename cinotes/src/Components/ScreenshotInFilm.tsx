import React, {useCallback, useRef, useState} from "react";
import "../App.css";
import '../SelectWithCustomScrollbar.css';
import {GetLang, SetLang} from "../Utilities/Lang";
export function ScreenshotInFilm(screenshot:any){
    const [scale, setScale] = useState(1);
    const handleZoomIn = () => {
        setScale(scale + 0.1);
    };

    const handleZoomOut = () => {
        if (scale > 0.1) {
            setScale(scale - 0.1);
        }
    };

    return(
        <>
            <div id={screenshot.screenshot.file} style={{overflow:"auto", }}  className={"fixed bg-black divimg hidden top-[10%] h-4/5 w-4/5 left-[10%] rounded-xl border-4 border-white"}>
                <button onClick={()=>{visChange(screenshot.screenshot.file)}} className={"w-10 h-10 fixed right-[11%] bg-opacity-50 bg-black text-3xl rounded-full z-10"}>X</button>
                <img src={screenshot.screenshot.file}  style={{transform: `scale(${scale})`,pointerEvents: 'none',position: "absolute",
                    top: "0", left: "0", transformOrigin:"top left"}} className={"object-contain h-full w-full"}/>
                <button onClick={handleZoomOut} className="w-10 h-10 text-3xl bg-opacity-50 bg-black fixed rounded-full right-[48%] bottom-[13%]">
                    -
                </button>
                <button onClick={handleZoomIn} className="w-10 h-10 text-3xl bg-opacity-50 bg-black fixed rounded-full right-[52%] bottom-[13%]">
                    +
                </button>
            </div>
            <div className={"hover:bg-gray-900 flex shadow-gray-900 flex-col bg-neutral-800 rounded-xl border-2 border-stone-900 shadow-lg hover:shadow-white mx-5 my-5"}>
                <img onClick={()=>{visChange(screenshot.screenshot.file)}} className="m-1 h-44 w-72 rounded-xl object-cover border-2 border-gray-700 self-center" src={screenshot.screenshot.compressed_file}/>
            </div>
        </>
    )
}
function visChange(id:any){
    let el = document.getElementById(id);
    if(el == null) return
    console.log(el.style.display)
    if(el.style.display=="block"){
        el.style.display = "none";
    } else{
    el.style.display = "block";
    }
}