import React, {useState} from 'react';
import '../App.css';
import logo from '../Img/logo.png';
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CheckPas} from "../Utilities/CheckPas";


function Registr() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [pas1, setPas1] = useState("");
    const [pas2, setPas2] = useState("");
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
                    localStorage["jwt_for_ver"] = resp.data.jwt;
                    axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + resp.data.jwt}})
                        .then(resp=>{
                            alert("Account is successfully created")
                            nav("ver")
                        })
                        .catch(err=>{
                            switch (err.response.status) {
                                case 400:
                                    setError1("bad data (validation error)");
                                    break;
                                case 417:
                                    setErrorEmail("This email is not available");
                                    break;
                                case 500:
                                    alert("Account is successfully created, but email-verification server do not response, try to verify later");
                                    break;
                            }
                        })
                }).catch(err => {
                    switch (err.response.status) {
                        case 400:
                            setError1("bad data (validation error)");
                            break;
                        case 409:
                            setErrorEmail("Account with this e-mail is already exists");
                            break;
                        case 500:
                            alert("Server do not response, try later");
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
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        if ((RegExp("^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{1,20}$")).test(username) != true)
                                            setErrorUser("Password may include only latin, numeric and special symbols(2-20 symbols)")
                                        else
                                            setErrorUser("")
                                    }}
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{errorUser}</div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email
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
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{errorEmail}</div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setPas1(e.target.value)
                                    if (CheckPas(pas1).code == 0)
                                        setError1("")
                                }}
                                       id="password"
                                       name="password"
                                       type="password"
                                       autoComplete="current-password"
                                       required
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{error1}</div>
                        </div>
                        <div>
                            <label htmlFor="password-repeat"
                                   className="block text-sm font-medium leading-6 text-white">
                                Repeat password
                            </label>
                            <div className="mt-2">
                                <input onChange={(e) => {
                                    setPas2(e.target.value)
                                    if (pas1 == pas2)
                                        setError2("")
                                }}
                                       id="password-repeat"
                                       name="password-repeat"
                                       type="password"
                                       autoComplete="current-password"
                                       required
                                       className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className={"text-red-700"}>{error2}</div>
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
                        <a href="/sign_in"
                           className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in!
                        </a>
                    </p>
                </div>
            </div>

        </div>
    );
}

export default Registr;