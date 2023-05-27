export function CheckPas(pass: string) {
    let reg = new RegExp("^[a-zA-Z0-9!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]{8,38}$");
    let reg_number = new RegExp("[0-9]+");
    let reg_latin = new RegExp("[a-z]+");
    let reg_uppercase = new RegExp("[A-Z]+");
    let reg_spec_symbol = new RegExp("[!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]+");
    if (!reg.test(pass))
        return {
            code: 1,
            res:"Pass can only include latin, numeric and special symbols(8-38 symbols)"
        }
    else if (!reg_number.test(pass))
        return {
            code: 2,
            res:"Pass must include at list 1 number"
        }
    else if (!reg_latin.test(pass)||!reg_uppercase.test(pass))
        return {
            code: 3,
            res:"Pass must include at list 1 latin symbol in upper and 1 in lower case"
        }
    else if (!reg_spec_symbol.test(pass))
        return {
            code: 4,
            res:"Pass must include at list 1 special symbol"
        }
    else return {
            code: 0,
            res: ""
        }
}