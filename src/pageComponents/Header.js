import React from 'react';

const Header = ((props) => {
    return (
        <header role="banner" id="title-bar">
            <h2>{props.title}</h2>
        </header>
    );
});

export default Header;