(function() {
    'use strict';
    angular.module('app').config(config);

    function config($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/');

        $stateProvider
        // base template for content
            .state('base', {
                abstract: true,
                templateUrl: './app/views/layout/base.html'
            })
            .state('base.main', {
                views: {
                    "navbar": {
                        templateUrl: './app/views/layout/navbar.html'
                    },
                    "footer": {
                        templateUrl: './app/views/layout/footer.html'
                    }
                }
            })
            .state('base.main.search', {
                url: '^/',
                views: {
                    "@base": {
                        templateUrl: './app/views/search/search.html',
                        controller: 'SearchController as vm',
                    }
                }
            });
    }

})();
