import { Password } from '../types/PasswordType'
import { Actions } from '../types/Actions'

export const passwordReducer = (state: Password, action: Actions) => {
    switch (action.type) {
        case "upper":
            return {
                lowercase: state.lowercase,
                uppercase: !state.uppercase,
                numOfChars: state.numOfChars
            };
        case "lower":
            return {
                lowercase: !state.lowercase,
                uppercase: state.uppercase,
                numOfChars: state.numOfChars
            };
        case "number":
            return {
                lowercase: state.lowercase,
                uppercase: state.uppercase,
                numOfChars: action.num
            };
        default:
            return {
                lowercase: false,
                uppercase: false,
                numOfChars: '8'
            };
    }
}