// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-route';
import 'angular-bind-html-compile';
import 'md-data-table';

import AppController from 'src/AppController';
import Form from 'src/form/Form';
import Table from 'src/table/Table';

export default angular.module( 'starter-app', [ 'ngMaterial', 'ngRoute', Form.name, Table.name])
  .config(($mdThemingProvider,$routeProvider) => {
    // Register the user `avatar` icons
    
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('red');


      // Route definitions
    $routeProvider
    .when("/", {
      templateUrl: "pages/form.html"
    })
    /*.when("/myFiles", {
      templateUrl: "pages/myFiles.htm" 
    })
    .when("/details/:filename", {
      templateUrl: "pages/fileDetails.htm"
    })*/
    .otherwise({
        redirectTo: '/'
    });
  })
  .controller('AppController', AppController);
