// ============================================
// DAMATECH SOLUTIONS - MASTER SCRIPT
// ============================================

const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');

function showToast(message) {
  if (!toast || !toastText) return;
  toastText.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ===== REQUEST A QUOTE BUTTON - Scrolls to contact form =====
const quoteBtn = document.getElementById('quoteBtn');

if (quoteBtn) {
  quoteBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('📋 Please fill out the form below to request a quote.');
  });
}

// ===== GET A QUOTE BUTTON (Contact section CTA) =====
const contactCta = document.getElementById('contactCta');

if (contactCta) {
  contactCta.addEventListener('click', function(e) {
    e.preventDefault();
    showToast('📩 Thanks! We\'ll prepare a custom quote for you.');
  });
}

// ===== GET STARTED BUTTONS (No notification, just scroll) =====
const getStartedBtn = document.getElementById('getStartedBtn');
const navCta = document.getElementById('navCta');

if (getStartedBtn) {
  getStartedBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

if (navCta) {
  navCta.addEventListener('click', function(e) {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ===== CONTACT FORM HANDLER =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        showToast('📩 Your quote request has been sent successfully!');
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      showToast('❌ Oops! Something went wrong. Please try again.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    });
  });
}

// ===== MOBILE MENU TOGGLE =====
const toggleBtn = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');

if (toggleBtn && nav) {
  toggleBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    nav.classList.toggle('active');
  });

  document.addEventListener('click', function(event) {
    const isClickInside = nav.contains(event.target) || toggleBtn.contains(event.target);
    if (!isClickInside && nav.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
    });
  });
}
