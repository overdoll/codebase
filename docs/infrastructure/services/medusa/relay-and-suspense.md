# Relay & Suspense

To fetch data & provide good user experiences, we use the following technologies:

### Relay

We use Relay as our GraphQL fetching library. Specifically, we use the experimental version of relay to perform data fetching through use of relay hooks & suspene. [Check it out](https://relay.dev/docs/en/experimental/step-by-step\)

### React Suspense

We use React suspense for data fetching. React suspense makes it easier for us to write code, by defining specific breakpoints for data fetching & errors. We can easily isolate our logic through components and follow the Single Responsibility Principle. [Learn more here](https://reactjs.org/docs/concurrent-mode-suspense.html)

