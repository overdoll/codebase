---
description: "\U0001F40D"
---

# Medusa

**Language:** [Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)

**Maintainers:** [nikita-tkachov](https://github.com/nikita-tkachov)

## Introduction

Medusa is responsible for serving the front-end application to browser clients. Medusa aims to be an isomorphic application, meaning it works on both the client and server environments. Isomorphism allows us to perform neat tricks such as pre-rendering the site for better SEO capabilities and loading data on the server for super fast loading speeds.

## Technology

### React

React is our primary framework for writing javascript served both on the client and server.

### Express

Express is the server framework that performs routing & loading data before the application is served to the user

### Razzle

Razzle is the server-side rendering library used to run the application.[ Check it out](https://razzlejs.org/)

## Layout

The layout consists of the following:

* **public** - Serves any public files required to the client \(favicons, manifest.json, etc...\)
* **schema** - Contains the GraphQL schema to be used by the javascript framework
* **src** 
  * **client** - Contains sourcecode for the isomorphic application
  * **modules** - Code shared between many parts of the application is placed here for easy inspection & future modifications
  * **server** - Contains sourcecode for the backend in order to serve the client, add additional headers and perform preloading





