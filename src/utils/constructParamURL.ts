import { Password } from '../types/PasswordType'

export const constructParamURL = (gender: string, nationality: any, password: Password): string => {
    let paramURL: string = "";
    let joint: boolean = false;
    if (gender !== "both") {
        paramURL += `${joint ? '&' : '?'}gender=${gender}`;
        joint = true;
    }

    if (nationality !== "random") {
        paramURL += `${joint ? '&' : '?'}nat=${nationality}`;
        joint = true;
    }

    if (password.uppercase && password.lowercase)
        paramURL += `${joint ? '&' : '?'}password=upper,lower,${password.numOfChars}`;
    else if (password.uppercase && !password.lowercase)
        paramURL += `${joint ? '&' : '?'}password=upper,${password.numOfChars}`;
    else if (!password.uppercase && password.lowercase)
        paramURL += `${joint ? '&' : '?'}password=lower,${password.numOfChars}`;
    else
        paramURL += `${joint ? '&' : '?'}password=upper,lower,${password.numOfChars}`;

    return paramURL;
}