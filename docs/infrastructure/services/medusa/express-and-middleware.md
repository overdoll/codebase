# Express & Middleware

We use a couple of middlewares on Express in order to make Medusa functional:

### Content Security Policy

We generate a Nonce tag, which is inserted into scripts & styles once the page is loaded.

Along with Nonce, we use content security policy to restrict script execution to whitelisted domains, if we ever happen to run into an XSS.

### CSRF

We insert a CSRF token as a cookie and into the document on initial page load. This CSRF token is verified by the backend on each API call, and expects the cookie to be accompanied by a header.

