QUnit.module('Search Functionality', function() {
    
    QUnit.test('Search object should exist and have required methods', function(assert) {
        assert.ok(typeof Search === 'object', 'Search object should exist');
        assert.ok(typeof Search.init === 'function', 'Search.init should be a function');
        assert.ok(typeof Search.search === 'function', 'Search.search should be a function');
        assert.ok(Array.isArray(Search.data), 'Search.data should be an array');
    });
    
    QUnit.test('Search should initialize with empty data', function(assert) {
        assert.equal(Search.data.length, 0, 'Search data should start empty');
        assert.equal(Search.isInitialized, false, 'Search should not be initialized initially');
    });
    
    QUnit.test('Search constants should be defined', function(assert) {
        assert.equal(CONSTANTS.SEARCH_DEBOUNCE_MS, 300, 'Search debounce should be 300ms');
        assert.equal(CONSTANTS.SEARCH_MIN_CHARS, 2, 'Search min chars should be 2');
        assert.equal(CONSTANTS.SEARCH_MAX_RESULTS, 8, 'Search max results should be 8');
    });
    
    QUnit.test('Search should handle empty query', function(assert) {
        const results = Search.search('');
        assert.equal(results.length, 0, 'Empty query should return no results');
    });
    
    QUnit.test('Search should handle null/undefined query', function(assert) {
        const results1 = Search.search(null);
        const results2 = Search.search(undefined);
        
        assert.equal(results1.length, 0, 'Null query should return no results');
        assert.equal(results2.length, 0, 'Undefined query should return no results');
    });
    
    QUnit.test('Search should respect min characters', function(assert) {
        // Mock some data
        Search.data = [
            { title: 'Test Project', type: 'project' }
        ];
        
        const results = Search.search('a'); // 1 character, below min
        assert.equal(results.length, 0, 'Query below min chars should return no results');
    });
    
    QUnit.test('Search should limit results to max', function(assert) {
        // Mock data with more than max results
        Search.data = Array.from({ length: 20 }, (_, i) => ({
            title: `Project ${i}`,
            type: 'project'
        }));
        
        const results = Search.search('Project');
        assert.ok(results.length <= CONSTANTS.SEARCH_MAX_RESULTS, 'Results should not exceed max');
    });
    
});
