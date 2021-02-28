# Synchronous Services

Synchronous services are responsible for request-response style of networking. This can include many functions, such as expecting to receive a list of items from a database or updating a specific item. While we want to use event-driven services as much as possible, sometimes, it is unavoidable and we require synchronous calls.

Synchronous services should be using GRPC as the communication protocol, since this allows us to have a more streamlined development process with client libraries and server implementations.

A great example of a GRPC service is the EVA service, which uses GRPC to perform database calls such as signing up and performing authentication.

In order to build a synchronous service, all you have to do is create a .proto file, and implement the methods on the server. Then, the client can freely use this library to perform API calls.



