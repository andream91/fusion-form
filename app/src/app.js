// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';

import AppController from 'src/AppController';
import Form from 'src/form/Form';

export default angular.module( 'starter-app', [ 'ngMaterial', Form.name])
  .config(($mdThemingProvider) => {
    // Register the user `avatar` icons
    
    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('red');
  })
  .controller('AppController', AppController);
