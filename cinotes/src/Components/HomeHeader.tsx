import React from "react";
import "../App.css";
import Acc from '../Img/Account.png';
import {Link} from "react-router-dom";
export function HomeHeader() {
    return (
        <div className="bg-neutral-800 flex flex-row space-x-5 w-full items-center justify-between" >
            <a className="self-center pl-6 text-2xl font-bold text-white select-none italic ">
                Cinotes
            </a>
            <div className={"flex flex-row w-full items-center justify-between"}>
                <div className="flex w-1/4">
                    <Link className={"flex flex-grow"} to={"/"}>
                        <div className="hover:bg-sky-900 h-20 rounded-lg py-7 flex self-center flex-grow justify-center text-white  cursor-pointer">
                            Home
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/films"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            Films
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/playlists"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            PlayLists
                        </div>
                    </Link>
                    <Link className={"flex flex-grow"} to={"/actors"}>
                        <div className="hover:bg-sky-900 rounded-lg h-20 flex py-7 self-center flex-grow justify-center text-white cursor-pointer">
                            Actors
                        </div>
                    </Link>
                </div>
                <Link to={"/sign_in"}>
                    <div className="hover:bg-neutral-900 bg-stone-900 my-1 flex flex-col w-20 border-2 border-gray-800 rounded-xl mr-2 text-white hover:text-sky-500 hover:border-sky-900 cursor-pointer select-none">
                        <img className=" w-7 h-7 mt-1 bg-cover bg-repeat self-center " alt={"Profile_Pic"} src={Acc}></img>
                        <a className="text-sm self-center text-center">Log in</a>
                    </div>
                </Link>
            </div>
        </div>
    );
}