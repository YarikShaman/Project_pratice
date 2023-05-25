import React, {useState} from 'react';
import '../App.css';
import {Link, Navigate} from "react-router-dom";
import logo from "../Img/logo.png";
import axios from "axios";
import {ReactComponent as F_logo} from "../Img/F_Logo.svg";
import {ReactComponent as G_logo} from "../Img/G_Logo.svg";
import {useGoogleLogin} from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {DecodeB64} from "../Utilities/DecodeB64";
import {useNavigate} from "react-router-dom";

function PRec() {
    const [error, setError] = useState(String);
    const nav = useNavigate()

    function Signin(login: string, password: string) {
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/signin", {
            email: login,
            password: password
        }).then(res => {
            setError("");
            localStorage["jwt"] = res.data.jwt;
            if (DecodeB64(res.data.jwt).isVerified == "false")
                nav("/ver")
            nav("/")
        }, err => {
            console.log(err.response.status);
            switch (err.response.status) {
                case 403:
                    setError("Wrong password, try again");
                    break;
                case 404:
                    setError("No such user, please register an account or check the email");
                    break;
                case 500:
                    setError("Server do not response, try later");
                    break;
            }
        });

    }

    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");


    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-white">
                    <Link to={"/"}>
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Cinotes"
                        /></Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Password recovery
                    </h2>
                </div>


                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <label className="block text-sm font-medium leading-6 text-white">
                        E-mail
                    </label>
                    <a className="text-neutral-300 mt-2 p-1.5 pl-2 block w-full bg-slate-800 rounded select-none">{localStorage["email"]}somebody@gmail.com</a>
                    <div className="block flex mt-10 flex-row w-full justify-between">
                        <a className="text-white font-semibold">We sent verification code on<br/> your e-mail. Confirm it to continue</a>
                        <button
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm h-2/3 self-center font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-indigo-600">
                            Resend code
                        </button>
                    </div>
                    <div className="mt-5" >
                        <div className="flex flex-row mt-14 justify-center space-x-10">
                            <label htmlFor="login" className="self-center text-2xl font-medium leading-6 text-white">
                                Code
                            </label>
                            <div className="mt-2 flex flex-row">
                                <input onChange={(e) => {
                                    e.target.value=e.target.value.slice(0, 5)
                                    setCode(e.target.value)
                                }}
                                       style={{letterSpacing:"10px"}}
                                       //id="login"
                                       //name="login"
                                       //type="text"
                                       maxLength={5}
                                       required
                                       className="bg-slate-800 text-center ring-slate-700 text-2xl text-white block w-full rounded-md border-0 py-1.5  shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                />
                                <a id="star" style={{color:"rgb(255, 255, 0)"}} className=" text-[40px] ml-4 ">*</a>
                            </div>
                        </div>
                        <button
                            className="flex w-full mt-14 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Confirm code
                        </button>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                       id="password"
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{error}</div>
                        </div>

                        <div>
                            <button
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default PRec;