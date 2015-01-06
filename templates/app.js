/**
 * Created by currentuser on 1/3/15.
 */
//Define an angular module for our app
var choicesApp = angular.module('choicesApp', []);

//Define Routing for app
choicesApp.config(['$routeProvider',
    function($routeProvider)
{

    //choicesApp.registerCtrl = $controllerProvider.register;

    $routeProvider
        .when('/start_screen', {
                templateUrl: 'templates/start_screen.html'
                //,controller: 'start_screen_controller'
            })
        .when('/choice_board', {
                templateUrl: 'templates/choice_board.html'
                //,controller: 'choice_board_controller'
            })
        .when('/about', {
                templateUrl: 'templates/about.html'
                //,controller: 'about_controller'
            })
        .when('/obituaries', {
                templateUrl: 'templates/obituaries.html'
                //,controller: 'ObituariesController'
            })
        .otherwise({
                redirectTo: '/start_screen'
            });
    }]);



/*
choicesApp.controller('choice_board_controller', function($scope) {

    $scope.message = 'This is the choice board screen';

});


choicesApp.controller('start_screen_controller', function($scope) {

    $scope.message = 'This is the start screen';

});
    */