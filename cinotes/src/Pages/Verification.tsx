import React, {useState} from 'react';
import '../App.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import logo from "../Img/logo.png";
import {GetLang, SetLang} from "../Utilities/Lang";

export function Ver() {
    const [code, setCode] = useState(1);
    const nav = useNavigate()
    const [error, setError] = useState("")

    function Verify() {
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/check", {code: code}, config)
            .then(res => {
                nav("../sign_in")
            })
            .catch(err => {
                switch (err.response.status) {
                    case 403:
                        setError(GetLang().Wrong_code);
                        break;
                    case 500:
                        setError(GetLang().Account_created_without_verification);
                        break;
                }
            })
    }

    return (
        <div
            style={{background: "repeating-linear-gradient(45deg, rgba(255, 130, 0, 1), rgba(255, 130, 0, 1) 1px, rgba(44, 44, 44, 1) 11px, rgba(64, 64, 64, 1) 200px)"}}
            id="verif" className="h-full w-full min-h-screen flex justify-center ">
            <div
                className="flex-col flex p-3 self-center bg-[rgb(50,50,50)] self-center border-2 border-white text-white rounded-xl h-1/2 w-1/2">
                <Link to={"/"}>
                    <img
                        className="mx-auto h-20 w-auto"
                        src={logo}
                        alt="Cinotes"
                    />
                </Link>
                <h1 className="m-2 self-center text-3xl font-bold">{GetLang().Verification}</h1>
                <h1 className="mt-6 self-center text-xl font-bold w-2/3 text-center">{GetLang().Confirm_email}<br/>{GetLang().Verification_will_be_finished}</h1>
                <input onChange={(e) => {
                    setError("")
                    setCode(Number(e.target.value))
                }} id="ver_code" maxLength={20}
                       className="p-2 mt-10 w-1/2 text-3xl text-black h-auto self-center">
                </input>
                <div className={"text-red-700 self-center"}>{error}</div>
                <div className="flex flex-row self-center mt-10 justify-around block w-full mb-6">
                    <button onClick={() => {
                        Verify()
                    }} className=" self-center hover:bg-neutral-600 h-10 w-28 bg-neutral-500 rounded">
                        {GetLang().Confirm}
                    </button>
                    <button onClick={() => {
                        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + localStorage["jwt"]}})
                            .then(resp => {
                                nav("../ver")
                            })
                            .catch(err => {
                                switch (err.response.status) {
                                    case 417:
                                        setError(GetLang().Email_not_available);
                                        break;
                                    case 500:
                                        setError(GetLang().Server_do_not_response);
                                        break;
                                }
                            })
                    }} className="self-center hover:bg-neutral-600 h-10 w-28 bg-neutral-500 rounded">
                        {GetLang().Resend_code}
                    </button>
                </div>

            </div>
        </div>
    );
}