angular.module('starter.controllers.messages', [])

.controller('messages.list', function($scope, $rootScope, $ionicModal, $firebase, firebaseUrl) {
    var ref = new Firebase(firebaseUrl + "chat/messages").limitToLast(10);

    $scope.messages = $firebase(ref).$asArray();

    $scope.message = {
        'message' : '',
        'email': $rootScope.user.password.email,
        'login': $rootScope.user.uid
    };

    $scope.delete = function(id) {
        $scope.messages.$remove(id);
    };

    $scope.save = function() {
        $scope.message.time = Date.now();
        $scope.messages.$add($scope.message);
        $scope.message.message = '';
    };
});