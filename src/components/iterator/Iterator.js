
/**
 * Iterator class for the state
 * It needs to go in depth, since the Group elements can have 
 * more children and Groups inside, each having more children
 * @param {*} collection the tree of components that need to 
 * be displayed
 */
export class Iterator{
    constructor(collection){
        this.visited = [];
        this.stack = collection.reverse().slice(0, collection.length);
    }

    /**
     * return the first element from the collection if exists, 
     * otherwise return undefined
     * @returns the first element | undefined
     */
    first = () =>{
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : undefined;
    }

    /**
     * check if there still is an element on the surface,
     * otherwise, if the current element is a Group, check 
     * it's children, otherwise return undefined
     * @returns true | false
     */
    hasNext = () =>{
        return this.stack.length > 0 || this.stack[this.stack.length - 1]?.getElements !== undefined;
    }

    /**
     * get the next element
     * perform depth first search on the collection
     * treat the Draggable element separately, since it is a 
     * container itself
     * @returns the element, if found
     */
    next = () => {
        if (this.hasNext()){
            const current = this.stack.pop();

            this.visited.push(current);
            if(current?.getElements !== undefined){
                current.getElements().forEach((elem) => this.stack.push(elem));
            }
            else if(current?.isDraggable() && current?.item.getElements !== undefined){
                current.item.getElements().forEach((elem) => this.stack.push(elem));
            }
            return current;
        }
    }

    /**
     * obtain the parent of the element with the given id 
     * treat the Draggable case separately because you need 
     * to extract the base element from the container
     * @param {*} id 
     * @returns parent of element with id | undefined
     */
    parentOf = id =>{
        id = +id;
        
        while(this.hasNext()){
            const nextElement = this.next();
            if (nextElement.getElements !== undefined){
                const result = nextElement.getElements().filter(elem => +elem.id === id);
                if (result.length > 0){
                    return nextElement;
                }
            }
            else if(nextElement?.isDraggable() && nextElement?.item.getElements !== undefined){
                const result = nextElement.item.getElements().filter(elem => +elem.id === id);
                if (result.length > 0){
                    return nextElement.item;
                }
            }
        }    
    }
}