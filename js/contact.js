// Contact Page Interactive Features

let currentStep = 1;
const totalSteps = 3;

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeFAQ();
    initializeAIFeatures();
});

// Multi-step form functionality
function initializeContactForm() {
    const form = document.getElementById('mainContactForm');
    if (!form) return;

    // Form validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmission);

    // Initialize progress
    updateProgress();
}

function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
            updateProgress();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });

    // Show current step
    const currentStepEl = document.querySelector(`[data-step="${step}"]`);
    if (currentStepEl) {
        currentStepEl.classList.add('active');
    }

    // Update step indicators
    document.querySelectorAll('.step').forEach((stepEl, index) => {
        stepEl.classList.toggle('active', index + 1 <= step);
        stepEl.classList.toggle('completed', index + 1 < step);
    });
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const percentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = percentage + '%';
    }
}

function validateCurrentStep() {
    const currentStepEl = document.querySelector(`[data-step="${currentStep}"]`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');

    clearFieldError(field);

    if (isRequired && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }

    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }

    // Add success indicator
    field.classList.add('valid');
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    
    // Animate in
    setTimeout(() => {
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translateY(0)';
    }, 10);
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.classList.remove('valid');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Sending Message...';
    submitBtn.disabled = true;

    // Simulate AI processing
    setTimeout(() => {
        showSuccessMessage();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        form.reset();
        currentStep = 1;
        showStep(1);
        updateProgress();
        
        // Clear validation states
        form.querySelectorAll('.valid, .error').forEach(field => {
            field.classList.remove('valid', 'error');
        });
        
    }, 3000);
}

function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="success-icon">✨</div>
            <h2>Message Sent Successfully!</h2>
            <p>Thank you for reaching out. Our AI system has received your message and our team will respond within 24 hours with personalized insights for your project.</p>
            <div class="success-actions">
                <button class="btn btn-primary" onclick="closeSuccessModal()">Continue Exploring</button>
                <a href="showcase.html" class="btn btn-secondary">View Our Work</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    setTimeout(() => {
        successModal.classList.add('active');
    }, 10);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// FAQ functionality
function initializeFAQ() {
    // FAQ items are handled by toggleFAQ function called from HTML
}

function toggleFAQ(questionElement) {
    const faqItem = questionElement.parentNode;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = questionElement.querySelector('.faq-toggle');
    
    const isOpen = faqItem.classList.contains('open');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('open');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.faq-toggle').textContent = '+';
        }
    });
    
    // Toggle current FAQ
    if (isOpen) {
        faqItem.classList.remove('open');
        answer.style.maxHeight = '0';
        toggle.textContent = '+';
    } else {
        faqItem.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
    }
}

// AI-powered features
function initializeAIFeatures() {
    // Initialize AI chat if needed
    if (typeof openAIChat === 'undefined') {
        window.openAIChat = function() {
            showAIChat();
        };
    }
    
    if (typeof openQuickChat === 'undefined') {
        window.openQuickChat = function() {
            showQuickChat();
        };
    }
    
    if (typeof openScheduler === 'undefined') {
        window.openScheduler = function() {
            showScheduler();
        };
    }
}

function showAIChat() {
    const chatModal = document.createElement('div');
    chatModal.className = 'ai-chat-modal';
    chatModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="chat-container">
            <div class="chat-header">
                <h3>AI Assistant</h3>
                <button class="modal-close" onclick="closeChatModal()">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="ai-message">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <p>Hello! I'm the Digital Nexus AI assistant. I can help answer questions about our services, capabilities, and how AI can transform your digital presence. What would you like to know?</p>
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Ask me anything about AI solutions..." onkeypress="handleChatKeypress(event)">
                <button class="btn btn-accent" onclick="sendChatMessage()">Send</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatModal);
    
    setTimeout(() => {
        chatModal.classList.add('active');
        document.getElementById('chatInput').focus();
    }, 10);
}

