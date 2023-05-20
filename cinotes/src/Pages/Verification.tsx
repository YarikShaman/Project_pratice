import React, {useState} from 'react';
import '../App.css';
import axios from "axios";

export function Ver() {
    const [code, setCode]=useState(1) ;

    function Verify(){
        const  config ={headers: {Authorization: "Bearer " + localStorage["jwt_for_ver"]}};
        console.log(code+"     code")

        axios.post("http://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/verify/check", {code:code}, config)
    }

    return (
        <div id="verif" style={{visibility:"hidden"}} className="h-full w-full min-h-screen justify-center " >
            <div className="flex-col flex p-3 self-center bg-gray-400 shadow-inner  shadow-gray-500 rounded-xl h-1/2 w-1/2">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="z-10 fixed rounded-lg hover:bg-gray-500 w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
                </svg>
                <h1 className="m-2 self-center text-3xl font-bold"> Verification</h1>
                <h1 className="mt-6 self-center text-xl font-bold w-2/3 text-center"> Confirm your e-mail. We send verification code to your e-mail. <br/>After verification registration will be finished.</h1>
                <input onChange={(e) =>{setCode(Number(e.target.value))}}  id="ver_code" maxLength={20} className="p-2 mt-10 w-1/2 text-3xl h-auto self-center"></input>
                <button onClick={() =>{Verify()}}   className="mt-10 self-center hover:bg-neutral-600 h-10 w-28 bg-neutral-500 rounded">Confirm</button>
            </div>
        </div>
    );
}