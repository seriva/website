QUnit.module('Routing & Navigation', function() {
    
    QUnit.test('URLSearchParams should work for route parsing', function(assert) {
        // Mock URL with search params
        const mockUrl = 'http://localhost:8081/?page=about&blog=test&project=myproject';
        const url = new URL(mockUrl);
        const params = new URLSearchParams(url.search);
        
        assert.equal(params.get('page'), 'about', 'Should parse page parameter');
        assert.equal(params.get('blog'), 'test', 'Should parse blog parameter');
        assert.equal(params.get('project'), 'myproject', 'Should parse project parameter');
    });
    
    QUnit.test('Constants should have correct mobile breakpoint', function(assert) {
        assert.equal(CONSTANTS.MOBILE_BREAKPOINT, 767, 'Mobile breakpoint should be 767px');
    });
    
    QUnit.test('Constants should have correct transition delays', function(assert) {
        assert.equal(CONSTANTS.PAGE_TRANSITION_DELAY, 200, 'Page transition delay should be 200ms');
        assert.equal(CONSTANTS.SEARCH_PAGE_CLOSE_DELAY, 200, 'Search page close delay should be 200ms');
    });
    
    QUnit.test('DOMCache should initialize correctly', function(assert) {
        // Test DOMCache initialization
        DOMCache.init();
        
        assert.ok(DOMCache.navbar !== null, 'Navbar should be cached');
        assert.ok(DOMCache.main !== null, 'Main should be cached');
        assert.ok(DOMCache.footer !== null, 'Footer should be cached');
    });
    
    QUnit.test('DOMCache should have required methods', function(assert) {
        assert.ok(typeof DOMCache.clearNavbarCache === 'function', 'clearNavbarCache should be a function');
        assert.ok(typeof DOMCache.clearSearchCache === 'function', 'clearSearchCache should be a function');
        assert.ok(typeof DOMCache.getDropdown === 'function', 'getDropdown should be a function');
        assert.ok(typeof DOMCache.getSearchPage === 'function', 'getSearchPage should be a function');
    });
    
    QUnit.test('DOMCache getters should return elements', function(assert) {
        const dropdown = DOMCache.getDropdown();
        const searchPage = DOMCache.getSearchPage();
        const searchInput = DOMCache.getSearchInput();
        const searchResults = DOMCache.getSearchResults();
        const searchToggle = DOMCache.getSearchToggle();
        
        // These might be null if elements don't exist, which is fine
        assert.ok(dropdown === null || dropdown instanceof Element, 'getDropdown should return element or null');
        assert.ok(searchPage === null || searchPage instanceof Element, 'getSearchPage should return element or null');
        assert.ok(searchInput === null || searchInput instanceof Element, 'getSearchInput should return element or null');
        assert.ok(searchResults === null || searchResults instanceof Element, 'getSearchResults should return element or null');
        assert.ok(searchToggle === null || searchToggle instanceof Element, 'getSearchToggle should return element or null');
    });
    
});
