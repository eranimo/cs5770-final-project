## Automatic SQL Injection Vulnerability Detection 

A simple single page application is created using Node.js/Express and SQLite and a tool script is developed to intercept xhr requests in the POST request and replay them with additional parameters with sql injection attacks. It's passive detection which runs in the background. And, it will let us know if there is indeed an SQL injection vulnerability.

## Framework

 * Node.js as the core app engine
 * Express.js as the web framework
 * node-sqlite3 as the database API
 * Some basic DDL/DML

## Running the application

 1. Clone the repository on your machine and navigate to the main directory.
 2. Before running the application, make sure that you have node.js and sqlite3 installed in your system.
 3. We need to install several dependencies by entering "npm install --save-dev".
 4. The "node server.js" command will run the server and go to any web browser to type the "localhost:3000" to view the application.
 5. Also, run the listener.js script that will run in the background and logs all the requests sent to the application.
