(function() {
    'use strict';
    angular.module('app').factory("searchService", searchService);
    searchService.$inject = ['algolia'];

    function searchService(algolia) {
        var factory = {
            search: algoliaSearch
        };
        return factory;

        function algoliaSearch(serchTerm) {

            var client = algoliasearch('16KBF0AU4T', '449d73ff5b0940fecddb1c144c2baaae');
            var index = client.initIndex('bestbuy_data');
            index.search(serchTerm, function searchDone(err, content) {
                console.log(err, content);
                return content;
            });
        }
    }
})();
