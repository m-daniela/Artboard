import React from 'react';
import { BoardContext } from './helpers/Context';

/**
 * Board
 * Renders the tree of Components
 */
const Board = () => {
    const {elements, setSelected, setCurrent, removeSelection} = React.useContext(BoardContext);

    const clickHandler = e =>{
        let target = e.target;

        // remove "selected" from classlist of the currently selected item
        removeSelection();

        // change the target node to the parent, if it is Draggable
        if (target.parentNode.classList[0] == "draggable"){
            target = target.parentNode;
        }

        setCurrent(target);

        // don't add the "selected" classname to .board
        if (target.classList[0] != "board"){
            target.classList.add("selected");
        }
        setSelected(target.id);
    };

    return (
        <div className="board" onClick={clickHandler}>
            {elements.map(elem => elem.display())}
        </div>
    );
};

export default Board;