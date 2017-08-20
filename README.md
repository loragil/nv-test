# NV Test App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.0 and was written using Angular (4.2.4).


## Installation

1. *Install node JS* (+ npm, comes with node):
    go to 'https://nodejs.org/en/', download node and follow installation instructions.
2. Install angular CLI -
    In terminal, run `npm install -g @angular/cli`
3. Get project -
    Download & extract project ZIP file from 'https://github.com/loragil/nv-test' to your local machine ('clone or download' button)
4. Install app dependencies -
    In terminal, go to project's root folder and run `npm install` to install all app dependencies on your machine
5. Development server -
    In terminal, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Notes:

* see 'Roadmap' section for stuff I'd consider adding in the future, given the time
* styling - took a bit of freedom..
* refresh (f5) route - always go to default: Not sure it's the conventional way..
    (I believe we should use sub-routes instead). would implement using guard service for location route if required still
* used devtools assistance to simulate location and test browser's current location
* I've never dealt with location/map based code before.. FYI :)


## Roadmap

*  make a generic modal-shell component
* input validation of lat, lng
* create custom input component/pipe for lat/lng
* if required, support localization
* if app gets more complex/scales - use *observers* as models fro the dumb component

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Angular CLI - Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
