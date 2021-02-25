import React from 'react';

/**
 * Represents one single field of game board
 * @param {{onCLick: function, value: number}} props
 * @return {JSX.Element}
 */
const Square = (props) => {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export default Square;