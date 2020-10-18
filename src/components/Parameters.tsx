import React, { useState, FC, useReducer, useEffect } from 'react';
import * as MaterialUI from '@material-ui/core';

import { Password } from '../types/PasswordType';
import { passwordReducer } from '../reducer/passwordReducer';
import { constructParamURL } from '../utils/constructParamURL'

interface ParametersProps {
    updateParameters: (params: string) => void;
    refreshProfile: () => void;
}

const initPassword: Password = {
    lowercase: false,
    uppercase: false,
    numOfChars: '8'
}

const Parameters: FC<ParametersProps> = ({ updateParameters, refreshProfile }) => {
    const [ gender, setGender ] = useState<string>("both");
    const [ nationality, setNationality ] = useState<unknown>("random");
    // passwordReducer - reducer function, [] - initial state
    const [ password, dispatch ] = useReducer(passwordReducer, initPassword);

    useEffect(() => {
        // construct param's URL
        const paramURL: string = constructParamURL(gender, nationality, password);
        updateParameters(paramURL);
    }, [ gender, nationality, password, updateParameters ])

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    }

    const handleNationality = (e: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>) => {
        setNationality(e.target.value);
    }

    return (
        <div id="params">
            <div id="gender">
                {/* ?gender=female */}
                <MaterialUI.FormControl component="fieldset">
                    <MaterialUI.FormLabel component="legend">Gender</MaterialUI.FormLabel>
                    <MaterialUI.RadioGroup
                        aria-label="gender"
                        name="gender1"
                        value={gender}
                        onChange={handleGenderChange}>
                        <MaterialUI.FormControlLabel value="female" control={<MaterialUI.Radio color="primary" />} label="Female" />
                        <MaterialUI.FormControlLabel value="male" control={<MaterialUI.Radio color="primary" />} label="Male" />
                        <MaterialUI.FormControlLabel value="both" control={<MaterialUI.Radio color="primary" />} label="Both" />
                    </MaterialUI.RadioGroup>
                </MaterialUI.FormControl>
            </div>

            <div id="password">
                {/* ?password=upper,lower,1-16 */}
                <MaterialUI.FormControl component="fieldset">
                    <MaterialUI.FormLabel component="legend">Password</MaterialUI.FormLabel>
                    <div>
                        <MaterialUI.FormControlLabel
                            control={
                                <MaterialUI.Checkbox
                                    name="upper"
                                    color="primary"
                                    onChange={() => {
                                        dispatch({ type: "upper" })
                                    }}
                                />
                            }
                            label="Upper case"
                        />
                        <MaterialUI.FormControlLabel
                            control={
                                <MaterialUI.Checkbox
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
                    <MaterialUI.InputBase
                        placeholder="Number of chars"
                        required
                        onChange={e => dispatch({
                            type: "number", num: e.target.value
                        })} />
                </MaterialUI.FormControl>
            </div>

            <div id="nationality">
                {/* ?nat=gb (AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US) */}
                <MaterialUI.FormControl variant="outlined">
                    <MaterialUI.InputLabel id="demo-simple-MaterialUI.Select-outlined-label">Nationality</MaterialUI.InputLabel>
                    {/* FindDOMnode error: https://stackoverflow.com/questions/61115871/finddomnode-error-on-react-material-ui-MaterialUI.Select-menu */}
                    <MaterialUI.Select
                        labelId="demo-simple-MaterialUI.Select-outlined-label"
                        id="demo-simple-MaterialUI.Select-outlined"
                        value={nationality}
                        onChange={handleNationality}
                        label="nationality"
                    >
                        <MaterialUI.MenuItem value="random">
                            <em>Random</em>
                        </MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'au'}>Australian</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'br'}>Brasilian</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'ca'}>Canadian</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'ch'}>Swiss</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'de'}>German</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'dk'}>Danish</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'es'}>Estonian</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'fi'}>Finnish</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'fr'}>French</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'ie'}>Icelandic</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'ir'}>Irish</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'no'}>Norwegian</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'nl'}>Dutch</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'nz'}>New Zealand</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'tr'}>Turkish</MaterialUI.MenuItem>
                        <MaterialUI.MenuItem value={'us'}>American</MaterialUI.MenuItem>
                    </MaterialUI.Select>
                </MaterialUI.FormControl>
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