QUnit.module('Utility Functions', function() {
    
    QUnit.test('escapeHtml should escape HTML characters', function(assert) {
        const input = '<script>alert("xss")</script>';
        const expected = '&lt;script&gt;alert("xss")&lt;/script&gt;';
        const result = escapeHtml(input);
        
        assert.equal(result, expected, 'HTML characters should be properly escaped');
    });
    
    QUnit.test('escapeHtml should handle empty string', function(assert) {
        const result = escapeHtml('');
        assert.equal(result, '', 'Empty string should return empty string');
    });
    
    QUnit.test('escapeHtml should handle null and undefined', function(assert) {
        assert.equal(escapeHtml(null), '', 'null should return empty string');
        assert.equal(escapeHtml(undefined), '', 'undefined should return empty string');
    });
    
    QUnit.test('setDocumentTitle should set document title', function(assert) {
        const originalTitle = document.title;
        const testData = { site: { title: 'Test Site' } };
        
        setDocumentTitle(testData);
        assert.equal(document.title, 'Test Site', 'Should set title from data');
        
        // Test fallback
        setDocumentTitle({});
        assert.equal(document.title, CONSTANTS.DEFAULT_TITLE, 'Should use default title when no site title');
        
        // Restore original title
        document.title = originalTitle;
    });
    
    QUnit.test('html template function should work with strings', function(assert) {
        const result = html`Hello ${'World'}`;
        assert.equal(result, 'Hello World', 'Should interpolate strings correctly');
    });
    
    QUnit.test('html template function should escape HTML', function(assert) {
        const result = html`<div>${'<script>alert("xss")</script>'}</div>`;
        const expected = '<div>&lt;script&gt;alert("xss")&lt;/script&gt;</div>';
        assert.equal(result, expected, 'Should escape HTML in interpolated values');
    });
    
    QUnit.test('html template function should handle safe content', function(assert) {
        const safeContent = safe('<div>Safe HTML</div>');
        const result = html`${safeContent}`;
        assert.equal(result, '<div>Safe HTML</div>', 'Should not escape safe content');
    });
    
});
