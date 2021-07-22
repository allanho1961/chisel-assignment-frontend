import React from 'react';

const TitleBar = ((props) => {
    return (
        <hgroup id="main-title">
            <div className="float-right">
                {props.children}
            </div>
            <h1 className="underline" style={{ color: '#000' }}>{props.title}</h1>
        </hgroup>
    );
});

export default TitleBar;