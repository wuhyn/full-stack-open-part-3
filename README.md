# full-stack-open-part-3

## Basic NPM commands

Updating project dependencies

`npm update`

Install project dependencies on another computer

`npm install`

## Exercise 3.1

This exercise introduces the Express web application framework and displays a list of phonebook entries in the http://localhost:3001/api/persons route.

Install express:

`npm install express`

Serving application

`npm run dev`

## Exercise 3.2
This exercise defines a HTTP GET Request in this url: http://localhost:3001/api/info. It will displays how many entries are in the phonebook at the time the HTTP GET request was processed.

## Exercise 3.3
This exercise defines a HTTP GET Request in this url: http://localhost:3001/api/persons/{id}. Where {id} is the specific entry in the phonebook list that will be displayed when the request is made.

## Exercise 3.4
This exercises defines a HTTP DELETE Request in this url: http://localhost:3001/api/persons/{id}. Where {id} is the specific entry in the phonebook list that will be deleted when the request is made.

## Exercise 3.5
This exercise involves creating a HTTP POST Request in this url: http://localhost:3001/api/persons/. A JSON object will be sent to this URL and creates a new entry in the phonebook entry.

## Exercise 3.6
This exercise involves creating error handling to ensure that an object sent to the HTTP POST Request does not create a new entry in the phonebook if there's a duplicate name, or the request body is missing data in the required fields.