import React from "react";
import "../App.css";
import Acc from '../Img/Account.png';
import Eng from "../Img/EngLang.png";
import Ukr from "../Img/UkrLang.png";
import {Link} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
//let lang=GetLang();
export function HomeHeader() {

    return (
        <div className="bg-neutral-800 flex flex-row space-x-5 w-full items-center justify-between" >
            <a className="self-center pl-6 text-2xl font-bold text-white select-none italic ">
                Cinotes
            </a>
            <div className={"flex flex-row w-full items-center justify-between"}>
                <div className="flex w-1/2">
                    <Link className={"flex flex-grow"} to={"/"}>
                        <div className="hover:bg-sky-900 h-20 rounded-lg py-7 flex self-center flex-grow justify-center text-white  cursor-pointer">
                            {GetLang().Home}
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/films"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            {GetLang().Films}
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/playlists"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            {GetLang().Playlists}
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/actors"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            {GetLang().Actors}
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/prem"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            {GetLang().Premium}
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col overflow-hidden rounded-xl">
                    <img
                        onClick={(e)=>UseEng(e.currentTarget)}
                        id="1" className="h-5 w-8" alt={"Set another lang?"} src={Eng}/>
                    <img
                        onClick={(e)=>UseUkr(e.currentTarget)}
                        id="2" className="h-5 w-8" alt={"Set another lang?"} src={Ukr}/>
                </div>
                <div className="hover:bg-neutral-900 bg-stone-900 my-1 flex flex-col w-20 border-2 border-gray-800 rounded-xl mr-2 text-white hover:text-sky-500 hover:border-sky-900 cursor-pointer select-none">
                    <img className=" w-7 h-7 mt-1 bg-cover bg-repeat self-center " alt={"Profile_Pic"} src={Acc}></img>
                    <a href={"/sign_in"} className="text-sm self-center text-center">{GetLang().Log_in}</a>
                </div>
            </div>
        </div>
    );
}


function UseEng(e:HTMLImageElement){
    e.style.filter="brightness(1.25)";
    //e.style.filter.

    // @ts-ignore
    document.getElementById("2").style.filter="brightness(0.5)";
    SetLang(1);

}
function UseUkr(e:HTMLImageElement){
    e.style.filter="brightness(1.25)";
    // @ts-ignore
    document.getElementById("1").style.filter="brightness(0.5)";
    SetLang(2);
}