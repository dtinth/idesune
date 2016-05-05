
# idesune

Hackable IDE for Atom but editor agnostic. Roll your own workflow.

[This project is not functional yet. Currently, it’s just an idea.]


## Objectives

- Provide an easy-to-implement (in Node) architecture for implementing IDE in Atom.

- Decouple the IDE part (server) from the editor (client).


## Protocol Draft

- Use socket.io as base protocol.

- By default, the server binds to `127.0.0.1` at port `1435`.

- __Server event__ means server sends to client. __Client event__ means client sends to server.

- ### server event: 'ui'

  - This event should be sent from the server whenever a client is connected.

  - Parameters:

    1. An Array of UIElements to display. A UIElements is an Object with these properties:
    
       - `type` A String representing the type of the element.
       - `props` An Object representing the properties of the element.

- ### client event: 'dispatch'

  - This event should be sent to the server when the user performs an action (e.g. clicks on a button) in an idesune-based UI.

  - Parameters:

    1. An Object representing the action that the user performed. Ideally it should be a [Flux Standard Action](https://github.com/acdlite/flux-standard-action).
