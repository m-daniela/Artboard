import React, {useReducer, createContext} from 'react';
import { Iterator } from '../iterator/Iterator';
import { commands } from './Constants';

/**
 * Board context
 * Holds the state of the board and the CRUD logic
 */
export const BoardContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
    case (commands.add): 
        return [...state, action.item];
    case (commands.delete): 
        return state.filter(element => +element.id !== +action.item);
    default: 
        return state;
    }
};


const BoardProvider = (props) => {
    const state = [];
    const [elements, dispatch] = useReducer(reducer, state);
    const [selected, setSelected] = React.useState(null);
    const [current, setCurrent] = React.useState(null);

    // returns the element with the given ID, using the iterator
    const getElement = id =>{
        const iterator = new Iterator(elements.slice(0, elements.length));
        let current = iterator.first();
        if (+current?.id !== +id){
            while (iterator.hasNext()){
                const next = iterator.next();
                if(+next.id === +id){
                    return next;
                }
            }
        }
        else{
            return current;
        }
    };

    // set the selected item to null and remove
    // the highlight
    const removeSelection = () =>{
        if (current){
            current.classList.remove("selected");
            setSelected(null);
        }
    };

    return (
        <BoardContext.Provider value={{elements, dispatch, selected, setSelected, getElement, current, setCurrent, removeSelection}}>
            {props.children}
        </BoardContext.Provider>
    );
};

export default BoardProvider;