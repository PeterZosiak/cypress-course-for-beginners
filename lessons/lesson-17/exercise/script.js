// Cypress Real-World Problems & Solutions - Interactive Application
// This application demonstrates various testing scenarios from Lesson 17

class CypressTestingApp {
    constructor() {
        this.currentSection = 'dynamic-content';
        this.retryCounter = 0;
        this.userSession = null;
        this.flakyAttempts = 0;
        
        this.init();
    }
    
    init() {
        this.setupNavigation();
        this.setupDynamicContent();
        this.setupFlakyElements();
        this.setupComplexInteractions();
        this.setupSessionManagement();
        this.setupMultiDomain();
        this.showSection(this.currentSection);
    }
    
    // Navigation Setup
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.getAttribute('data-testid').replace('-nav', '');
                this.showSection(section);
                this.updateNavActive(btn);
            });
        });
    }
    
    showSection(sectionId) {
        document.querySelectorAll('.scenario-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        this.currentSection = sectionId;
    }
    
    updateNavActive(activeBtn) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        activeBtn.classList.add('active');
    }
    
    // Dynamic Content & Asynchronous Behavior
    setupDynamicContent() {
        const loadDynamicBtn = document.querySelector('[data-testid="load-dynamic-content"]');
        const loadAsyncBtn = document.querySelector('[data-testid="load-async-data"]');
        const animateBtn = document.querySelector('[data-testid="trigger-animation"]');
        
        loadDynamicBtn.addEventListener('click', () => this.loadDynamicContent());
        loadAsyncBtn.addEventListener('click', () => this.loadAsyncData());
        animateBtn.addEventListener('click', () => this.triggerAnimation());
    }
    
    async loadDynamicContent() {
        const container = document.querySelector('[data-testid="dynamic-list"]');
        const loading = document.querySelector('[data-testid="loading-indicator"]');
        const status = document.querySelector('[data-testid="status"]');
        
        // Show loading state
        status.textContent = 'Loading';
        status.className = 'status-indicator loading';
        loading.classList.remove('hidden');
        container.classList.add('hidden');
        
        // Simulate network delay
        await this.delay(Math.random() * 2000 + 1000); // 1-3 seconds
        
        // Generate dynamic content
        const items = [
            'Dynamic Item 1 - Loaded successfully',
            'Dynamic Item 2 - Content updated',
            'Dynamic Item 3 - Real-time data',
            'Dynamic Item 4 - Asynchronous result',
            'Dynamic Item 5 - Test automation ready'
        ];
        
        container.innerHTML = items.map((item, index) => 
            `<div class="dynamic-list-item" data-testid="dynamic-item-${index + 1}">${item}</div>`
        ).join('');
        
        // Show results
        loading.classList.add('hidden');
        container.classList.remove('hidden');
        status.textContent = 'Loaded';
        status.className = 'status-indicator';
    }
    
    async loadAsyncData() {
        const resultDiv = document.querySelector('[data-testid="async-result"]');
        const status = document.querySelector('[data-testid="status"]');
        
        status.textContent = 'Fetching';
        status.className = 'status-indicator loading';
        resultDiv.classList.add('hidden');
        
        // Simulate API call with random success/failure
        await this.delay(1500);
        
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        if (isSuccess) {
            resultDiv.innerHTML = `
                <h4>API Response Successful</h4>
                <p>Data loaded at: ${new Date().toLocaleTimeString()}</p>
                <p>Status: Success</p>
                <p>Records: ${Math.floor(Math.random() * 100) + 1}</p>
            `;
            resultDiv.classList.remove('hidden');
            status.textContent = 'Ready';
            status.className = 'status-indicator';
        } else {
            status.textContent = 'Error';
            status.className = 'status-indicator error';
            resultDiv.innerHTML = '<h4>API Error</h4><p>Failed to load data. Please try again.</p>';
            resultDiv.classList.remove('hidden');
        }
    }
    
    triggerAnimation() {
        const animatedElement = document.querySelector('[data-testid="animated-element"]');
        animatedElement.classList.add('animate');
        
        setTimeout(() => {
            animatedElement.classList.remove('animate');
        }, 1000);
    }
    
    // Flaky Elements & Reliability Issues
    setupFlakyElements() {
        const sometimesFailBtn = document.querySelector('[data-testid="sometimes-fail-btn"]');
        const networkBtn = document.querySelector('[data-testid="network-dependent-btn"]');
        const timingBtn = document.querySelector('[data-testid="timing-sensitive-btn"]');
        
        sometimesFailBtn.addEventListener('click', () => this.handleSometimesFail());
        networkBtn.addEventListener('click', () => this.handleNetworkDependent());
        timingBtn.addEventListener('click', () => this.handleTimingSensitive());
    }
    
    async handleSometimesFail() {
        const flakyElement = document.querySelector('[data-testid="flaky-element"]');
        const retryCounter = document.querySelector('[data-testid="retry-counter"]');
        
        this.flakyAttempts++;
        retryCounter.textContent = `Attempts: ${this.flakyAttempts}`;
        
        // Randomly fail 40% of the time
        const shouldFail = Math.random() < 0.4;
        
        if (shouldFail) {
            flakyElement.textContent = 'Element Failed!';
            flakyElement.className = 'flaky-item error';
            
            // Reset after 2 seconds
            setTimeout(() => {
                flakyElement.textContent = 'Flaky Element';
                flakyElement.className = 'flaky-item';
            }, 2000);
        } else {
            flakyElement.textContent = 'Element Success!';
            flakyElement.className = 'flaky-item success';
            
            setTimeout(() => {
                flakyElement.textContent = 'Flaky Element';
                flakyElement.className = 'flaky-item';
            }, 2000);
        }
    }
    
    async handleNetworkDependent() {
        const networkStatus = document.querySelector('[data-testid="network-status"]');
        
        // Simulate network instability
        networkStatus.textContent = 'Network: Checking...';
        networkStatus.className = 'network-status';
        
        await this.delay(1000);
        
        const isOnline = Math.random() > 0.3; // 70% online
        
        if (isOnline) {
            networkStatus.textContent = 'Network: Online';
            networkStatus.className = 'network-status';
        } else {
            networkStatus.textContent = 'Network: Offline';
            networkStatus.className = 'network-status offline';
            
            // Auto-recover after 3 seconds
            setTimeout(() => {
                networkStatus.textContent = 'Network: OK';
                networkStatus.className = 'network-status';
            }, 3000);
        }
    }
    
    async handleTimingSensitive() {
        const timingResult = document.querySelector('[data-testid="timing-result"]');
        
        timingResult.classList.remove('hidden');
        timingResult.textContent = 'Processing...';
        timingResult.className = 'timing-result';
        
        // Random delay between 500ms and 5 seconds
        const delay = Math.random() * 4500 + 500;
        await this.delay(delay);
        
        if (delay > 3000) {
            timingResult.textContent = `Slow Response: ${delay.toFixed(0)}ms`;
            timingResult.className = 'timing-result slow';
        } else {
            timingResult.textContent = `Fast Response: ${delay.toFixed(0)}ms`;
            timingResult.className = 'timing-result';
        }
        
        // Hide after 3 seconds
        setTimeout(() => {
            timingResult.classList.add('hidden');
        }, 3000);
    }
    
    // Complex User Interactions
    setupComplexInteractions() {
        this.setupModals();
        this.setupDragDrop();
        this.setupMultiStepForm();
    }
    
    setupModals() {
        const openModalBtn = document.querySelector('[data-testid="open-modal-btn"]');
        const openNestedBtn = document.querySelector('[data-testid="open-nested-modal-btn"]');
        const closeModalBtn = document.querySelector('[data-testid="close-modal"]');
        const closeNestedBtn = document.querySelector('[data-testid="close-nested-modal"]');
        const openNestedFromModal = document.querySelector('[data-testid="open-nested-modal"]');
        
        openModalBtn.addEventListener('click', () => this.openModal());
        openNestedBtn.addEventListener('click', () => this.openNestedModal());
        closeModalBtn.addEventListener('click', () => this.closeModal());
        closeNestedBtn.addEventListener('click', () => this.closeNestedModal());
        openNestedFromModal.addEventListener('click', () => this.openNestedModal());
        
        // Close modals on overlay click
        document.querySelector('[data-testid="modal-overlay"]').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });
        
        document.querySelector('[data-testid="nested-modal-overlay"]').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeNestedModal();
        });
    }
    
    openModal() {
        document.querySelector('[data-testid="modal-overlay"]').classList.remove('hidden');
    }
    
    closeModal() {
        document.querySelector('[data-testid="modal-overlay"]').classList.add('hidden');
    }
    
    openNestedModal() {
        document.querySelector('[data-testid="nested-modal-overlay"]').classList.remove('hidden');
    }
    
    closeNestedModal() {
        document.querySelector('[data-testid="nested-modal-overlay"]').classList.add('hidden');
    }
    
    setupDragDrop() {
        const draggableItems = document.querySelectorAll('.draggable-item');
        const dropZone = document.querySelector('[data-testid="drop-zone"]');
        
        draggableItems.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.textContent);
                e.target.classList.add('dragging');
            });
            
            item.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
        });
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            const droppedElement = document.createElement('span');
            droppedElement.className = 'dropped-item';
            droppedElement.textContent = data;
            droppedElement.setAttribute('data-testid', `dropped-${data.toLowerCase().replace(' ', '-')}`);
            
            if (dropZone.textContent === 'Drop items here') {
                dropZone.textContent = '';
            }
            dropZone.appendChild(droppedElement);
            dropZone.classList.remove('drag-over');
        });
    }
    
    setupMultiStepForm() {
        const nextBtn = document.querySelector('[data-testid="next-step-1"]');
        const prevBtn = document.querySelector('[data-testid="prev-step-2"]');
        const form = document.querySelector('[data-testid="multi-step-form"]');
        
        nextBtn.addEventListener('click', () => this.nextFormStep());
        prevBtn.addEventListener('click', () => this.prevFormStep());
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
    
    nextFormStep() {
        const firstName = document.querySelector('[data-testid="first-name"]').value;
        const lastName = document.querySelector('[data-testid="last-name"]').value;
        
        if (firstName && lastName) {
            document.querySelector('[data-testid="step-1"]').classList.remove('active');
            document.querySelector('[data-testid="step-1"]').classList.add('hidden');
            document.querySelector('[data-testid="step-2"]').classList.remove('hidden');
            document.querySelector('[data-testid="step-2"]').classList.add('active');
        } else {
            alert('Please fill in all required fields');
        }
    }
    
    prevFormStep() {
        document.querySelector('[data-testid="step-2"]').classList.remove('active');
        document.querySelector('[data-testid="step-2"]').classList.add('hidden');
        document.querySelector('[data-testid="step-1"]').classList.remove('hidden');
        document.querySelector('[data-testid="step-1"]').classList.add('active');
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        const email = document.querySelector('[data-testid="email"]').value;
        const phone = document.querySelector('[data-testid="phone"]').value;
        
        if (email && phone) {
            // Simulate form submission
            await this.delay(1000);
            
            document.querySelector('[data-testid="multi-step-form"]').classList.add('hidden');
            document.querySelector('[data-testid="form-result"]').classList.remove('hidden');
        } else {
            alert('Please fill in all required fields');
        }
    }
    
    // Session & State Management
    setupSessionManagement() {
        const loginForm = document.querySelector('[data-testid="login-form"]');
        const logoutBtn = document.querySelector('[data-testid="logout-btn"]');
        
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        logoutBtn.addEventListener('click', () => this.handleLogout());
        
        // Check for existing session
        this.checkExistingSession();
    }
    
    checkExistingSession() {
        const savedSession = localStorage.getItem('userSession');
        if (savedSession) {
            this.userSession = JSON.parse(savedSession);
            this.showDashboard();
        }
    }
    
    async handleLogin(e) {
        e.preventDefault();
        const username = document.querySelector('[data-testid="login-username-input"]').value;
        const password = document.querySelector('[data-testid="login-password-input"]').value;
        
        // Clear previous messages
        document.querySelector('[data-testid="login-success-message"]').classList.add('hidden');
        document.querySelector('[data-testid="login-error-message"]').classList.add('hidden');
        
        // Simulate login delay
        await this.delay(1000);
        
        if (username === 'demoUser' && password === 'demoPass') {
            this.userSession = {
                username: username,
                loginTime: new Date().toLocaleString(),
                sessionId: Math.random().toString(36).substr(2, 9)
            };
            
            // Save session to localStorage (simulating session caching)
            localStorage.setItem('userSession', JSON.stringify(this.userSession));
            
            document.querySelector('[data-testid="login-success-message"]').classList.remove('hidden');
            
            setTimeout(() => {
                this.showDashboard();
            }, 1000);
        } else {
            document.querySelector('[data-testid="login-error-message"]').classList.remove('hidden');
        }
    }
    
    showDashboard() {
        document.querySelector('[data-testid="login-area"]').classList.add('hidden');
        document.querySelector('[data-testid="dashboard-area"]').classList.remove('hidden');
        
        // Update dashboard with user info
        document.querySelector('[data-testid="profile-username"]').textContent = this.userSession.username;
        document.querySelector('[data-testid="last-login"]').textContent = this.userSession.loginTime;
    }
    
    handleLogout() {
        this.userSession = null;
        localStorage.removeItem('userSession');
        
        document.querySelector('[data-testid="dashboard-area"]').classList.add('hidden');
        document.querySelector('[data-testid="login-area"]').classList.remove('hidden');
        document.querySelector('[data-testid="login-success-message"]').classList.add('hidden');
        document.querySelector('[data-testid="login-error-message"]').classList.add('hidden');
        
        // Reset form
        document.querySelector('[data-testid="login-form"]').reset();
        document.querySelector('[data-testid="login-username-input"]').value = 'demoUser';
        document.querySelector('[data-testid="login-password-input"]').value = 'demoPass';
    }
    
    // Multi-domain Testing Simulation
    setupMultiDomain() {
        const loadExternalBtn = document.querySelector('[data-testid="load-external-content"]');
        const simulateOAuthBtn = document.querySelector('[data-testid="simulate-oauth"]');
        const apiSuccessBtn = document.querySelector('[data-testid="api-success-btn"]');
        const apiErrorBtn = document.querySelector('[data-testid="api-error-btn"]');
        const apiSlowBtn = document.querySelector('[data-testid="api-slow-btn"]');
        
        loadExternalBtn.addEventListener('click', () => this.loadExternalContent());
        simulateOAuthBtn.addEventListener('click', () => this.simulateOAuth());
        apiSuccessBtn.addEventListener('click', () => this.simulateApiResponse('success'));
        apiErrorBtn.addEventListener('click', () => this.simulateApiResponse('error'));
        apiSlowBtn.addEventListener('click', () => this.simulateApiResponse('slow'));
    }
    
    loadExternalContent() {
        const iframe = document.querySelector('[data-testid="external-iframe"]');
        const container = document.querySelector('[data-testid="external-frame-container"]');
        
        // Create a simple HTML content to simulate external domain
        const externalContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; background: #f0f8ff; }
                    h3 { color: #667eea; }
                    .external-element { 
                        background: #667eea; 
                        color: white; 
                        padding: 10px; 
                        border-radius: 5px; 
                        margin: 10px 0; 
                    }
                    .auth-section { 
                        background: white; 
                        padding: 15px; 
                        border-radius: 5px; 
                        margin: 10px 0; 
                    }
                </style>
            </head>
            <body>
                <h3>External Domain Simulation</h3>
                <div class="external-element" data-testid="external-element">
                    External Element - Visible
                </div>
                <div class="auth-section">
                    <h4>Authentication Simulation</h4>
                    <input data-testid="auth-username" type="text" placeholder="External Username" value="externalUser">
                    <input data-testid="auth-password" type="password" placeholder="External Password" value="externalPass">
                    <button data-testid="auth-submit" onclick="parent.postMessage('auth-success', '*')">Authenticate</button>
                </div>
                <div data-testid="external-dashboard" style="background: #e8f5e8; padding: 10px; border-radius: 5px; margin: 10px 0;">
                    External Dashboard Content
                </div>
            </body>
            </html>
        `;
        
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(externalContent);
        iframe.classList.remove('hidden');
        
        // Listen for messages from iframe
        window.addEventListener('message', (event) => {
            if (event.data === 'auth-success') {
                this.handleExternalAuth();
            }
        });
    }
    
    handleExternalAuth() {
        const oauthResult = document.querySelector('[data-testid="oauth-result"]');
        oauthResult.classList.remove('hidden');
        
        setTimeout(() => {
            oauthResult.classList.add('hidden');
        }, 5000);
    }
    
    async simulateOAuth() {
        const oauthResult = document.querySelector('[data-testid="oauth-result"]');
        oauthResult.textContent = 'Initiating OAuth flow...';
        oauthResult.className = 'oauth-result';
        oauthResult.classList.remove('hidden');
        
        await this.delay(2000);
        
        oauthResult.textContent = 'OAuth authentication successful!';
        
        setTimeout(() => {
            oauthResult.classList.add('hidden');
        }, 3000);
    }
    
    async simulateApiResponse(type) {
        const apiResult = document.querySelector('[data-testid="api-result"]');
        
        apiResult.className = 'api-result loading';
        apiResult.textContent = 'Making API request...';
        
        let delay = 1000;
        if (type === 'slow') {
            delay = 5000; // 5 second delay for slow response
        }
        
        await this.delay(delay);
        
        switch (type) {
            case 'success':
                apiResult.className = 'api-result success';
                apiResult.innerHTML = `
                    <div><strong>API Success Response</strong></div>
                    <div>Status: 200 OK</div>
                    <div>Response time: ${delay}ms</div>
                    <div>Data: {"status": "success", "message": "Operation completed"}</div>
                `;
                break;
            case 'error':
                apiResult.className = 'api-result error';
                apiResult.innerHTML = `
                    <div><strong>API Error Response</strong></div>
                    <div>Status: 500 Internal Server Error</div>
                    <div>Response time: ${delay}ms</div>
                    <div>Error: {"status": "error", "message": "Server error occurred"}</div>
                `;
                break;
            case 'slow':
                apiResult.className = 'api-result success';
                apiResult.innerHTML = `
                    <div><strong>API Slow Response</strong></div>
                    <div>Status: 200 OK (Slow)</div>
                    <div>Response time: ${delay}ms</div>
                    <div>Data: {"status": "success", "message": "Slow operation completed"}</div>
                `;
                break;
        }
        
        // Clear result after 10 seconds
        setTimeout(() => {
            apiResult.className = 'api-result';
            apiResult.textContent = '';
        }, 10000);
    }
    
    // Utility function for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CypressTestingApp();
});

// Global functions for iframe interactions
window.handleExternalAuth = function() {
    window.dispatchEvent(new CustomEvent('external-auth-success'));
};