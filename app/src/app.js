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
import Menu from 'src/menu/Menu';

export default angular.module( 'starter-app', [ 'ngMaterial', 'ngRoute', Form.name, Table.name, Menu.name])
  .config(($mdThemingProvider,$routeProvider) => {
    // Register the user `avatar` icons
    
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('red');


      // Route definitions
    $routeProvider
    .when("/", {
      templateUrl: "pages/home.html"
    })
    .when("/form", {
      templateUrl: "pages/form.html" 
    })
    .when("/home", {
      templateUrl: "pages/home.html" 
    })
    .otherwise({
        redirectTo: '/'
    });
  })
  .controller('AppController', AppController);