function closeChatModal() {
    const modal = document.querySelector('.ai-chat-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chatMessages');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-avatar">👤</div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'ai-message typing';
    typingIndicator.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Generate AI response
    setTimeout(() => {
        messagesContainer.removeChild(typingIndicator);
        
        const aiResponse = generateAIResponse(message);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${aiResponse}</p>
            </div>
        `;
        messagesContainer.appendChild(aiMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
}

function generateAIResponse(userMessage) {
    const responses = {
        'ai': "AI enhances web development by automating design decisions, personalizing user experiences, and optimizing performance in real-time. Our AI systems can predict user behavior, adapt interfaces dynamically, and create more engaging digital experiences.",
        'price': "Our pricing varies based on project complexity and scope. We offer flexible packages starting from $10,000 for basic AI-enhanced websites up to $100,000+ for comprehensive digital transformation projects. Each solution is customized to your specific needs.",
        'time': "Project timelines typically range from 4-6 weeks for standard AI-enhanced websites to 3-6 months for complex digital transformation projects. Our AI-powered development tools often accelerate traditional timelines by 40-60%.",
        'support': "We provide comprehensive ongoing support including AI model updates, performance monitoring, security enhancements, and feature evolution. Our AI systems continuously learn and improve, ensuring your digital presence stays cutting-edge.",
        'technology': "We use advanced technologies including machine learning, neural networks, natural language processing, computer vision, and predictive analytics. Our tech stack includes modern frameworks, cloud infrastructure, and custom AI models.",
        'consultation': "I'd be happy to help you schedule a consultation! You can use the 'Schedule Consultation' option above, or fill out our contact form with your project details. Our team will reach out within 24 hours to discuss your specific needs."
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return "That's a great question! Our AI solutions are highly customizable and can address a wide range of digital challenges. I'd recommend scheduling a consultation with our team to discuss your specific needs in detail. They can provide personalized insights and recommendations based on your unique requirements.";
}

function showQuickChat() {
    const quickChatModal = document.createElement('div');
    quickChatModal.className = 'quick-chat-modal';
    quickChatModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeQuickChatModal()">&times;</button>
            <h2>Quick Response</h2>
            <p>Select a topic for instant information:</p>
            <div class="quick-options">
                <button class="quick-option" onclick="showQuickResponse('pricing')">💰 Pricing Information</button>
                <button class="quick-option" onclick="showQuickResponse('timeline')">⏰ Project Timeline</button>
                <button class="quick-option" onclick="showQuickResponse('ai-benefits')">🤖 AI Benefits</button>
                <button class="quick-option" onclick="showQuickResponse('getting-started')">🚀 Getting Started</button>
            </div>
            <div id="quickResponse" class="quick-response"></div>
        </div>
    `;
    
    document.body.appendChild(quickChatModal);
    
    setTimeout(() => {
        quickChatModal.classList.add('active');
    }, 10);
}

function closeQuickChatModal() {
    const modal = document.querySelector('.quick-chat-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function showQuickResponse(topic) {
    const responses = {
        'pricing': {
            title: 'Pricing Information',
            content: 'Our AI-powered solutions are priced based on complexity and scope. Basic AI-enhanced websites start at $10,000, while comprehensive digital transformation projects range from $25,000 to $100,000+. Each project includes ongoing AI optimization and support.'
        },
        'timeline': {
            title: 'Project Timeline',
            content: 'Typical project timelines: Simple AI websites (4-6 weeks), Complex applications (2-4 months), Digital transformation (3-6 months). Our AI development tools accelerate traditional timelines by 40-60%.'
        },
        'ai-benefits': {
            title: 'AI Benefits',
            content: 'AI transforms your digital presence through: Personalized user experiences, Real-time optimization, Predictive analytics, Automated content generation, Intelligent user interfaces, and Continuous performance improvement.'
        },
        'getting-started': {
            title: 'Getting Started',
            content: 'Ready to begin? 1) Fill out our contact form with your project details, 2) Schedule a consultation to discuss your vision, 3) Receive a customized proposal, 4) Begin your AI transformation journey with our expert team.'
        }
    };
    
    const response = responses[topic];
    const responseDiv = document.getElementById('quickResponse');
    
    responseDiv.innerHTML = `
        <h3>${response.title}</h3>
        <p>${response.content}</p>
        <div class="response-actions">
            <a href="#contact-form" class="btn btn-primary" onclick="closeQuickChatModal()">Start Project</a>
            <button class="btn btn-secondary" onclick="showAIChat(); closeQuickChatModal();">Ask More Questions</button>
        </div>
    `;
    
    responseDiv.style.display = 'block';
}

function showScheduler() {
    const schedulerModal = document.createElement('div');
    schedulerModal.className = 'scheduler-modal';
    schedulerModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeSchedulerModal()">&times;</button>
            <h2>Schedule Consultation</h2>
            <p>Book a personalized consultation to discuss your AI transformation needs.</p>
            
            <div class="scheduler-content">
                <div class="time-slots">
                    <h3>Available Time Slots</h3>
                    <div class="slots-grid">
                        <button class="time-slot" onclick="selectTimeSlot(this)">Today 2:00 PM</button>
                        <button class="time-slot" onclick="selectTimeSlot(this)">Today 4:00 PM</button>
                        <button class="time-slot" onclick="selectTimeSlot(this)">Tomorrow 10:00 AM</button>
                        <button class="time-slot" onclick="selectTimeSlot(this)">Tomorrow 2:00 PM</button>
                        <button class="time-slot" onclick="selectTimeSlot(this)">Tomorrow 4:00 PM</button>
                        <button class="time-slot" onclick="selectTimeSlot(this)">Friday 11:00 AM</button>
                    </div>
                </div>
                
                <div class="consultation-form">
                    <h3>Consultation Details</h3>
                    <div class="form-group">
                        <label>Preferred Meeting Type</label>
                        <select>
                            <option>Video Call (Recommended)</option>
                            <option>Phone Call</option>
                            <option>In-Person (Select Locations)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Main Discussion Topics</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                                AI Integration Strategy
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                                Website Development
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                                Digital Transformation
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox">
                                <span class="checkmark"></span>
                                Performance Optimization
                            </label>
                        </div>
                    </div>
                    <button class="btn btn-accent" onclick="confirmScheduling()">Confirm Consultation</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(schedulerModal);
    
    setTimeout(() => {
        schedulerModal.classList.add('active');
    }, 10);
}

function closeSchedulerModal() {
    const modal = document.querySelector('.scheduler-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function selectTimeSlot(button) {
    // Remove active class from all slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add active class to selected slot
    button.classList.add('selected');
}

function confirmScheduling() {
    const selectedSlot = document.querySelector('.time-slot.selected');
    if (!selectedSlot) {
        alert('Please select a time slot');
        return;
    }
    
    // Show confirmation
    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'confirmation-modal';
    confirmationModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="success-icon">📅</div>
            <h2>Consultation Scheduled!</h2>
            <p>Your consultation has been scheduled for <strong>${selectedSlot.textContent}</strong>.</p>
            <p>You'll receive a confirmation email with meeting details and a calendar invite shortly.</p>
            <div class="confirmation-actions">
                <button class="btn btn-primary" onclick="closeAllModals()">Perfect!</button>
                <a href="#contact-form" class="btn btn-secondary" onclick="closeAllModals()">Add More Details</a>
            </div>
        </div>
    `;
    
    document.body.appendChild(confirmationModal);
    
    setTimeout(() => {
        confirmationModal.classList.add('active');
    }, 10);
}

function closeAllModals() {
    document.querySelectorAll('.scheduler-modal, .confirmation-modal').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    });
}

// Add styles for contact page components
const contactStyles = `
    .contact-form-container {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .contact-form {
        padding: 3rem;
    }

    .form-progress {
        margin-bottom: 3rem;
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        margin-bottom: 1rem;
        overflow: hidden;
    }

    .progress-fill {
        height: 100%;
        background: var(--accent-gradient);
        width: 33.33%;
        transition: width 0.5s ease;
    }

    .progress-steps {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .step {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .step.active {
        background: var(--accent-gradient);
        color: white;
    }

    .step.completed {
        background: var(--primary-gradient);
        color: white;
    }

    .form-step {
        display: none;
    }

    .form-step.active {
        display: block;
        animation: fadeInUp 0.5s ease;
    }

    .step-title {
        color: var(--text-primary);
        margin-bottom: 2rem;
        font-size: 1.5rem;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius);
        color: var(--text-primary);
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--text-accent);
        box-shadow: 0 0 0 3px rgba(0, 242, 254, 0.1);
    }

    .form-group input.valid {
        border-color: #4ade80;
    }

    .form-group input.error {
        border-color: #f87171;
    }

    .field-error {
        color: #f87171;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }

    .checkbox-group {
        margin-top: 1rem;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 0.95rem;
    }

    .checkbox-label input[type="checkbox"] {
        display: none;
    }

    .checkmark {
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        position: relative;
        transition: all 0.3s ease;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark {
        background: var(--accent-gradient);
        border-color: transparent;
    }

    .checkbox-label input[type="checkbox"]:checked + .checkmark::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
    }

    .contact-info {
        padding: 2rem;
        height: fit-content;
    }

    .contact-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .contact-item:last-child {
        border-bottom: none;
    }

    .contact-item-icon {
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 242, 254, 0.1);
        border-radius: 50%;
        flex-shrink: 0;
    }

    .contact-item h4 {
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        font-size: 1rem;
    }

    .contact-item p {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin: 0;
    }

    .social-buttons {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .social-btn {
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        color: var(--text-secondary);
        text-decoration: none;
        border-radius: var(--border-radius);
        font-size: 0.875rem;
        transition: all 0.3s ease;
    }

    .social-btn:hover {
        background: var(--accent-gradient);
        color: white;
        transform: translateY(-2px);
    }

    .ai-assistant {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .faq-container {
        max-width: 800px;
        margin: 0 auto;
    }

    .faq-item {
        background: var(--surface-primary);
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .faq-item:hover {
        border-color: var(--text-accent);
    }

    .faq-question {
        padding: 1.5rem;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background 0.3s ease;
    }

    .faq-question:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .faq-question h3 {
        color: var(--text-primary);
        margin: 0;
        font-size: 1.1rem;
    }

    .faq-toggle {
        color: var(--text-accent);
        font-size: 1.5rem;
        font-weight: bold;
        transition: transform 0.3s ease;
    }

    .faq-item.open .faq-toggle {
        transform: rotate(45deg);
    }

    .faq-answer {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }

    .faq-answer p {
        padding: 0 1.5rem 1.5rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
    }

    /* Modal Styles */
    .success-modal,
    .ai-chat-modal,
    .quick-chat-modal,
    .scheduler-modal,
    .confirmation-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .success-modal.active,
    .ai-chat-modal.active,
    .quick-chat-modal.active,
    .scheduler-modal.active,
    .confirmation-modal.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        background: var(--surface-primary);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius-large);
        padding: 2rem;
        overflow-y: auto;
        transition: transform 0.3s ease;
    }

    .success-modal.active .modal-content,
    .ai-chat-modal.active .modal-content,
    .quick-chat-modal.active .modal-content,
    .scheduler-modal.active .modal-content,
    .confirmation-modal.active .modal-content {
        transform: translate(-50%, -50%) scale(1);
    }

    .success-icon {
        font-size: 4rem;
        text-align: center;
        margin-bottom: 1rem;
    }

    .success-actions,
    .response-actions,
    .confirmation-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
        flex-wrap: wrap;
    }

    /* Chat Styles */
    .chat-container {
        width: 90%;
        max-width: 500px;
        height: 600px;
        display: flex;
        flex-direction: column;
        background: var(--surface-primary);
        border-radius: var(--border-radius-large);
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }

    .chat-header {
        padding: 1rem;
        background: var(--accent-gradient);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chat-messages {
        flex: 1;
        padding: 1rem;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .ai-message,
    .user-message {
        display: flex;
        gap: 0.75rem;
        align-items: flex-start;
    }

    .user-message {
        flex-direction: row-reverse;
    }

    .message-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--surface-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        flex-shrink: 0;
    }

    .message-content {
        background: var(--surface-secondary);
        padding: 0.75rem 1rem;
        border-radius: var(--border-radius);
        max-width: 80%;
    }

    .user-message .message-content {
        background: var(--accent-gradient);
        color: white;
    }

    .message-content p {
        margin: 0;
        color: var(--text-primary);
        line-height: 1.4;
    }

    .user-message .message-content p {
        color: white;
    }

    .typing-dots {
        display: flex;
        gap: 4px;
        align-items: center;
    }

    .typing-dots span {
        width: 6px;
        height: 6px;
        background: var(--text-accent);
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }

    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }

    @keyframes typing {
        0%, 60%, 100% {
            transform: translateY(0);
        }
        30% {
            transform: translateY(-10px);
        }
    }

    .chat-input-container {
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        gap: 0.75rem;
    }

    .chat-input-container input {
        flex: 1;
        padding: 0.75rem;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius);
        color: var(--text-primary);
    }

    /* Quick Chat Styles */
    .quick-options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 2rem 0;
    }

    .quick-option {
        padding: 1rem;
        background: var(--surface-secondary);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
    }

    .quick-option:hover {
        background: var(--accent-gradient);
        color: white;
        transform: translateY(-2px);
    }

    .quick-response {
        display: none;
        background: var(--surface-secondary);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        margin-top: 1rem;
    }

    .quick-response h3 {
        color: var(--text-accent);
        margin-bottom: 1rem;
    }

    /* Scheduler Styles */
    .scheduler-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 2rem;
    }

    .slots-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .time-slot {
        padding: 1rem;
        background: var(--surface-secondary);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius);
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: left;
    }

    .time-slot:hover {
        background: rgba(0, 242, 254, 0.1);
        border-color: var(--text-accent);
    }

    .time-slot.selected {
        background: var(--accent-gradient);
        color: white;
        border-color: transparent;
    }

    .consultation-form h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .contact-form-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .form-row {
            grid-template-columns: 1fr;
        }
        
        .quick-options {
            grid-template-columns: 1fr;
        }
        
        .scheduler-content {
            grid-template-columns: 1fr;
        }
        
        .chat-container {
            width: 95%;
            height: 80vh;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = contactStyles;
document.head.appendChild(styleSheet);

