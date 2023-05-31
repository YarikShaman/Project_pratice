import React, {useState} from 'react';
import '../App.css';
import {Link, Navigate} from "react-router-dom";
import logo from "../Img/logo.png";
import axios from "axios";
import {ReactComponent as F_logo} from "../Img/F_Logo.svg";
import {ReactComponent as G_logo} from "../Img/G_Logo.svg";
import {useGoogleLogin} from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {GetLang, SetLang} from "../Utilities/Lang";
import {DecodeB64} from "../Utilities/DecodeB64";
import {useNavigate} from "react-router-dom";

function Author() {
    const [error, setError] = useState(String);
    const [navigate, setNavigate] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const nav = useNavigate()

    function Signin(login: string, password: string) {
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/signin", {
            email: login,
            password: password
        }).then(res => {
            setError("");
            localStorage["jwt"] = res.data.jwt;
            if (DecodeB64(res.data.jwt).isVerified == "false")
                axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + res.data.jwt}})
                    .then(resp => {
                        nav("../ver")
                    })
                    .catch(err => {
                        switch (err.response.status) {
                            case 400:
                                setError(GetLang().Bad_data_validation_error);
                                break;
                            case 417:
                                setError(GetLang().Email_not_available);
                                break;
                            case 500:
                                setError(GetLang().Account_created_without_verification);
                                break;
                        }
                    })
            nav("../")
        }, err => {
            console.log(err.response.status);
            switch (err.response.status) {
                case 403:
                    setError(GetLang().Wrong_password);
                    break;
                case 404:
                    setError(GetLang().No_such_user);
                    break;
                case 500:
                    setError(GetLang().Server_do_not_response);
                    break;
            }
        });

    }

    function Recovery() {
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/recover/send", {
            email: login
        }).then(res => {
            setError("");
            localStorage["email"] = login
            nav("/password_rec")
        }, err => {
            console.log(err.response.status);
            switch (err.response.status) {
                case 404:
                    setError(GetLang().No_such_email);
                    break;
                case 500:
                    setError(GetLang().Server_do_not_response);
                    break;
            }
        });
    }

    const signIn = useGoogleLogin({
        onSuccess: (resp) => {
            axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/google",
                {code: resp.access_token})
                .then(res => {
                    setError("")
                    localStorage["jwt"]=res.data.jwt
                    if (DecodeB64(res.data.jwt).isVerified == "false")
                        nav("/ver")
                    nav("/")
                }, err => {
                    switch (err.response.status) {
                        case 404:
                            setError(GetLang().No_such_user);
                            break;
                        case 500:
                            setError(GetLang().Server_do_not_response);
                            break;
                        case 503:
                            setError(GetLang().Google_do_not_response);
                            break;
                    }
                })
        }
    });



    return (
        <div id="App">
            {navigate}
            <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-white">
                    <Link to={"/"}>
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Cinotes"
                        />
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {GetLang().Sign_in_to_account}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        Signin(login, password)
                    }} action="#" method="POST">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Login}
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setLogin(e.target.value)
                                }}
                                       id="login"
                                       name="login"
                                       type="text"
                                       autoComplete="login"
                                       required
                                       className=" ring-slate-700 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                    {GetLang().Password}
                                </label>
                                <div className="text-sm">
                                    <a onClick={() => {
                                        Recovery()
                                    }} className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                        {GetLang().Forgot_password}
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2 relative">
                                <input onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                       id="password"
                                       name="password"
                                       type={showPassword ? 'text' : 'password'}
                                       autoComplete="current-password"
                                       required
                                       className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button className={"text-white  m-[1px] absolute right-0 top-0 flex items-center justify-center rounded-xl h-[34px] w-[34px] "} onClick={(e)=>{e.preventDefault(); setShowPassword(!showPassword)}}>
                                    {showPassword ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className=" w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                               strokeWidth="1.5" stroke="black" className=" w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                                        </svg>
                                    }
                                </button>
                            </div>

                            <div className={"text-red-700"}>{error}</div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {GetLang().Sign_in}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 mb-5 text-center text-sm text-gray-500">
                        {GetLang().Do_not_have_an_account}{' '}
                        <a href="/reg" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {GetLang().Register_now}
                        </a>
                    </p>
                    <span className={"flex flex-col "}>
                        <a onClick={() => signIn()}
                           className={"flex-1 self-center w-2/3 justify-center text-center rounded-md bg-white mt-2 px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}><G_logo
                            className={"mr-2 w-6 h-auto inline"}/>{GetLang().Sign_in_with_Google}</a>
                        <FacebookLogin
                            className="flex-1 self-center w-2/3 justify-center text-center rounded-md bg-white mt-2 px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            appId="268389395613658"
                            onSuccess={(response) => {
                                axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/facebook",
                                    {code: response.accessToken}).then(res => {
                                    setError("");
                                    localStorage["jwt"] = res.data.jwt;
                                    if (DecodeB64(res.data.jwt).isVerified == "false")
                                        nav("/ver")
                                    nav("/")
                                }, err => {
                                    switch (err.response.status) {
                                        case 404:
                                            setError(GetLang().No_such_user);
                                            break;
                                        case 500:
                                            setError(GetLang().Server_do_not_response);
                                            break;
                                        case 503:
                                            setError(GetLang().Facebook_do_not_response);
                                            break;
                                    }
                                })
                            }}
                        ><F_logo className={"mr-2 w-6 h-auto inline"}/>{GetLang().Sign_in_with_Facebook}</FacebookLogin>
                    </span>
                </div>
            </div>
        </div>
    );
}


export default Author;