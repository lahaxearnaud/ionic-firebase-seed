// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'firebase',
  'starter.controllers',
  'starter.controllers.messages',
  'starter.routes'
])

.value('firebaseUrl', 'https://radiant-heat-4732.firebaseio.com/')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function ($rootScope) {

    // Reload authentification from localstorage
    var authentification = JSON.parse(window.localStorage['ionic.chat.authentification'] || '{}');

    if (authentification.uid && authentification.expires > Date.now() / 1000) {
        $rootScope.user = authentification;
        $rootScope.logged = true;
        console.log('Connected as ' + authentification.uid);
    } else {
        console.log('Guest user');
        $rootScope.logged = false;
    }

    $rootScope.$apply();
})

.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

