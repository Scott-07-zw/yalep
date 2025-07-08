document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarLinks = document.querySelector('.navbar-links');
  const pages = document.querySelectorAll('.page');

  // Set initial active page based on hash or default to home
  let currentPage = window.location.hash.substring(1) || 'home';
  setActivePage(currentPage);

  // Navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('href').substring(1);
      currentPage = pageId;
      setActivePage(pageId);
      window.history.pushState(null, null, `#${pageId}`);
      
      // Close mobile menu if open
      navbarLinks.classList.remove('active');
    });
  });

  // Toggle mobile menu
  navbarToggle.addEventListener('click', function() {
    navbarLinks.classList.toggle('active');
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function() {
    const pageId = window.location.hash.substring(1) || 'home';
    currentPage = pageId;
    setActivePage(pageId);
  });

  function setActivePage(pageId) {
    // Update pages
    pages.forEach(page => {
      page.classList.remove('active-page');
      if (page.id === pageId) {
        page.classList.add('active-page');
      }
    });

    // Update nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${pageId}`) {
        link.classList.add('active');
      }
    });

    // Scroll to top
    window.scrollTo(0, 0);
  }

  // Lessons Page
  const lessonsGrid = document.querySelector('.lessons-grid');
  const lessonModal = document.querySelector('.lesson-modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalImage = document.querySelector('.modal-image');
  const modalText = document.querySelector('.modal-text');
  const closeModal = document.querySelector('.close-modal');

  // Generate lesson buttons
  for (let i = 1; i <= 7; i++) {
    const lessonButton = document.createElement('button');
    lessonButton.className = 'lesson-button';
    lessonButton.innerHTML = `
      <i class="fas fa-book-open"></i>
      <span>Lesson ${i}</span>
    `;
    lessonButton.addEventListener('click', () => openLessonModal(i));
    lessonsGrid.appendChild(lessonButton);
  }

  function openLessonModal(lessonNumber) {
    modalTitle.textContent = `Lesson ${lessonNumber}`;
    modalImage.src = `https://source.unsplash.com/random/800x400/?education,${lessonNumber}`;
    modalImage.alt = `Lesson ${lessonNumber} Image`;
    
    // Generate lesson content
    let lessonContent = '';
    for (let i = 0; i < 5; i++) {
      lessonContent += `<p>bla bla bla bla. This is content for Lesson ${lessonNumber}, paragraph ${i+1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.</p>`;
    }
    modalText.innerHTML = lessonContent;
    
    lessonModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal.addEventListener('click', closeLessonModal);
  lessonModal.addEventListener('click', function(e) {
    if (e.target === lessonModal) {
      closeLessonModal();
    }
  });

  function closeLessonModal() {
    lessonModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Quiz Page
  const quizButtons = document.querySelectorAll('.quiz-button');

  quizButtons.forEach(button => {
    button.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      // Show loading state
      const originalContent = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      
      setTimeout(() => {
        window.open(url, '_blank');
        this.innerHTML = originalContent;
      }, 500);
    });
  });

  // Info Page Accordion
  const accordionButtons = document.querySelectorAll('.accordion-button');

  accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.classList.toggle('active');
    });
  });

  // Theme Switcher
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
  }

  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Lazy loading images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
    });
  }
});