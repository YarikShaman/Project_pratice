import React, {useState} from 'react';
import '../App.css';
import logo from '../Img/logo.png';
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {CheckPas} from "../Utilities/CheckPas";


function Registr() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pas1, setPas1] = useState("");
    const [pas2, setPas2] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const nav = useNavigate()
    const [errorUser, setErrorUser] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [error1, setError1] = useState("")
    const [error2, setError2] = useState("")

    function Reg(username: string, login: string, pas1: string, pas2: string) {
        setError1(CheckPas(pas1).res)
        if (pas2 != pas1)
            setError2("Wrong repeat")
        else if ((RegExp("^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{1,20}$")).test(username) != true)
            setErrorUser("Password may include only latin, numeric and special symbols(2-20 symbols)")
        else {
            setError2("")
            if (CheckPas(pas1).code == 0) {
                axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/signup", {
                    email: login,
                    username: username,
                    password: pas1
                }).then(resp => {
                    localStorage["jwt"] = resp.data.jwt;
                    axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + resp.data.jwt}})
                        .then(resp=>{
                            nav("../ver")
                        })
                        .catch(err=>{
                            switch (err.response.status) {
                                case 417:
                                    setErrorEmail(GetLang().Email_not_available);
                                    break;
                                case 500:
                                    setError2(GetLang().Account_created_without_verification);
                                    break;
                            }
                        })
                }).catch(err => {
                    switch (err.response.status) {
                        case 400:
                            setError1(GetLang().Bad_data_validation_error);
                            break;
                        case 409:
                            setErrorEmail(GetLang().Account_already_exists);
                            break;
                        case 500:
                            setError2(GetLang().Server_do_not_response);
                            break;
                    }
                });
            }
        }
    }

    return (
        <div className="flex flex-col justify-center bg-gray-900">
            <div id="main" className="bg-gray-900 min-h-screen h-full flex flex-1 flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-white">
                    <Link to={"/"}>
                        <img
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Cinotes"/>
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        {GetLang().Create_account}
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" action="#" method="POST" onSubmit={(e) => {
                        e.preventDefault();
                        Reg(username, email, pas1, pas2)
                    }}>
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Username}
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        if ((RegExp("^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{1,20}$")).test(username) != true)
                                            setErrorUser(GetLang().Password_symbols_validation)
                                        else
                                            setErrorUser("")
                                    }}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="ring-slate-700 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{errorUser}</div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Email}
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setEmail(e.target.value)
                                    setErrorEmail("")
                                }}
                                       id="email"
                                       name="email"
                                       type="email"
                                       autoComplete="email"
                                       required
                                       className="ring-slate-700 block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{errorEmail}</div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Password}
                            </label>
                            <div className="mt-2 relative">
                                <input onChange={(e) => {
                                    setPas1(e.target.value)
                                    if (CheckPas(pas1).code == 0)
                                        setError1("")
                                }}
                                       id="password"
                                       name="password"
                                       type={showPassword1 ? 'text' : 'password'}
                                       autoComplete="current-password"
                                       required
                                       className=" ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button className={"text-white  m-[1px] absolute right-0 top-0 flex items-center justify-center rounded-xl h-[34px] w-[34px] "} onClick={(e)=>{e.preventDefault(); setShowPassword1(!showPassword1)}}>
                                    {showPassword1 ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className=" w-6 h-6">
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
                            <div className={"text-red-700"}>{error1}</div>
                        </div>
                        <div>
                            <label htmlFor="password-repeat"
                                   className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Repeat_password}
                            </label>
                            <div className="mt-2 relative">
                                <input onChange={(e) => {
                                    setPas2(e.target.value)
                                    if (pas1 == pas2)
                                        setError2("")
                                }}
                                       id="password-repeat"
                                       name="password-repeat"
                                       type={showPassword2 ? 'text' : 'password'}
                                       autoComplete="current-password"
                                       required
                                       className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button className={"text-white  m-[1px] absolute right-0 top-0 flex items-center justify-center rounded-xl h-[34px] w-[34px] "} onClick={(e)=>{e.preventDefault(); setShowPassword2(!showPassword2)}}>
                                    {showPassword2 ?<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className=" w-6 h-6">
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
                            <div className={"text-red-700"}>{error2}</div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {GetLang().Register}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 mb-5 text-center text-sm text-gray-500">
                        {GetLang().Already_have_account}{' '}
                        <a href="/sign_in"
                           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {GetLang().Sign_in}!
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Registr;