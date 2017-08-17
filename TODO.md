
AGENDA:
=======
* complete map section:
    V handle all location load/save events
    V fix URL & params
    - extract to a standalone component
    V set map to current location on page load
* complete LocationComponent (dynamic buttons, handle events etc.)
* add toatster component
* fix refresh (f5) route - always go to default
* split which buttons would show on location component for each screen
* fix load logic

/**/
- refactor location service - utilize observables to subscribe from local storage [http://plnkr.co/edit/TiUasGdutCsll1nI6USC?p=preview]
- add user notification (toaster) to all success/fail events
- make a generic modal-shell component
-
/**/


TODO:
=====
V add styling
* code cleanup
* code review
* documentation
* setup test + instructions


OPTIONAL:
=========
* [?] input validation of lat,lng
* [?] update README file on github
* [?] change Icon to nortecview icon
* [?] create custom input component for lat/lon
* [?] handle possible browser-geolocation error [https://shapeshed.com/html5-geolocation-api/]


RESOURCES:
==========
angular leaflet example [https://github.com/theAlgorithmist/Angular2Leaflet/blob/master/src/app/LeafletMap.component.ts]


COMPLETED:
==========
V add map container [here API:https://developer.here.com/, map:http://leafletjs.com/]
V fix navbar
V make navbar responsive
V complete home screen - add location component & logic
V add modal component [https://ng-bootstrap.github.io/#/components/modal/examples]
V check what config file changes are really required for maps to work. revert the rest
