import React, { useState, FC, useReducer, useEffect } from 'react';

import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    InputLabel,
    Select,
    InputBase,
    MenuItem
} from '@material-ui/core';

interface ParametersProps {
    updateParameters: (params: string) => void;
    refreshProfile: () => void;
}

const initPassword: Password = {
    lowercase: false,
    uppercase: false,
    numOfChars: '8'
}

interface Password {
    lowercase: boolean;
    uppercase: boolean;
    numOfChars: string;
}

type Actions =
    | { type: "lower" | "upper" }
    | { type: "number"; num: string }

const passwordReducer = (state: Password, action: Actions) => {
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
            return initPassword;
    }
}

const Parameters: FC<ParametersProps> = ({ updateParameters, refreshProfile }) => {
    const [ gender, setGender ] = useState<string>("both");
    const [ nationality, setNationality ] = useState<unknown>("random");
    // passwordReducer - reducer function, [] - initial state
    const [ password, dispatch ] = useReducer(passwordReducer, initPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    }

    const handleNationality = (e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        setNationality(e.target.value);
    }

    useEffect(() => {
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
            paramURL = `${joint ? '&' : '?'}password=upper,lower,1-${password.numOfChars}`;
        else if (password.uppercase && !password.lowercase)
            paramURL += `${joint ? '&' : '?'}password=upper,1-${password.numOfChars}`;
        else if (!password.uppercase && password.lowercase)
            paramURL += `${joint ? '&' : '?'}password=lower,1-${password.numOfChars}`;
        else
            paramURL += `${joint ? '&' : '?'}password=1-${password.numOfChars}`;

        updateParameters(paramURL);
    }, [ gender, nationality, password, updateParameters ])

    return (
        <div id="params">
            <div id="gender">
                {/* ?gender=female */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={gender}
                        onChange={handleChange}>
                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                        <FormControlLabel value="both" control={<Radio color="primary" />} label="Both" />
                    </RadioGroup>
                </FormControl>
            </div>

            <div id="password">
                {/* ?password=upper,lower,1-16 */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Password</FormLabel>
                    <div>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="upper"
                                    color="primary"
                                    onChange={() => {
                                        dispatch({ type: "upper" })
                                    }}
                                />
                            }
                            label="Upper case"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="lower"
                                    color="primary"
                                    onChange={() => {
                                        dispatch({ type: "lower" })
                                    }}
                                />
                            }
                            label="Lower Case"
                        />
                    </div>
                    <InputBase
                        placeholder="Number of chars"
                        required
                        onChange={e => dispatch({
                            type: "number", num: e.target.value
                        })} />
                </FormControl>
            </div>

            <div id="nationality">
                {/* ?nat=gb (AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US) */}
                <FormControl variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Nationality</InputLabel>
                    {/* FindDOMnode error: https://stackoverflow.com/questions/61115871/finddomnode-error-on-react-material-ui-select-menu */}
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={nationality}
                        onChange={handleNationality}
                        label="nationality"
                    >
                        <MenuItem value="random">
                            <em>Random</em>
                        </MenuItem>
                        <MenuItem value={'au'}>Australian</MenuItem>
                        <MenuItem value={'br'}>Brasilian</MenuItem>
                        <MenuItem value={'ca'}>Canadian</MenuItem>
                        <MenuItem value={'ch'}>Swiss</MenuItem>
                        <MenuItem value={'de'}>German</MenuItem>
                        <MenuItem value={'dk'}>Danish</MenuItem>
                        <MenuItem value={'es'}>Estonian</MenuItem>
                        <MenuItem value={'fi'}>Finnish</MenuItem>
                        <MenuItem value={'fr'}>French</MenuItem>
                        <MenuItem value={'ie'}>Icelandic</MenuItem>
                        <MenuItem value={'ir'}>Irish</MenuItem>
                        <MenuItem value={'no'}>Norwegian</MenuItem>
                        <MenuItem value={'nl'}>Dutch</MenuItem>
                        <MenuItem value={'nz'}>New Zealand</MenuItem>
                        <MenuItem value={'tr'}>Turkish</MenuItem>
                        <MenuItem value={'us'}>American</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div
                id="refresh"
                // rerun useEffect in App.tsx -> rerun fetch in App.tsx
                onClick={() => refreshProfile()}
            >Generate new random user</div>
        </div >
    );
}

export default Parameters;