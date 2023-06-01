import {Link, useNavigate} from "react-router-dom";
import logo from "../Img/logo.png";
import {GetLang} from "../Utilities/Lang";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios";
import {DecodeB64} from "../Utilities/DecodeB64";
import React, {useState} from "react";

function Payment(){
    const nav=useNavigate()
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCVV] = useState("");
    const [nameOnCard, setNameOnCard] = useState("");
    const config = {headers: {Authorization: "Bearer " + localStorage["jwt"]}};
    const handlePaymentSubmit = () => {
        if(cardNumber!="" && expirationDate!="" && cvv!="" && nameOnCard!="")
            axios.post("https://cinotes-alb-1929580936.eu-central-1.elb.amazonaws.com/premium/buy",{},config).then((res)=>{
                localStorage.setItem("jwt",res.data.jwt);
                nav("../")
            })
    };
    return(<div id="App">
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
                    {GetLang().Payment_details}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium leading-6 text-white">
                            {GetLang().Card_number}
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => {
                                    setCardNumber(e.target.value)
                                }}
                                id="cardNumber"
                                type="text"
                                autoComplete="cc-number"
                                required
                                className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="expirationDate" className="block text-sm font-medium leading-6 text-white">
                            {GetLang().Expiration_date}
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => {
                                    setExpirationDate(e.target.value)
                                }}
                                id="expirationDate"
                                type="text"
                                autoComplete="cc-exp"
                                required
                                className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="cvv" className="block text-sm font-medium leading-6 text-white">
                            CVV
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => {
                                    setCVV(e.target.value)
                                }}
                                id="cvv"
                                type="text"
                                autoComplete="cc-csc"
                                required
                                className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="nameOnCard" className="block text-sm font-medium leading-6 text-white">
                            {GetLang().Name_on_card}
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={(e) => {
                                    setNameOnCard(e.target.value)
                                }}
                                id="nameOnCard"
                                type="text"
                                autoComplete="cc-name"
                                required
                                className="ring-slate-700 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={()=>{handlePaymentSubmit()}}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {GetLang().Pay_now}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Payment;