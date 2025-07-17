// Showcase Page Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioFilter();
    initializePortfolioModal();
    initializeMetricsAnimation();
});

// Portfolio filtering system
function initializePortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    // Animate in
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Portfolio modal system
function initializePortfolioModal() {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    portfolioButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            showPortfolioModal(index);
        });
    });
}

function showPortfolioModal(index) {
    const projects = [
        {
            title: "Neural Design System",
            description: "An revolutionary AI-powered design system that fundamentally transforms how visual identities are created and maintained. This system goes beyond traditional design tools by incorporating deep learning algorithms that understand the psychological impact of colors, typography, and spatial relationships. The neural network analyzes thousands of successful brand implementations to generate cohesive visual identities that resonate with target audiences on both conscious and subconscious levels.",
            features: [
                "Advanced color psychology analysis",
                "Automated typography pairing",
                "Brand personality mapping",
                "Cross-platform consistency",
                "Real-time design optimization"
            ],
            technologies: ["TensorFlow", "Computer Vision", "Design APIs", "Machine Learning"],
            impact: "Reduced design iteration time by 75% while improving brand recognition scores by 40%"
        },
        {
            title: "Adaptive User Interface",
            description: "A groundbreaking interface technology that represents the next evolution in user experience design. This system continuously learns from user interactions, preferences, and behavioral patterns to create increasingly personalized and intuitive interfaces. The adaptive UI doesn't just respond to user actions—it anticipates needs, adjusts complexity based on user expertise, and optimizes layouts for individual cognitive patterns.",
            features: [
                "Real-time interface morphing",
                "Predictive user need analysis",
                "Cognitive load optimization",
                "Accessibility adaptation",
                "Performance-based adjustments"
            ],
            technologies: ["React", "Machine Learning", "User Analytics", "A/B Testing"],
            impact: "Increased user engagement by 92% and reduced task completion time by 60%"
        },
        {
            title: "Cognitive Content Engine",
            description: "An intelligent content creation and optimization system that understands the nuances of human communication and engagement. This AI-powered engine analyzes audience sentiment, engagement patterns, and conversion data to create content that not only informs but truly connects with readers. The system continuously learns from performance metrics to refine its understanding of what resonates with different audience segments.",
            features: [
                "Sentiment-driven content creation",
                "Audience psychology analysis",
                "Multi-format content optimization",
                "Real-time performance tracking",
                "Automated A/B testing"
            ],
            technologies: ["Natural Language Processing", "Sentiment Analysis", "Content APIs", "Analytics"],
            impact: "Improved content engagement rates by 180% and conversion rates by 45%"
        },
        {
            title: "Predictive Experience Platform",
            description: "A revolutionary platform that doesn't just respond to user needs—it anticipates them. By analyzing vast amounts of user behavior data, market trends, and contextual information, this system creates proactive experiences that feel almost magical in their relevance and timing. The platform represents a fundamental shift from reactive to predictive user experience design.",
            features: [
                "Behavioral pattern recognition",
                "Market trend integration",
                "Contextual experience delivery",
                "Proactive recommendation engine",
                "Predictive analytics dashboard"
            ],
            technologies: ["Predictive Analytics", "Big Data", "Machine Learning", "Real-time Processing"],
            impact: "Increased user satisfaction scores by 85% and reduced bounce rates by 55%"
        },
        {
            title: "Quantum Web Architecture",
            description: "A next-generation web architecture that leverages quantum computing principles to achieve unprecedented performance and scalability. This innovative approach to web infrastructure represents a quantum leap in how we think about data processing, security, and user experience delivery. The architecture is designed to handle the computational demands of tomorrow's AI-driven applications.",
            features: [
                "Quantum-inspired algorithms",
                "Parallel processing optimization",
                "Advanced encryption protocols",
                "Scalable infrastructure design",
                "Performance monitoring"
            ],
            technologies: ["Quantum Computing", "Advanced Algorithms", "Cloud Infrastructure", "Security"],
            impact: "Achieved 10x performance improvement and 99.99% uptime reliability"
        },
        {
            title: "Intelligent Security Matrix",
            description: "A self-evolving security system that adapts to emerging threats while maintaining seamless user experience. This AI-powered security matrix continuously learns from global threat patterns, user behavior anomalies, and system vulnerabilities to provide proactive protection that evolves faster than potential threats. The system balances maximum security with optimal user experience.",
            features: [
                "Adaptive threat detection",
                "Behavioral anomaly analysis",
                "Real-time threat response",
                "User experience optimization",
                "Predictive vulnerability assessment"
            ],
            technologies: ["AI Security", "Behavioral Analysis", "Threat Intelligence", "Encryption"],
            impact: "Reduced security incidents by 95% while maintaining 100% user experience satisfaction"
        }
    ];

    const project = projects[index];
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2>${project.title}</h2>
            </div>
            <div class="modal-body">
                <p class="project-description">${project.description}</p>
                
                <div class="project-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-tech">
                    <h3>Technologies</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-impact">
                    <h3>Impact</h3>
                    <p>${project.impact}</p>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    // Close handlers
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }

    // Escape key handler
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Animated metrics counter
function initializeMetricsAnimation() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetric(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    metricNumbers.forEach(metric => {
        observer.observe(metric);
    });
}

