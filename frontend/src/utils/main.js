document.addEventListener('DOMContentLoaded', function () {

  // ==========================================
  // Mobile Navigation Toggle
  // ==========================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      // Animate hamburger to X
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });

    // Handle dropdown toggles on mobile
    const dropdownItems = navMenu.querySelectorAll('.nav-item.has-dropdown > .nav-link, .nav-item.has-megamenu > .nav-link');

    dropdownItems.forEach(function (item) {
      item.addEventListener('click', function (e) {
        // Only toggle on mobile (when hamburger is visible)
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parent = item.parentElement;

          // Close other open dropdowns
          const siblings = parent.parentElement.querySelectorAll('.nav-item.active');
          siblings.forEach(function (sibling) {
            if (sibling !== parent) {
              sibling.classList.remove('active');
            }
          });

          // Toggle current dropdown
          parent.classList.toggle('active');
        }
      });
    });
  }

  // ==========================================
  // Alert Banner Close
  // ==========================================
  const alertBanner = document.getElementById('alertBanner');
  const alertClose = document.getElementById('alertClose');

  if (alertClose && alertBanner) {
    alertClose.addEventListener('click', function () {
      alertBanner.style.display = 'none';
      localStorage.setItem('alertDismissed', 'true');
    });


    if (!localStorage.getItem('alertDismissed')) {
      // Uncomment to show alert by default
      // alertBanner.style.display = 'block';
    }
  }

  // ==========================================
  // Hero Slider
  // ==========================================
  const heroSlider = document.getElementById('heroSlider');

  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.slide');
    const dots = heroSlider.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 6000; // 6 seconds

    // Function to go to a specific slide
    function goToSlide(index) {
      // Remove active class from current slide and dot
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      // Update current slide index
      currentSlide = index;

      // Handle wrap around
      if (currentSlide >= totalSlides) currentSlide = 0;
      if (currentSlide < 0) currentSlide = totalSlides - 1;

      // Add active class to new slide and dot
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    // Start auto play
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    // Stop auto play
    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Reset auto play (stop and restart)
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        goToSlide(index);
        resetAutoPlay();
      });
    });

    // Event listeners for vertical navigation
    const verticalPrev = document.getElementById('verticalPrev');
    const verticalNext = document.getElementById('verticalNext');

    if (verticalPrev) {
      verticalPrev.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
      });
    }

    if (verticalNext) {
      verticalNext.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      }
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopAutoPlay);
    heroSlider.addEventListener('mouseleave', startAutoPlay);

    // Touch support for swipe
    let touchStartX = 0;
    let touchEndX = 0;

    heroSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left
        } else {
          prevSlide(); // Swipe right
        }
        resetAutoPlay();
      }
    }

    // Start auto play on load
    startAutoPlay();
  }

  // ==========================================
  // Scroll Animations
  // ==========================================
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // ==========================================
  // Sticky Navigation Shadow
  // ==========================================
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
      } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      }
    });
  }

  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // Newsletter Form
  // ==========================================
  const newsletterForm = document.getElementById('newsletterForm');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Simple validation
      if (email && validateEmail(email)) {
        // Show success message
        showNotification('Thank you for subscribing!', 'success');
        this.reset();
      } else {
        showNotification('Please enter a valid email address.', 'error');
      }
    });
  }

  // ==========================================
  // Counter Animation for Stats
  // ==========================================
  const statValues = document.querySelectorAll('.stat-value');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(stat => {
    counterObserver.observe(stat);
  });

  function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasM = text.includes('M');
    const hasK = text.includes('K');

    // Extract number
    let target = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (!target || target === 0) return;

    let current = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (hasM) displayValue = current.toFixed(0) + 'M';
      else if (hasK) displayValue = (current / 1000).toFixed(0) + 'K';
      else if (current >= 1000) displayValue = current.toLocaleString().split('.')[0];
      else displayValue = Math.floor(current);

      element.textContent = displayValue + (hasPlus ? '+' : '');
    }, 16);
  }

  // ==========================================
  // Utility Functions
  // ==========================================
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // Add notification animations to head
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

});




