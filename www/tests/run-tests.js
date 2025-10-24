// Simple test runner for automated testing
// This can be used to run tests programmatically

class TestRunner {
    constructor() {
        this.results = [];
        this.startTime = Date.now();
    }
    
    async runAllTests() {
        console.log('🧪 Starting automated test run...');
        
        try {
            // Test utility functions
            await this.testUtilities();
            
            // Test templates
            await this.testTemplates();
            
            // Test search functionality
            await this.testSearch();
            
            // Test routing
            await this.testRouting();
            
            // Test DOM
            await this.testDOM();
            
            this.printResults();
            
        } catch (error) {
            console.error('❌ Test run failed:', error);
        }
    }
    
    async testUtilities() {
        console.log('Testing utilities...');
        
        // Test escapeHtml
        if (typeof escapeHtml === 'function') {
            const escaped = escapeHtml('<script>alert("xss")</script>');
            this.addResult('escapeHtml', escaped.includes('&lt;'), 'Should escape HTML');
        } else {
            this.addResult('escapeHtml', false, 'escapeHtml function not found');
        }
        
        // Test setDocumentTitle
        if (typeof setDocumentTitle === 'function') {
            const originalTitle = document.title;
            setDocumentTitle({ site: { title: 'Test' } });
            this.addResult('setDocumentTitle', document.title === 'Test', 'Should set title');
            document.title = originalTitle;
        } else {
            this.addResult('setDocumentTitle', false, 'setDocumentTitle function not found');
        }
    }
    
    async testTemplates() {
        console.log('Testing templates...');
        
        if (typeof Templates === 'object' && typeof Templates.navbar === 'function') {
            const navbar = Templates.navbar([], [], [], '', '', 'Test');
            this.addResult('navbar template', navbar.includes('Test'), 'Should include title');
        } else {
            this.addResult('navbar template', false, 'Templates.navbar not found');
        }
        
        if (typeof Templates === 'object' && typeof Templates.pageLink === 'function') {
            const pageLink = Templates.pageLink('about', 'About');
            this.addResult('pageLink template', pageLink.includes('About'), 'Should include title');
        } else {
            this.addResult('pageLink template', false, 'Templates.pageLink not found');
        }
    }
    
    async testSearch() {
        console.log('Testing search...');
        
        this.addResult('Search object exists', typeof Search === 'object', 'Search should be an object');
        this.addResult('Search data is array', Array.isArray(Search.data), 'Search data should be array');
    }
    
    async testRouting() {
        console.log('Testing routing...');
        
        this.addResult('Constants defined', typeof CONSTANTS === 'object', 'Constants should be defined');
        this.addResult('DOMCache exists', typeof DOMCache === 'object', 'DOMCache should exist');
    }
    
    async testDOM() {
        console.log('Testing DOM...');
        
        const navbar = document.getElementById('navbar-container');
        this.addResult('Navbar exists', navbar !== null, 'Navbar container should exist');
        
        const main = document.getElementById('main-content');
        this.addResult('Main exists', main !== null, 'Main content should exist');
    }
    
    addResult(testName, passed, description) {
        this.results.push({
            name: testName,
            passed,
            description
        });
    }
    
    printResults() {
        const passed = this.results.filter(r => r.passed).length;
        const failed = this.results.filter(r => !r.passed).length;
        const duration = Date.now() - this.startTime;
        
        console.log('\n📊 Test Results:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⏱️  Duration: ${duration}ms`);
        
        if (failed > 0) {
            console.log('\n❌ Failed tests:');
            this.results.filter(r => !r.passed).forEach(r => {
                console.log(`  - ${r.name}: ${r.description}`);
            });
        }
        
        console.log('\n🎉 Test run completed!');
    }
}

// Auto-run if this script is loaded directly
if (typeof window !== 'undefined') {
    const runner = new TestRunner();
    runner.runAllTests();
}
