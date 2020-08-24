import React from 'react';
import ReactLoading from 'react-loading';

const Placeholder: React.FC = () => {
    return (
        <div id="loader">
            <ReactLoading
                type={"spinningBubbles"}
                color={"teal"}
            />
        </div>
    );
}

export default Placeholder;