// ==========================================
// Leadership Profile Modal
// ==========================================
const leaderProfiles = {
  minister: {
    name: 'Dr. Austin Demby',
    position: 'Minister of Health',
    credentials: 'PhD, MSc, BSc',
    image: 'assets/images/minister.jpeg',
    bio: 'Dr. Austin Demby serves as the Minister of Health for Sierra Leone. With extensive experience in public health and international development, he leads the country\'s health initiatives and policies aimed at improving healthcare access and quality for all Sierra Leoneans.',
    education: 'PhD in Public Health, MSc in Health Policy, BSc in Biomedical Sciences',
    experience: '15+ years in public health leadership and international development',
    focus: 'Universal Health Coverage, Health System Strengthening, Primary Healthcare'
  },
  deputy: {
    name: 'Dr. Charlé J. Senessie',
    position: 'Deputy Minister',
    credentials: 'MD, MPH',
    image: 'assets/images/deputy.jpeg',
    bio: 'Dr. Charlé J. Senessie serves as Deputy Minister of Health, leading policy implementation and strategic health initiatives across Sierra Leone.',
    education: 'MD degree, Master of Public Health (MPH)',
    experience: '12+ years in health policy and administration',
    focus: 'Policy Implementation, Health Sector Reform, Capacity Building'
  },
  cmo: {
    name: 'Dr. Sartie Kenneh',
    position: 'Chief Medical Officer',
    credentials: 'MD, FWACP',
    image: 'assets/images/CMO(1).jpg',
    bio: 'Dr. Sartie Kenneh serves as the Chief Medical Officer, overseeing clinical standards and medical protocols for national healthcare delivery.',
    education: 'MD degree, Fellowship of West African College of Physicians',
    experience: '18+ years in clinical medicine and healthcare leadership',
    focus: 'Clinical Standards, Medical Protocols, Healthcare Quality Assurance'
  },
  permsec: {
    name: 'Mr. Prince E. O. Cole',
    position: 'Permanent Secretary',
    credentials: 'MPA, BSc',
    image: 'assets/images/perm-sec.jpg',
    bio: 'Mr. Prince E. O. Cole serves as the Permanent Secretary, managing administrative operations and coordinating ministry functions.',
    education: 'Master of Public Administration, BSc in Business Administration',
    experience: '20+ years in public sector administration',
    focus: 'Administrative Operations, Resource Management, Policy Coordination'
  },
  dcmo: {
    name: 'Dr. Mustapha Kabba',
    position: 'Deputy Chief Medical Officer',
    credentials: 'MD, MPH',
    image: 'assets/images/deputy cmo.webp',
    bio: 'Dr. Mustapha Kabba serves as the Deputy Chief Medical Officer, supporting clinical leadership and healthcare quality improvement programs.',
    education: 'MD degree, Master of Public Health',
    experience: '14+ years in clinical practice and health systems',
    focus: 'Quality Improvement, Clinical Leadership, Health Programs'
  }
};

function openProfileModal(profileId) {
  const profile = leaderProfiles[profileId];
  if (!profile) return;

  const overlay = document.getElementById('profileModalOverlay');
  if (!overlay) return;

  document.getElementById('modalImage').src = profile.image;
  document.getElementById('modalImage').alt = profile.name;
  document.getElementById('modalBadge').textContent = profile.position;
  document.getElementById('modalName').textContent = profile.name;
  document.getElementById('modalCredentials').textContent = profile.credentials;
  document.getElementById('modalBio').textContent = profile.bio;
  document.getElementById('modalEducation').textContent = profile.education;
  document.getElementById('modalExperience').textContent = profile.experience;
  document.getElementById('modalFocus').textContent = profile.focus;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  const overlay = document.getElementById('profileModalOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeProfileModal();
  }
});

// ==========================================
// Language Switcher
// ==========================================
const langSwitcher = document.querySelector('.language-switcher');
const langToggle = document.getElementById('langToggle');
const langOptions = document.querySelectorAll('.lang-option');

if (langToggle && langSwitcher) {
  // Toggle dropdown
  langToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    langSwitcher.classList.toggle('active');
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    if (!langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('active');
    }
  });

  // Handle language selection
  langOptions.forEach(option => {
    option.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active from all options
      langOptions.forEach(opt => opt.classList.remove('active'));

      // Add active to clicked option
      this.classList.add('active');

      // Update button text
      const lang = this.dataset.lang.toUpperCase();
      langToggle.querySelector('span').textContent = lang;

      // Close dropdown
      langSwitcher.classList.remove('active');

      // Here you would integrate with a translation service
      // For now, just show notification
      const langName = this.querySelector('span:last-child').textContent;
      showNotification(`Language changed to ${langName}`, 'success');
    });
  });
}

// ==========================================
// Latest Updates Hub - Tab Filtering
// ==========================================
const updateTabs = document.querySelectorAll('.tab-btn');
const updateCards = document.querySelectorAll('.update-card');

