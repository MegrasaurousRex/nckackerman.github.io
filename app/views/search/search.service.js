(function() {
    'use strict';
    angular.module('app').factory("searchService", searchService);
    searchService.$inject = ['algolia'];

    function searchService(algolia) {
        var factory = {
            search: algoliaSearch
        };
        return factory;

        //TODO: should also take in a success and failure call back to better communicate with the controller
        function algoliaSearch(serchTerm) {

            var client = algoliasearch('16KBF0AU4T', '449d73ff5b0940fecddb1c144c2baaae');
            var index = client.initIndex('bestbuy_data');
            index.search(serchTerm, function searchDone(err, content) {
                return content.hits;
            });
        }
    }
})();
