import React, {useState} from 'react';
import '../App.css';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import logo from "../Img/logo.png";

export function Ver() {
    const [code, setCode] = useState(1);
    const nav = useNavigate()
    const [error, setError] = useState("")

    function Verify() {
        const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/check", {code: code}, config)
            .then(res => {
                alert("Successfully verified. Sign in with the verified email")
                nav("../account")
            })
            .catch(err => {
                switch (err.response.status) {
                    case 403:
                        setError("Wrong code");
                        break;
                    case 500:
                        alert("Account is successfully created, but email-verification server do not response, try to verify later");
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
                <h1 className="m-2 self-center text-3xl font-bold"> Verification</h1>
                <h1 className="mt-6 self-center text-xl font-bold w-2/3 text-center"> Confirm your e-mail. We send
                    verification code to your e-mail. <br/>After verification registration will be finished.</h1>
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
                        Confirm
                    </button>
                    <button onClick={() => {
                        axios.get("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/send", {headers: {Authorization: "Bearer " + localStorage["jwt"]}})
                            .then(resp => {
                                alert("Account is successfully created")
                                nav("ver")
                            })
                            .catch(err => {
                                switch (err.response.status) {
                                    case 417:
                                        alert("This email is not available");
                                        break;
                                    case 500:
                                        alert("Server do not response, try to verify later");
                                        break;
                                }
                            })
                    }} className="self-center hover:bg-neutral-600 h-10 w-28 bg-neutral-500 rounded">
                        Resend code
                    </button>
                </div>

            </div>
        </div>
    );
}