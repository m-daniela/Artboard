
# Artboard

A Jamboard-like application for art references, in which the user can add, delete and group images and notes.  

The items can be static, creating a masonry pattern on the board, or draggable, so they can be positioned anywhere on it. 

The groups have a list of elements of any kind, including other groups, forming a tree-like structure out of them. It is parsed using depth-first search, with a custom iterator, so the inner groups and items can be modified and deleted. 

The state of the components tree is saved and managed with React Context API. Addition and deletion are managed using a reducer, created with the `useReducer` hook. 

The resulting board can be saved at any time, as a png containing the current board with transparent background. 

The aim of this app is to integrate 5 design patterns: 

1. [Creational](#creational) - [abstract factory](#abstract-factory)
2. [Structural](#structural) - [composite](#composite), [decorator](#decorator)
3. [Behavioral](#behavioral) - [iterator](#iterator), [observer](#observer)

# Setup

```bash
npm install
npm start
```

# Creational

## Abstract factory

A pattern that allows creation of families of related object, without specifying the concrete classes. 
This pattern is useful when you have different types of items and each has more variants or versions. Each item type has their own interfaces and concrete classes, and the variants of these are created using a factory. So the abstract factory will have a creation method for each type and the concrete factories implement them for the variants. 

**Pros**

- Low coupling between the concrete items and client. 
- Single responsibility principle by moving the creation process to one place. 
- Open close principle because you can add new variants of products without changing the existing code. 

**Cons**

- More complex code. 

**App usage**

[SimpleComponents](./src/components/factory/SimpleComponents.js) and [DraggableComponents](src/components/factory/DraggableComponents.js) are the factories for the simple and draggable elements, of each kind. `createImage`, `createNote`, `createGroup` are the common methods for this task. 

# Structural

## Composite

A group of objects are treated uniformly, as if they were a single instance of the object. 
There are two types of elements: leaves and composites. The composites contain a list of elements which can be either leaves or other composites. 
They are treated in the same way, using a Component interface, common to both types. 
This pattern is also useful when you have objects represented in tree-like structures. 

**Pros**

- Less complex and you don't have to treat nodes and leaves separately. 
- Open closed principle, you can add new types because you work with the tree like structure. 

**Cons**

- Compoment imterface might become complex if the functionality of the classes differs too much. 

**App usage**

The classes defined in [Model](./src/components/model/Model.js) follow a common interface which has the `display()` method. It returns the corresponding tag for each element. 

`Image` and `Note` are the leaf nodes and the `Group` class is the composite, and it has a list of elements and methods to operate on them. 

The `display()` method of the group calls the same method of each element in the list. 


## Decorator

Provides a wrapper class which adds a new feature to the main object.

**Pros**

- Useful when you want to extend object behaviour at runtime and without creating a subclass. 
- Single responsibility principle, divide a class that implements more behaviours into smaller classes.

**Cons**

- Decorators depend on the order and it's hard to remove one from the "stack of decorators".
- Complex decorator layer. 


**Composite and Decorator**

Both rely on recursive composition of the objects. The decorator has only one child to which it adds more responsibilities, while the composite combines the results obtained from the children.

The Decorator can be used to extend the behaviour of a component from the Composite tree. 

**App usage**

[Draggable](./src/components/model/Draggable.js) is a wapper class for the elements, making them draggable accross the board. It wraps the tag in another container, which has the draggable property. 


# Behavioral

## Iterator

Provides a way to access the items from a colllection without exposing its underlying representation. 

The Iterator usually contains the methods `next`, which returns the next item in the collection, `hasNext`, checks if there are any elements left, and `current`, returning the current element, to traverse the collection. 

**Pros**

- Single responsibility principle, you extract the iteration logic from the client code.
- Open closed principle, you can add new types of collections and iterators.
- You can iterate over (the same) collections in parallel or delay it and continue later, when needed. 

**Cons**

- It is unnecessary if the app works with simple collections.
- It might be less efficient when you have specialized collections. 


**Iterator and Composite**

The Iterator can be used to traverse the composite collection.


**App usage**

[Iterator](./src/components/iterator/Iterator.js) receives the list of elements from the context and parses it using depth-first search algorithm to find the next element. A separate iterator was needed since since the overall structure of the `Board` is tree-like. 


## Observer
Allows more objects (Observers) to observe the changes of another object (Observable). 

The Observable/ Publisher contains a list of Observers/ Subscribers. It can register or unregister them and it notifies each of them when a change takes place, using a `notify` method. This method automatically calls each Observer's `update` method (usually the only method it has), which accepts information about the context or event.

**Pros**

- Open closed principle, you can introduce new subscriber classes anytime, without changing the publisher code and vice-versa, if you declare a Publisher interface.
- You can establish relations at runtime.

**Cons**

- The order in which the Subscribers are notified is random. 


**App usage**

This pattern is illustrated using React's useEffect hook and the Context API. Once a new item is selected, the [Side](./src/components/Side.js) is notified to re-render the label with the currently selected item. 

