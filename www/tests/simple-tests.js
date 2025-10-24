// Simple tests that don't require full app initialization
// These can run independently of the main application

QUnit.module('Simple Tests', function() {
    
    QUnit.test('Basic utility functions work', function(assert) {
        // Test escapeHtml
        const escaped = escapeHtml('<script>alert("xss")</script>');
        assert.equal(escaped, '&lt;script&gt;alert("xss")&lt;/script&gt;', 'HTML should be escaped');
        
        // Test setDocumentTitle
        const originalTitle = document.title;
        setDocumentTitle({ site: { title: 'Test Title' } });
        assert.equal(document.title, 'Test Title', 'Document title should be set');
        document.title = originalTitle; // Restore
    });
    
    QUnit.test('Template functions exist and work', function(assert) {
        assert.ok(typeof Templates === 'object', 'Templates object should exist');
        assert.ok(typeof Templates.navbar === 'function', 'navbar template should be a function');
        assert.ok(typeof Templates.pageLink === 'function', 'pageLink template should be a function');
        
        // Test navbar template
        const navbar = Templates.navbar([], [], [], '', '', 'Test Site');
        assert.ok(navbar.includes('Test Site'), 'Navbar should include site title');
        assert.ok(navbar.includes('navbar'), 'Navbar should include navbar class');
    });
    
    QUnit.test('Constants are defined', function(assert) {
        assert.ok(typeof CONSTANTS === 'object', 'Constants should be defined');
        assert.equal(CONSTANTS.MOBILE_BREAKPOINT, 767, 'Mobile breakpoint should be 767');
        assert.equal(CONSTANTS.SEARCH_DEBOUNCE_MS, 300, 'Search debounce should be 300ms');
    });
    
    QUnit.test('Search object structure', function(assert) {
        assert.ok(typeof Search === 'object', 'Search object should exist');
        assert.ok(Array.isArray(Search.data), 'Search data should be an array');
        assert.ok(typeof Search.init === 'function', 'Search.init should be a function');
        assert.ok(typeof Search.search === 'function', 'Search.search should be a function');
    });
    
    QUnit.test('DOM elements exist', function(assert) {
        assert.ok(document.getElementById('navbar-container'), 'Navbar container should exist');
        assert.ok(document.getElementById('main-content'), 'Main content should exist');
        assert.ok(document.getElementById('footer-container'), 'Footer container should exist');
    });
    
    QUnit.test('CSS custom properties are defined', function(assert) {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        
        const accentColor = computedStyle.getPropertyValue('--accent');
        const backgroundColor = computedStyle.getPropertyValue('--background-color');
        
        assert.ok(accentColor !== '', 'Accent color should be defined');
        assert.ok(backgroundColor !== '', 'Background color should be defined');
    });
    
    QUnit.test('Mobile viewport detection', function(assert) {
        const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;
        const isDesktop = window.innerWidth > CONSTANTS.MOBILE_BREAKPOINT;
        
        assert.ok(typeof isMobile === 'boolean', 'Mobile detection should return boolean');
        assert.ok(typeof isDesktop === 'boolean', 'Desktop detection should return boolean');
        assert.ok(isMobile !== isDesktop, 'Mobile and desktop should be mutually exclusive');
    });
    
    QUnit.test('Template generation works', function(assert) {
        // Test pageLink template
        const pageLink = Templates.pageLink('about', 'About');
        assert.ok(pageLink.includes('About'), 'Page link should include title');
        assert.ok(pageLink.includes('href="/?page=about"'), 'Page link should have correct href');
        
        // Test socialLink template
        const socialData = {
            href: 'https://github.com/test',
            icon: 'fab fa-github',
            target: '_blank'
        };
        const socialLink = Templates.socialLink(socialData);
        assert.ok(socialLink.includes('https://github.com/test'), 'Social link should include href');
        assert.ok(socialLink.includes('fab fa-github'), 'Social link should include icon');
    });
    
    QUnit.test('Error handling works', function(assert) {
        // Test error message template
        const errorMsg = Templates.errorMessage('Test Error', 'Test message');
        assert.ok(errorMsg.includes('Test Error'), 'Error message should include title');
        assert.ok(errorMsg.includes('Test message'), 'Error message should include message');
        assert.ok(errorMsg.includes('error-message'), 'Error message should have correct class');
    });
    
    QUnit.test('Loading spinner works', function(assert) {
        const spinner = Templates.loadingSpinner();
        assert.ok(spinner.includes('loading-spinner'), 'Loading spinner should have correct class');
        assert.ok(spinner.includes('div'), 'Loading spinner should be a div element');
    });
    
});
