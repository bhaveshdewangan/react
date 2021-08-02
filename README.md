
# clone or download recar module in your local machine and follow the below instructions to play around with react stuff

## Prerequisite 

Make sure your system ready with following things:

* Install [Node.js](https://nodejs.org/en/) 
* Install "create-react-app" by using command "npm install -g create-react-app"

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

Above command will do 2 things:
* Compiling the react project code
* Starting the JSON server by running "json-server --watch db.json --port 3001" command in backend.

I used here [Currently](https://www.npmjs.com/package/concurrently) package to run multiple commands concurrently

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run react-scripts test` to execute the unit tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [React Documentation](https://reactjs.org/docs/getting-started.html).
