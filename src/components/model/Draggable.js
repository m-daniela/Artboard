import React from "react";

// decorator class
// a wrapper to create a draggable object


/**
 * Decorator class
 * A wrapper (div) over the given Component to create 
 * draggable Components. The display method acts the same
 * @param {number} id id of the component
 * @param {Component} item the component it wraps
 */
export class Draggable{
    constructor(id, item){
        this.id = id;
        this.item = item;
        this.name = `Draggable ${item.name}`;
    }

    isDraggable = () => true;

    getName = () =>{
        return this.name;
    }

    display = () =>{
        return <div className="draggable item" id={this.id} key={this.id} draggable={true} onMouseOver={() => this.drag(this.id)}>{this.item.display()}</div>;
    }

    /**
     * add the drag property to the wrapper div
     * @param {number} id the id of the wrapper that needs to 
     * be dragged around
     */
    drag = (id) => {
        const element = document.getElementById(id);

        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;
    
        const dragMouseDown = (e) =>{
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };
    
        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        };
    
        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
    
        element.onmousedown = dragMouseDown;
    }
}