function animateMetric(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const number = parseInt(text.replace(/[^\d]/g, ''));
    
    let current = 0;
    const increment = number / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
    }, stepTime);
}

// Add modal styles
const modalStyles = `
    .portfolio-modal {
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

    .portfolio-modal.active {
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
        max-width: 800px;
        max-height: 90vh;
        background: var(--surface-primary);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--border-radius-large);
        padding: 2rem;
        overflow-y: auto;
        transition: transform 0.3s ease;
    }

    .portfolio-modal.active .modal-content {
        transform: translate(-50%, -50%) scale(1);
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }

    .modal-close:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    .modal-header h2 {
        color: var(--text-accent);
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    .project-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 2rem;
    }

    .project-features,
    .project-tech,
    .project-impact {
        margin-bottom: 2rem;
    }

    .project-features h3,
    .project-tech h3,
    .project-impact h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }

    .project-features ul {
        list-style: none;
        padding: 0;
    }

    .project-features li {
        color: var(--text-secondary);
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        position: relative;
        padding-left: 1.5rem;
    }

    .project-features li:before {
        content: '✨';
        position: absolute;
        left: 0;
        color: var(--text-accent);
    }

    .tech-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .project-impact p {
        color: var(--text-accent);
        font-weight: 600;
        font-size: 1.1rem;
    }

    .filter-buttons {
        margin-bottom: 3rem;
    }

    .filter-btn {
        background: var(--surface-primary);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: var(--text-secondary);
        padding: 0.75rem 1.5rem;
        margin: 0 0.5rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        transition: all var(--transition-fast);
        font-weight: 500;
    }

    .filter-btn:hover,
    .filter-btn.active {
        background: var(--accent-gradient);
        color: white;
        border-color: transparent;
        transform: translateY(-2px);
    }

    .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .portfolio-card {
        background: var(--surface-primary);
        border-radius: var(--border-radius-large);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all var(--transition-medium);
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .portfolio-card:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-glow);
        border-color: var(--text-accent);
    }

    .portfolio-image {
        position: relative;
        height: 200px;
        overflow: hidden;
    }

    .portfolio-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .portfolio-icon {
        font-size: 3rem;
        opacity: 0.8;
    }

    .portfolio-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity var(--transition-medium);
    }

    .portfolio-card:hover .portfolio-overlay {
        opacity: 1;
    }

    .portfolio-content {
        padding: 1.5rem;
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .portfolio-content h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }

    .portfolio-content p {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 1.5rem;
        flex: 1;
    }

    .portfolio-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .metric-card {
        text-align: center;
        padding: 2rem;
    }

    .metric-number {
        font-size: 3rem;
        font-weight: 800;
        background: var(--accent-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
    }

    .metric-label {
        color: var(--text-primary);
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    .metric-description {
        color: var(--text-secondary);
        line-height: 1.5;
    }

    .tech-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
    }

    .tech-category {
        background: var(--surface-primary);
        padding: 2rem;
        border-radius: var(--border-radius-large);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tech-category-title {
        color: var(--text-accent);
        margin-bottom: 1.5rem;
        font-size: 1.25rem;
        font-weight: 600;
    }

    .tech-items {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .tech-item {
        color: var(--text-secondary);
        padding: 0.75rem 1rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: var(--border-radius);
        border-left: 3px solid var(--text-accent);
        transition: all var(--transition-fast);
    }

    .tech-item:hover {
        background: rgba(0, 242, 254, 0.1);
        transform: translateX(5px);
    }

    @media (max-width: 768px) {
        .portfolio-grid {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            width: 95%;
            padding: 1.5rem;
        }
        
        .filter-btn {
            margin: 0.25rem;
            padding: 0.5rem 1rem;
        }
    }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

