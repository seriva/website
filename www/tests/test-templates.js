QUnit.module('Templates', function() {
    
    QUnit.test('navbar template should generate valid HTML', function(assert) {
        const result = Templates.navbar(
            '<li>Blog</li>',
            '<li>Projects</li>',
            '<li>About</li>',
            '<li>Social</li>',
            '<li>Search</li>',
            'Test Site'
        );
        
        assert.ok(result.includes('Test Site'), 'Should include site title');
        assert.ok(result.includes('navbar'), 'Should include navbar class');
        assert.ok(result.includes('navbar-container'), 'Should include navbar container');
        assert.ok(result.includes('navbar-collapse'), 'Should include navbar collapse');
    });
    
    QUnit.test('pageLink template should generate valid link', function(assert) {
        const result = Templates.pageLink('about', 'About');
        
        assert.ok(result.includes('href="/?page=about"'), 'Should include correct href');
        assert.ok(result.includes('About'), 'Should include page title');
        assert.ok(result.includes('data-spa-route="page"'), 'Should include SPA route attribute');
        assert.ok(result.includes('nav-item'), 'Should include nav-item class');
    });
    
    QUnit.test('pageLink template should handle blog pages', function(assert) {
        const result = Templates.pageLink('blog', 'Blog');
        
        assert.ok(result.includes('href="/?blog"'), 'Should include blog href');
        assert.ok(result.includes('Blog'), 'Should include page title');
        assert.ok(result.includes('data-spa-route="page"'), 'Should include page route attribute');
    });
    
    QUnit.test('socialLink template should generate social link', function(assert) {
        const socialData = {
            href: 'https://github.com/test',
            icon: 'fab fa-github',
            target: '_blank'
        };
        
        const result = Templates.socialLink(socialData);
        
        assert.ok(result.includes('href="https://github.com/test"'), 'Should include href');
        assert.ok(result.includes('fab fa-github'), 'Should include icon class');
        assert.ok(result.includes('target="_blank"'), 'Should include target attribute');
    });
    
    QUnit.test('loadingSpinner template should generate spinner', function(assert) {
        const result = Templates.loadingSpinner();
        
        assert.ok(result.includes('loading-spinner'), 'Should include loading-spinner class');
        assert.ok(result.includes('div'), 'Should be a div element');
    });
    
    QUnit.test('errorMessage template should generate error message', function(assert) {
        const result = Templates.errorMessage('Test Error', 'Test message');
        
        assert.ok(result.includes('error-message'), 'Should include error-message class');
        assert.ok(result.includes('Test Error'), 'Should include error title');
        assert.ok(result.includes('Test message'), 'Should include error message');
    });
    
    QUnit.test('markdown template should handle content', function(assert) {
        const result = Templates.markdown('# Test\n\nThis is a test.');
        
        // The result can be either a safe object or html template result
        if (result.__safe === true) {
            assert.ok(result.content.includes('markdown-body'), 'Should include markdown-body class');
            assert.ok(result.content.includes('h1'), 'Should parse markdown to HTML');
        } else {
            // If marked is not available, it returns an html template result
            assert.ok(result.includes('markdown-body'), 'Should include markdown-body class');
        }
    });
    
    QUnit.test('markdown template should handle empty content', function(assert) {
        const result = Templates.markdown('');
        
        // The result can be either a safe object or html template result
        if (result.__safe === true) {
            assert.ok(result.content.includes('markdown-body'), 'Should include markdown-body class');
        } else {
            // If marked is not available, it returns an html template result
            assert.ok(result.includes('markdown-body'), 'Should include markdown-body class');
        }
    });
    
});
