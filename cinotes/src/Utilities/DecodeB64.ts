import {Base64} from "js-base64";
// export function DecodeJwt(jwt:string){
//     return {
//         exp: Base64.decode(jwt.split(".")[1]).split('"')[2].slice(1, -1),
//         id: Base64.decode(jwt.split(".")[1]).split('"')[4].slice(1, -1),
//         isVerified: Base64.decode(jwt.split(".")[1]).split('"')[6].slice(1, -1),
//         ps_recovery: Base64.decode(jwt.split(".")[1]).split('"')[8].slice(1, -1),
//         userType: Base64.decode(jwt.split(".")[1]).split('"')[11]
//     }
// }

export function DecodeB64(jwt:string) {
    const body = Base64.decode(jwt.split(".")[1])
    return JSON.parse(body)
}