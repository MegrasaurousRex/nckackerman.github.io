(function() {
    'use strict';
    angular.module('app').controller('SearchController', SearchController);
    SearchController.$inject = ['searchService', '$scope', 'algolia'];

    function SearchController(searchService, $scope, algolia) {

        var client = algolia.Client('16KBF0AU4T', '449d73ff5b0940fecddb1c144c2baaae');
        var index = client.initIndex('bestbuy_data');
        var vm = this;
        vm.loading = true;
        vm.results = {};
        vm.search = search;
        vm.getDatasets = getDatasets;

        initialize();

        function initialize() {
            generateRandomStartQuery();
            search();
        }

        function getDatasets() {
            return {
                source: function(query, callback) {
                    index.search(query, { hitsPerPage: 5 }, function(error, content) {
                        if (error) {
                            callback([]);
                            return;
                        }
                        callback(content.hits);
                    });
                },
                templates: {
                    suggestion: function(suggestion) {
                        return suggestion._highlightResult.name.value;
                    }
                }
            };
        };

        $scope.$on('autocomplete:selected', function(event, suggestion, dataset) {
            vm.searchTerm = suggestion.name;
            search();
        });

        function search() {
            angular.element('#search-input').blur();
            vm.results = {};
            vm.loading = true;
            index.search(vm.searchTerm, function searchDone(err, content) {
                vm.loading = false;
                vm.results = content.hits;
            });
        }

        function generateRandomStartQuery() {
            var items = ["monitor", "tv", "amazon", "toy", "car", "drone", "camera",
                "home", "tablet", "ipad", "phone", "computer", "accessories", "bluetooth",
                "cable", "belkin", "audio", "wireless", "speaker"
            ];
            vm.searchTerm = items[Math.floor(Math.random() * items.length)];
        }
    }
})();
