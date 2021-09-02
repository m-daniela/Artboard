import { Note, Image, Group } from "../model/Model";
import { Draggable } from "../model/Draggable";
import { getId } from "../helpers/Constants";

/** Factory for draggable components */

const createImage = (url) =>{
    const id1 = getId();
    const id2 = getId();
    const img = new Image(id1, url);
    return new Draggable(id2, img);
};

const createNote = () => {
    const id1 = getId();
    const id2 = getId();
    const note = new Note(id1, "Your notes (double click to activate)...");
    return new Draggable(id2, note);
};

const createGroup = () => {
    const id1 = getId();
    const id2 = getId();
    const grp = new Group(id1);
    return new Draggable(id2, grp);
};

export const draggableComponents = {
    createImage,
    createNote,
    createGroup,
};