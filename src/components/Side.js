import React from 'react';
import { commands } from './helpers/Constants';
import { BoardContext } from './helpers/Context';
import { draggableComponents } from "./factory/DraggableComponents";
import { simpleComponents } from "./factory/SimpleComponents";
import { Iterator } from './iterator/Iterator';
import * as htmlToImage from "html-to-image";

/**
 * Side
 * Renders the buttons and logic for Component manipulation
 */
const Side = () => {
    const {dispatch, selected, setSelected, getElement, elements, removeSelection} = React.useContext(BoardContext);
    const [url, setUrl] = React.useState("");
    const [group, setGroup] = React.useState("");
    const [error, setError] = React.useState("");
    const [download, setDownload] = React.useState("");
    const [selectedElement, setSelectedElement] = React.useState("");
    const disable = selected === 0;

    /**
     * subscribe to see when another component is selected
     * and update based on the new selected id
     */
    React.useEffect(() => {
        if (selected !== 0 && selected !== undefined){
            const elem = getElement(selected);
            setSelectedElement(elem);
        }
    }, [selected, getElement]);
        

    /**
     * add a new element to the component tree
     * @param {Component} item the item to be added 
     * */
    const add = (item) =>{
        if (selected){
            // check if it is a static group
            if (selectedElement?.elements !== undefined){
                selectedElement.addElement(item);
            }
            // check if it is draggable
            else if(selectedElement?.isDraggable() && selectedElement?.item.elements !== undefined){
                selectedElement.item?.addElement(item);
            }
            else{
                dispatch({type: commands.add, item});
            }
            removeSelection();
            setSelected(null);
               
        }
        else{
            dispatch({type: commands.add, item});
            setSelected(null);
        }
    };

    /** Add the simple elements */
    
    const addImage = () =>{
        if (url !== ""){
            const item = simpleComponents.createImage(url);
            add(item);
            setUrl("");
            setError("");
        }
        else{
            setError("Please provide an URL");
        }
        
    };

    const addNote = () =>{
        const item = simpleComponents.createNote();
        add(item);
    };

    const addGroup = () =>{
        const item = simpleComponents.createGroup();
        add(item);
    };

    /** Add the draggable elements */

    const addDraggableImage = () =>{
        const item = draggableComponents.createImage(url);
        dispatch({type: commands.add, item});
        setUrl("");
    };

    const addDraggableNote = () =>{
        const item = draggableComponents.createNote();
        dispatch({type: commands.add, item});
    };

    const addDraggableGroup = () =>{
        const item = draggableComponents.createGroup();
        dispatch({type: commands.add, item});
    };

    /** 
     * Remove the selected item
     * If the item has a parent, then it is a group, so you call the 
     * removeElement method from the class, otherwise you remove it 
     * from the state
     */
    const removeItem = () =>{
        try{
            const iterator = new Iterator(elements.slice(0, elements.length));
            const parent = iterator.parentOf(selected);
            console.log(parent);
            if (parent !== undefined){
                parent.removeElement(selected);
            }
            else{
                console.log("elems", elements);
                dispatch({type: commands.delete, item: selected});
            }
            setSelected(null);
        }
        catch(err){
            console.log(err);
        }
    };

    /**
     * Save the configuration of the board to disk using the 
     * html-to-image package
     * The resulting base64 encoding of the image is set to a 
     * hidden anchor tag, which is programatically clicked when 
     * the conversion to image is done 
     * @param {*} e 
     */
    const saveBoard = (e) => {
        e.preventDefault();
        const boardScreenshot = document.querySelector(".board");
        const saveLink = document.querySelector("#save_board");
        removeSelection();

        htmlToImage.toPng(boardScreenshot)
            .then((result) => {
                setDownload(result);
                saveLink.click();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="side">
            <form>
                <button onClick={e => saveBoard(e)}>Save board</button>
                <a id="save_board" href={download} download="board.png" hidden>Click to save</a>
            </form>
            <form className="remove" onSubmit={e => e.preventDefault()}>
                <span>{selectedElement?.name} {selected}</span>
                <button onClick={removeItem} disabled={disable}>Delete</button>
            </form>
            <form className="add_image" onSubmit={e => e.preventDefault()}>
                <button onClick={addImage}>Image</button>
                <button onClick={addDraggableImage}>Draggable image</button>
                <label>
                    URL
                    <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} />
                </label>
                <span>{error}</span>
            </form>

            <form className="add_note" onSubmit={e => e.preventDefault()}>
                <button onClick={addNote}>Note</button>
                <button onClick={addDraggableNote}>Draggable note <br></br></button>
            </form>
            <form className="add_group" onSubmit={e => e.preventDefault()}>
                <button onClick={addGroup}>Group</button>
                <button onClick={addDraggableGroup}>Draggable group</button>
            </form>
            
        </div>
    );
};

export default Side;
