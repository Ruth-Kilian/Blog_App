# Blog App

## Setup Backend

1. Clone the repository to your local machine.
2. Open the terminal and navigate to the project directory (backend).
3. Run npm install to install the dependencies.
4. Run npm start to start the server.

## Test Backend

1. Run the backend in one terminal
2. Run the frontend in another terminal
3. Run npm test in a third terminal
   Note: The frontend tests will fail when app.test.js is tested.

## Github

https://github.com/Ruth-Kilian/Blog_App

## Deployed Website

## Security

### contentSecurityPolicy

Prevents cross-site scripting (XSS) attacks by restricting the sources from which various types of content can be loaded.
Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites.

### xssFilter

Enables the Cross-Site Scripting (XSS) filter in the user's web browser.

### noSniff

Prevents browsers from guessing the MIME type of a resource.

### referrerPolicy

Controls the value of the Referer header sent by the user's web browser when navigating to other pages.

### hsts

Enables HTTP Strict Transport Security (HSTS), which forces browsers to use HTTPS for all requests to the site.

### hidePoweredBy

Removes the X-Powered-By header from responses sent by the server.
Hackers can exploit known vulnerabilities if they see that the site is powered by Express

### noCache

Adds various cache-control headers to disable caching of the site's content.

### XContentOptions

Adds the X-Content-Type-Options header to prevent MIME type sniffing.
