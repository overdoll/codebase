# Data Preloading & Rendering

Medusa will always attempt to pre-render the page, and send preloaded data to the client. This allows our client application to instantly show data without having to wait on an extra API call.

To achieve this, the server instantiates a new Relay Environment on each request, creates a fake router & performs a prepass on the data before fully rendering the page. Data prepass is possible with the use of [react-ssr-prepass](https://github.com/FormidableLabs/react-ssr-prepass), which runs through the React tree, finds any data \(on our current route\) that requires loading, and suspends for an API request.

When API requests are complete, the application will check for any redirect calls. If none exist, it will proceed to dump the Relay store into the client, and inject critical CSS required for rendering. Then, the result HTML is outputted, which is a render of the current application state.



