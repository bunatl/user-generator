import React from 'react';
import { Person } from './app/App'

// icons
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EventIcon from '@material-ui/icons/Event';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';

interface PersonProps {
    obj: Person
}

const Profile: React.FC<PersonProps> = ({ obj }) => {
    return (
        <div id="Card">
            {/* photo */}
            <div id="photo"><img src={obj.pic.large} alt="profile" /></div>
            {/* name */}
            <div id="name"><AccountBoxOutlinedIcon />{obj.name}</div>
            {/* email */}
            <div id="email"><MailOutlineIcon />{obj.email}</div>
            {/* dob */}
            <div id="dob"><EventIcon />{obj.dob}</div>
            {/* adress */}
            <div id="address"><LocationOnOutlinedIcon />{obj.address}</div>
            {/* number */}
            <div id="number"><PhoneOutlinedIcon />{obj.number}</div>
            {/* pssw */}
            <div id="password"><VpnKeyOutlinedIcon />{obj.pssw}</div>
        </div>
    );
}

export default Profile;
