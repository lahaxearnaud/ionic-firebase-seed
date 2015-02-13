angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $rootScope, $firebaseAuth, firebaseUrl) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope,
    focusFirstInput: true,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    $scope.modal = modal;
    if(!$rootScope.logged) {
      $scope.login();
    }
  });

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
      var auth = $firebaseAuth(new Firebase(firebaseUrl));
      auth.$authWithPassword($scope.loginData).then(function(user) {
        $scope.modal.hide();
        $rootScope.user = user;
        $rootScope.logged = true;
        window.localStorage['ionic.chat.authentification'] = JSON.stringify(user);

      }, function(error) {
        // handle error
        alert(error);
      });
  };
})