// Digital Nexus - Advanced JavaScript Framework

class DigitalNexus {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupParticles();
    this.setupNavigation();
    this.setupInteractiveElements();
    this.setupTypewriter();
    this.setupCursor();
  }

  // Scroll-triggered animations using Intersection Observer
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .timeline-item').forEach(el => {
      observer.observe(el);
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Animated particle system
  setupParticles() {
    const particleContainer = document.querySelector('.particles');
    if (!particleContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random positioning
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
      
      particleContainer.appendChild(particle);
    }

    // Mouse interaction with particles
    document.addEventListener('mousemove', (e) => {
      const particles = document.querySelectorAll('.particle');
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      particles.forEach((particle, index) => {
        const speed = (index % 5 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
  }

  // Enhanced navigation with scroll effects
  setupNavigation() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Hide/show nav on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }

      lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Interactive card effects
  setupInteractiveElements() {
    // Card tilt effect
    document.querySelectorAll('.interactive-card, .glass-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });

    // Button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // Typewriter effect for hero text
  setupTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid #00f2fe';
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
          // Blinking cursor effect
          setInterval(() => {
            element.style.borderRight = element.style.borderRight === '2px solid transparent' 
              ? '2px solid #00f2fe' 
              : '2px solid transparent';
          }, 500);
        }
      }, 100);
    });
  }

  // Custom cursor
  setupCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor following
    const animateCursor = () => {
      const speed = 0.15;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor interactions
    document.querySelectorAll('a, button, .interactive-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  // Utility methods
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Form handling
class FormHandler {
  constructor() {
    this.setupForms();
  }

  setupForms() {
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', this.handleSubmit.bind(this));
      
      // Real-time validation
      form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => this.clearErrors(field));
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      this.showSuccess(form);
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 2000);
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');

    this.clearErrors(field);

    if (isRequired && !value) {
      this.showError(field, 'This field is required');
      return false;
    }

    if (fieldType === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, 'Please enter a valid email address');
        return false;
      }
    }

    return true;
  }

  showError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: #f5576c;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#f5576c';
    
    // Animate in
    requestAnimationFrame(() => {
      errorDiv.style.opacity = '1';
      errorDiv.style.transform = 'translateY(0)';
    });
  }

  clearErrors(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    field.style.borderColor = '';
  }

  showSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '✨ Message sent successfully! We\'ll get back to you soon.';
    successDiv.style.cssText = `
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
      font-weight: 500;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease;
    `;
    
    form.appendChild(successDiv);
    
    // Animate in
    requestAnimationFrame(() => {
      successDiv.style.opacity = '1';
      successDiv.style.transform = 'translateY(0)';
    });

    // Remove after 5 seconds
    setTimeout(() => {
      successDiv.style.opacity = '0';
      successDiv.style.transform = 'translateY(-20px)';
      setTimeout(() => successDiv.remove(), 500);
    }, 5000);
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.startTime = performance.now();
    this.setupMonitoring();
  }

  setupMonitoring() {
    // Page load performance
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now() - this.startTime;
      console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
    });

    // Scroll performance
    let scrollStart;
    window.addEventListener('scroll', DigitalNexus.throttle(() => {
      if (!scrollStart) scrollStart = performance.now();
    }, 16));

    // Memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        this.metrics.memory = performance.memory;
      }, 5000);
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DigitalNexus();
  new FormHandler();
  new PerformanceMonitor();
});

// Add custom cursor styles
const cursorStyles = `
  .custom-cursor {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    background: #00f2fe;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: -4px;
  }

  .cursor-outline {
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0, 242, 254, 0.5);
    border-radius: 50%;
    position: absolute;
    top: -20px;
    left: -20px;
    transition: all 0.1s ease;
  }

  .cursor-hover .cursor-outline {
    width: 60px;
    height: 60px;
    top: -30px;
    left: -30px;
    border-color: #00f2fe;
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .custom-cursor {
      display: none;
    }
  }
`;

// Inject cursor styles
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

