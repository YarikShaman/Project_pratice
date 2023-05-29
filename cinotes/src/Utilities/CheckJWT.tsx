import {DecodeB64} from "./DecodeB64";
import {useNavigate} from "react-router-dom";

export function CheckJWT() {
    let date:number =Date.now()
    if (!localStorage["jwt"])
        return 1
    if (DecodeB64(localStorage["jwt"]).exp<=date/1000)
        return 2
    if (DecodeB64(localStorage["jwt"]).isVerified==false)
        return 3
    if (DecodeB64(localStorage["jwt"]).ps_recovery==true)
        return 4
    return 0
}

