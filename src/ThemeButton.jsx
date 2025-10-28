import React from 'react';

const ThemeButton = ({func}) => {

    return (
        <button onClick={func} className='ui-button theme-button'>
            <p>
            Switch Theme
            </p>
        </button>
    );
}

export default ThemeButton;