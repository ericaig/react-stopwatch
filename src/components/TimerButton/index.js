import React from 'react';
import '../../components/TimerButton/index.scss';

function TimerButton({color, text, onClick, isVisible}) {
    const classes = `timer-button bg-gradient1 ${color}${!isVisible ? ' display-none' : ''}`;

    return (
        <div className={classes} onClick={onClick}>
            <span>{text}</span>
        </div>
    )
}

export default TimerButton