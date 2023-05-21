import React, {useState} from 'react';
import '../App.css';
import {Link, Navigate} from "react-router-dom";
import logo from "../Img/logo.png";
import axios from "axios";
import {ReactComponent as F_logo} from "../Img/F_Logo.svg";
import {ReactComponent as G_logo} from "../Img/G_Logo.svg";
import {useGoogleLogin} from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {Base64} from "js-base64";

function Author() {
    const [error, setError] = useState(String);
    const [navigate, setNavigate] = useState(false);

    function Signin(login: string, password: string) {
        console.log(Base64.decode(localStorage["jwt"].split(".")[1]).split('"')[9]);
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/signin", {
            email: login,
            password: password
        }).then(res => {
            setError("");
            localStorage["jwt"] = res.data.jwt;
            const userType = Base64.decode(res.data.jwt.split(".")[1]).split('"')[9];
            if (userType == "admin")
                return (
                    <Navigate replace to="/sign_in"/>
                )
            else if (userType == "premium")
                return (
                    <Navigate replace to="/sign_in"/>
                )
            else
                return (
                    <Navigate replace to="/sign_in"/>
                )

        }, err => {
            console.log(err.response.status);
            switch (err.response.status) {
                case 404:
                    //не зареган в базе
                    setError("No such user, please register an account or check the email");
                    break;
                case 500:
                    //Сервер не отвечает
                    setError("Server do not response, try later");
                    break;
                case 503:
                    //Сервер гугла не отвечает
                    break;
            }
        });

    }

    const signIn = useGoogleLogin({
        onSuccess: (resp) => {
            axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/google",
                {code: resp.access_token})
                .then(res => {
                    setError("");
                    const userType = Base64.decode(res.data.jwt.split(".")[1]).split('"')[9];
                    setNavigate(true);
                    if (userType == "admin")
                        return (
                            <Navigate replace to="/sign_in"/>
                        )
                    else if (userType == "premium")
                        return (
                            <Navigate replace to="/sign_in"/>
                        )
                    else
                        return (
                            <Navigate replace to="/sign_in"/>
                        )
                }, err => {
                    switch (err.response.status) {
                        case 404:
                            //Пользователя нет в базе
                            setError("No such user, please register an account");
                            break;
                        case 500:
                            //Сервер не отвечает
                            setError("Server do not response, try later");
                            break;
                        case 503:
                            //Сервер гугла не отвечает
                            setError("Google do not response, try later");
                            break;
                    }
                })
        }
    });

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");


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
                        /></Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => {
                        e.preventDefault();
                        Signin(login, password)
                    }} action="#" method="POST">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-white">
                                Login
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
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

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
                                       name="password"
                                       type="password"
                                       autoComplete="current-password"
                                       required
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{error}</div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 mb-5 text-center text-sm text-gray-500">
                        Don`t have an account?{' '}
                        <a href="/reg" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register now!
                        </a>
                    </p>
                    <span className={"flex flex-col "}>
                        <a onClick={() => signIn()}
                           className={"flex-1 self-center w-2/3 justify-center text-center rounded-md bg-white mt-2 px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}><G_logo
                            className={"mr-2 w-6 h-auto inline"}/>Sign in with Google</a>
                        <FacebookLogin
                            className="flex-1 self-center w-2/3 justify-center text-center rounded-md bg-white mt-2 px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            appId="268389395613658"
                            onSuccess={(response) => {
                                axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/facebook",
                                    {code: response.accessToken}).then(res => {
                                            setError("");
                                            localStorage["jwt"] = res.data.jwt;
                                            const userType = Base64.decode(res.data.jwt.split(".")[1]).split('"')[9];
                                            setNavigate(true);
                                            if (userType == "admin")
                                                return (
                                                    <Navigate replace to="/sign_in"/>
                                                )
                                            else if (userType == "premium")
                                                return (
                                                    <Navigate replace to="/sign_in"/>
                                                )
                                            else
                                                return (
                                                    <Navigate replace to="/sign_in"/>
                                                )

                                    }, err => {
                                        switch (err.response.status) {
                                            case 404:
                                                //Пользователя нет в базе
                                                setError("No such user, please register an account");
                                                break;
                                            case 500:
                                                //Сервер не отвечает
                                                setError("Server do not response, try later");
                                                break;
                                            case 503:
                                                //Сервер фейса не отвечает
                                                setError("Facebook do not response, try later");
                                                break;
                                        }
                                    })}}
                        ><F_logo className={"mr-2 w-6 h-auto inline"}/>Sign in with Facebook</FacebookLogin>
                    </span>
                </div>
            </div>
        </div>
    );
}


export default Author;