if (updateTabs.length > 0 && updateCards.length > 0) {
  updateTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active from all tabs
      updateTabs.forEach(t => t.classList.remove('active'));

      // Add active to clicked tab
      this.classList.add('active');

      // Get the filter type
      const filterType = this.dataset.tab;

      // Show/hide cards based on filter
      updateCards.forEach(card => {
        const cardType = card.dataset.type;

        if (filterType === 'all' || cardType === filterType) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ==========================================
// Health Alert Dashboard - Disease Tabs & Counters
// ==========================================
const diseaseTabs = document.querySelectorAll('.disease-tab');
const dashboardCounters = document.querySelectorAll('.disease-dashboard .counter, .stats-secondary-grid .counter');

// Disease data sets (can be updated from API)
const diseaseData = {
  mpox: { cases: 45, deaths: 2, recovered: 28, active: 15, tests: 1250 },
  covid: { cases: 7779, deaths: 126, recovered: 0, active: 7653, tests: 259958 },
  cholera: { cases: 234, deaths: 12, recovered: 189, active: 33, tests: 5420 },
  malaria: { cases: 45230, deaths: 890, recovered: 42100, active: 2240, tests: 120500 },
  measles: { cases: 567, deaths: 23, recovered: 498, active: 46, tests: 8900 }
};

// Disease tab switching
if (diseaseTabs.length > 0) {
  diseaseTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active from all tabs
      diseaseTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      this.classList.add('active');

      // Get disease type and update stats
      const diseaseType = this.dataset.disease;
      updateDiseaseStats(diseaseType);
    });
  });
}

// Update disease statistics
function updateDiseaseStats(diseaseType) {
  const data = diseaseData[diseaseType];
  if (!data) return;

  // Update main stat cards
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    const valueEl = card.querySelector('.stat-value');
    if (!valueEl) return;

    if (card.classList.contains('cases')) {
      animateDashboardCounter(valueEl, data.cases);
    } else if (card.classList.contains('deaths')) {
      animateDashboardCounter(valueEl, data.deaths);
    } else if (card.classList.contains('recovered')) {
      animateDashboardCounter(valueEl, data.recovered);
    } else if (card.classList.contains('active')) {
      animateDashboardCounter(valueEl, data.active);
    }
  });

  // Update tests counter
  const testsEl = document.querySelector('.stats-secondary-grid .secondary-stat:last-child .secondary-value');
  if (testsEl) {
    animateDashboardCounter(testsEl, data.tests);
  }
}

// Animate dashboard counters
function animateDashboardCounter(element, target) {
  const duration = 1500;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Initial counter animation with Intersection Observer
const dashboardSection = document.querySelector('.disease-dashboard');
if (dashboardSection) {
  const dashboardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate all counters on first view
        document.querySelectorAll('.stat-card .stat-value.counter').forEach(counter => {
          const target = parseInt(counter.dataset.target) || 0;
          animateDashboardCounter(counter, target);
        });
        document.querySelectorAll('.secondary-value.counter').forEach(counter => {
          const target = parseInt(counter.dataset.target) || 0;
          animateDashboardCounter(counter, target);
        });
        dashboardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  dashboardObserver.observe(dashboardSection);
}

// Refresh button functionality
const refreshBtn = document.getElementById('refreshStats');
if (refreshBtn) {
  refreshBtn.addEventListener('click', function () {
    // Spin animation
    const icon = this.querySelector('i');
    if (icon) {
      icon.style.animation = 'spin 0.5s linear';
      setTimeout(() => icon.style.animation = '', 500);
    }

    // Update timestamp
    const timeEl = document.getElementById('updateTime');
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }

    // Re-animate current disease stats
    const activeTab = document.querySelector('.disease-tab.active');
    if (activeTab) {
      updateDiseaseStats(activeTab.dataset.disease);
    }
  });
}

// ==========================================
// Floating Side Buttons - Collapse on Scroll
// ==========================================
const floatingSideButtons = document.querySelector('.floating-side-buttons');
const heroSliderSection = document.querySelector('.hero-slider');

if (floatingSideButtons && heroSliderSection) {
  window.addEventListener('scroll', function() {
    const heroBottom = heroSliderSection.offsetTop + heroSliderSection.offsetHeight;
    
    if (window.scrollY > heroBottom - 100) {
      floatingSideButtons.classList.add('collapsed');
    } else {
      floatingSideButtons.classList.remove('collapsed');
    }
  });
}
