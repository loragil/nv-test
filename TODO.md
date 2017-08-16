
AGENDA:
=======
* check what config file changes are really required for maps to work. revert the rest
* complete map section:
    - handle all location load/save events
    - fix URL & params
    - extract to a standalone component
    - set map to current location on page load
* complete LocationComponent (dynamic buttons, handle events etc.)
* add modal component [https://ng-bootstrap.github.io/#/components/modal/examples]
* add toatster component
* fix navbar
* make navbar responsive
* fix refresh (f5) route - always go to default
* complete home screen - add location component & logic
* split which buttons would show on location component for each screen

/**/
- ? location service
- add user notification (toaster) to all success/fail events
- make a generic modal-shell component
- utilize observables /store ?
/**/


TODO:
=====
* add styling
* code cleanup
* code review
* documentation
* setup test + instructions


OPTIONAL:
=========
* [?] input validation of lat,lng
* [?] update README file
* [?] change Icon to nortecview icon
* [?] create custom input component for lat/lon
* [?] handle possible browser-geolocation error [https://shapeshed.com/html5-geolocation-api/]


RESOURCES:
==========
angular leaflet example [https://github.com/theAlgorithmist/Angular2Leaflet/blob/master/src/app/LeafletMap.component.ts]


COMPLETED:
==========
V add map container [here API:https://developer.here.com/, map:http://leafletjs.com/]
