import Eng from "../Context/Eng.json";
import Ukr from "../Context/Ukr.json";
let lang=Eng;
 export function GetLang(){
     return lang;
 }

export function SetLang(l:number){
    if (l==1)
        lang=Eng;
    else if (l==2)
        lang=Ukr;
}