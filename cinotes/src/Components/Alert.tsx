import React from "react";
import "../App.css";
export  function Alert(type:string, errorName:string, errorText:string){
    switch (type){
        case("error"): {
            return (
                <div className="fixed z-50 flex h-20 w-44 bg-red-400">
                    {errorName}
                </div>
            )
            break;
        }
        case("warning"):{
            return (
                <div className="">
                </div>
            )
            break;
        }
        default:{
            return (
                <div className="fixed z-50 flex h-20 w-44 bg-red-400 self-center">
                    {errorName}
                </div>
            )
            break;
        }
    }
    return (<></>)
}
