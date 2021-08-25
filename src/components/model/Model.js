import React from "react";

/**
 * The components that are displayed follow a common structure 
 * (Component interface), having the display() method
 * Both the leaf and composite nodes follow this interface
 */

/**
 * Image
 * Leaf node, displays an image
 * @param {number} id id of the component
 * @param {string} url url of the image that is displayed
 * @param {string} name name of the component
 */
export class Image{
    constructor(id, url){
        this.id = id;
        this.url = url;
        this.name = "Image";
    }

    isDraggable = () => false;

    getName = () =>{
        return this.name;
    }

    display = () => {
        return <img src={this.url} className="item" alt="img" key={this.id} id={this.id} />;
    }
}

/**
 * Note
 * Leaf node, displays a textarea box
 * @param {number} id id of the component
 * @param {string} text placeholder text
 * @param {string} name name of the component
 */
export class Note{
    constructor(id, text="Your notes..."){
        this.id = id;
        this.text = text;
        this.name = "Note";
    }

    isDraggable = () => false;

    getName = () =>{
        return this.name;
    }

    display = () => {
        return <textarea className="item" key={this.id} id={this.id} onDoubleClick={(e) => e.target.focus()} placeholder={this.text}/>;
    }
}

/**
 * Group
 * Composite node
 * It has methods that work with the array of elements and calls the 
 * display method for each of them
 * @param {number} id id of the component
 * @param {string} name name of the component
 * @param {Component[]} elements the children of the composite component
 */
export class Group{
    constructor(id, name){
        this.id = id;
        this.name = name === "" ? "Group" : name;
        this.elements = [];
    }

    isDraggable = () => false;

    getName = () =>{
        return this.name;
    }

    addElement = element =>{
        this.elements.push(element);
    }

    removeElement = elementId =>{
        this.elements = this.elements.filter(elem => +elem.id !== +elementId);
    }

    getElements = () => this.elements;

    display = () => {
        return (
            <div className="group item" key={this.id} id={this.id}>
                {/* <span>{this.name}</span> */}
                {this.name}
                {this.elements.map(elem => elem.display())}
            </div>
        );
    }
}