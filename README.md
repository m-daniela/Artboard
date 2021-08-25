
# Artboard

A jamboard-like app, created with [React](https://reactjs.org/), where you can add images, notes and groups containing other images, notes and groups. [Each][\*] has a draggable version.  

The aim of this app is to integrate 5 design patterns: 

1. [Creational](#creational) - [abstract factory](https://refactoring.guru/design-patterns/abstract-factory)
2. [Structural](#structural) - [composite](https://refactoring.guru/design-patterns/composite), [decorator](https://refactoring.guru/design-patterns/decorator)
3. [Behavioural](#behavioural) - [iterator](https://refactoring.guru/design-patterns/iterator), [observer](https://refactoring.guru/design-patterns/observer)


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

**In the app**

[SimpleComponents](./src/components/factory/SimpleComponents.js) and [DraggableComponents](src/components/factory/DraggableComponents.js) are the factories for the simple and draggable elements.

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

**In the app**

This pattern is illustrated in [Model](./src/components/model/Model.js).


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
The Decorator can be used to extend the  behaviour of a component from the Composite tree. 

**In the app**

You can find the wrapper class in [Draggable](./src/components/model/Draggable.js).


# Behavioural

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


**In the app**

An [Iterator](./src/components/iterator/Iterator.js) that parses the tree using dfs. 


## Observer
Allows more objects (Observers) to observe the changes of another object (Observable). 
The Observable/ Publisher contains a list of Observers/ Subscribers. It can register or unregister them and it notifies each of them when a change takes place, using a `notify` method. This method automatically calls each Observer's `update` method (usually the only method it has), which accepts information about the context or event.

**Pros**

- Open closed principle, you can introduce new subscriber classes anytime, without changing the publisher code and vice-versa, if you declare a Publisher interface.
- You can establish relations at runtime.

**Cons**
- The order in which the Subscribers are notified is random. 


**In the app**

This pattern is illustrated using React's useEffect hook and the Context API. 


## Sources
- [Refactoring guru](https://refactoring.guru/design-patterns)


---


\[\*]: WIP - Make the groups draggable. 


# To do

## Design

- images should fill the space
- should be a mozaic look (or masonry)
- textarea border outline should have the same color as the highlight background/
- don't highlight the whole board/
- highlight should be darker or transparent/

## General

- better way to handle deletion (add a button on the element)
- resize elements (the draggable ones)
- make the images bigger

## Code

- make the draggable group behave normally AND RESIZABLE
- show error when the image cannot be displayed or no url was provided/
- draggable group/
- be able to delete the items from the draggable group/


https://blobcdn.same.energy/b/05/5b/055bd5b8ca27d69d07c40909b31796273fac2744