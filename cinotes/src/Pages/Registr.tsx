import React from 'react';
import '../App.css';
import logo from '../Img/logo.png';
import {Link} from "react-router-dom";
import {ReactComponent as F_logo} from "../Img/F_Logo.svg";
import {ReactComponent as G_logo} from "../Img/G_Logo.svg";

function Registr() {
    return (
        <>
            <div className="">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm text-white">
                    <Link to={"/"}>
                        <img
                        className="mx-auto h-20 w-auto"
                        src={logo}
                        alt="Cinotes"/>
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-white">
                                Login
                            </label>
                            <div className="mt-2">
                                <input
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
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                             <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                             </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password-repeat" className="block text-sm font-medium leading-6 text-white">
                                Repeat the password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password-repeat"
                                    name="password-repeat"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 mb-5 text-center text-sm text-gray-500">
                        Already have account?{' '}
                        <a href="/sign_in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in!
                        </a>
                    </p>
                    <span className={"space-x-3"}>
                        <a className={"flex-1 w-1/2 justify-center rounded-md bg-white px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}><G_logo className={"mr-2 w-6 h-auto inline"} />Sign up with Google</a>
                        <a className={"flex-1 w-1/2 justify-center rounded-md bg-white px-2 py-2 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}><F_logo className={"mr-2 w-6 h-auto inline"} />Sign up with Facebook</a>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Registr;