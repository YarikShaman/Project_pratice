import React, {useState} from 'react';
import '../App.css';
import {Link, Navigate} from "react-router-dom";
import logo from "../Img/logo.png";
import axios from "axios";
import {DecodeB64} from "../Utilities/DecodeB64";
import {useNavigate} from "react-router-dom";
import {GetLang, SetLang} from "../Utilities/Lang";
import {CheckPas} from "../Utilities/CheckPas";

function PRec() {

    const [errorCode, setErrorCode] = useState("");
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const nav = useNavigate()

    const [code, setCode] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");


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
                        {GetLang().Password_recovery}
                    </h2>
                </div>


                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">

                    <label className="block text-sm font-medium leading-6 text-white">
                        {GetLang().Email}
                    </label>
                    <a className="text-neutral-300 mt-2 p-1.5 pl-2 block w-full bg-slate-800 rounded select-none">{localStorage["email"]}</a>

                    <div className="block flex mt-10 flex-row w-full justify-between">
                        <a className="text-white font-semibold">{GetLang().Sent_code_text_1}<br/> {GetLang().Sent_code_text_2}</a>
                        <button
                            id="resend_but"
                            onClick={() => {
                                axios.post("https://back.cintoes.link/recover/send", {
                                    email: localStorage["email"]
                                }).then(res => {
                                    alert(GetLang().Email_successfully_resent);
                                }, err => {
                                    console.log(err.response.status);
                                    switch (err.response.status) {
                                        case 404:
                                            alert(GetLang().No_such_email);
                                            break;
                                        case 500:
                                            alert(GetLang().Server_do_not_response);
                                            break;
                                    }
                                });
                            }}
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm h-2/3 self-center font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-indigo-600">
                            {GetLang().Resend_code}
                        </button>
                    </div>

                    <div className="flex flex-row mt-14 justify-center space-x-10">
                        <label htmlFor="login" className="self-center text-2xl font-medium leading-6 text-white">
                            {GetLang().Code}
                        </label>
                        <div className="mt-2 flex flex-row">
                            <input onChange={(e) => {
                                e.target.value = e.target.value.slice(0, 5)
                                setCode(e.target.value)
                            }}
                                   style={{letterSpacing: "10px"}}
                                //id="login"
                                //name="login"
                                //type="text"
                                   maxLength={5}
                                   required
                                   className="bg-slate-800 text-center ring-slate-700 text-2xl text-white block w-full rounded-md border-0 py-1.5  shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                            />
                            <a id="star" style={{color: "rgb(255, 255, 0)"}} className=" text-[40px] ml-4 ">*</a>
                        </div>

                    </div>
                    <div id="errorCode" style={{color: "rgb(185 28 28)"}}
                         className={"w-full text-center"}>{errorCode}</div>
                    <button
                        id="conf_but"
                        onClick={(e) => {
                            axios.post("https://back.cintoes.link/recover/check", {
                                email: localStorage["email"],
                                code: Number(code)
                            }).then(res => {
                                console.log(res)
                                //@ts-ignore
                                document.getElementById("errorCode").style.color = "green"
                                setErrorCode(GetLang().Code_confirmed);
                                //@ts-ignore
                                document.getElementById("conf_but").disabled = true;
                                //@ts-ignore
                                document.getElementById("conf_but").style.backgroundColor = "rgb(30,30,116)";
                                //@ts-ignore
                                document.getElementById("resend_but").style.visibility = "hidden"
                                //@ts-ignore
                                document.getElementById("star").style.color = "green"
                                localStorage["jwt_rec"] = res.data.jwt
                                console.log(localStorage["jwt_rec"])
                            }, err => {
                                console.log(err.response.status);
                                switch (err.response.status) {
                                    case 404:
                                        setErrorCode(GetLang().No_such_email);
                                        break;
                                    case 417:
                                        setErrorCode(GetLang().Wrong_code);
                                        break;
                                    case 500:
                                        setErrorCode(GetLang().Server_do_not_response);
                                        break;
                                }
                            });
                        }}
                        className="flex w-full mt-14 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {GetLang().Confirm_code}
                    </button>

                    <div id="passes" className="mt-16">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().New_password}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => {
                                setPassword1(e.target.value)
                                if (CheckPas(password1).code===0)
                                    setError1("")
                            }}
                                   id="pass1"
                                   className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className={"text-red-700"}>{error1}</div>
                        <div className="flex mt-6 items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                {GetLang().Repeat_new_password}
                            </label>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => {
                                setPassword2(e.target.value)
                                if (password1===password2)
                                    setError2("")
                            }}
                                   id="pass2"
                                   className="bg-slate-800 ring-slate-700 text-white block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className={"text-red-700"}>{error2}</div>
                    </div>

                    <div id="set_but">
                        <button
                            onClick={() => {
                                setError1(CheckPas(password1).res)
                                if (password2 != password1)
                                    setError2(GetLang().Wrong_repeat)
                                else {
                                    setError2("")
                                    if (CheckPas(password1).code === 0) {
                                        const config = {headers: {Authorization: "Bearer " + localStorage["jwt_rec"]}};
                                        axios.post("https://back.cintoes.link/recover/change", {
                                            password: password1
                                        }, config).then(res => {
                                            alert(GetLang().Password_successfully_changed);
                                            nav("/sign_in")
                                        }, err => {
                                            console.log(err.response);
                                            switch (err.response.status) {
                                                case 400:
                                                    setError1(GetLang().Password_validation_error);
                                                    break;
                                                case 500:
                                                    setError1(GetLang().Server_do_not_response);
                                                    break;
                                            }
                                        });
                                    }
                                }

                            }}
                            className="flex w-full mt-14 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {GetLang().Set_new_password}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default PRec;