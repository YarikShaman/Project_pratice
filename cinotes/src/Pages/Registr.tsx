import React, {useState} from 'react';
import '../App.css';
import logo from '../Img/logo.png';
import {Link} from "react-router-dom";
import axios from "axios";


function Registr() {

    const [username, setUsername]=useState("") ;
    const [email, setEmail]=useState("") ;
    const [pas1, setPas1]=useState("") ;
    const [pas2, setPas2]=useState("") ;

    function Reg(username:string, login:string, pas1:string, pas2:string){
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/auth/signup", {
            email: login,
            username: username,
            password: pas1
        }).then(resp =>{
            localStorage["jwt_for_ver"] = resp.data.jwt;
            axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + resp.data.jwt}})
        });
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
                        Create a new account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-4" action="#" method="POST" onSubmit={(e) => {
                        e.preventDefault();
                        Reg(username, email, pas1, pas2)
                    }}>
                        <div>
                            <label htmlFor="login" className="block text-sm font-medium leading-6 text-white">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    onChange={(e) =>{setUsername(e.target.value)}}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
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
                                <input onChange={(e) =>{setEmail(e.target.value)}}
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
                                <input onChange={(e) =>{setPas1(e.target.value)}}
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
                                <input onChange={(e) =>{setPas2(e.target.value)}}
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
                </div>
            </div>

        </div>
    );
}

export default Registr;