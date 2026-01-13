document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.checked = savedTheme === 'dark';

  // Theme toggle event listener
  themeToggle.addEventListener('change', function() {
    const theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.navbar-toggle');
  const navLinks = document.querySelector('.navbar-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Check if pre-test is completed
  const preTestCompleted = localStorage.getItem('preTestCompleted') === 'true';
  const startCourseButton = document.getElementById('course-button');
  const preTestButton = document.getElementById('pre-test-button');
  const postTestButton = document.getElementById('post-test-button');
  const preTestProgress = document.getElementById('pre-test-progress');
  const lessonsProgress = document.getElementById('lessons-progress');
  const postTestProgress = document.getElementById('post-test-progress');
  const progressText = document.getElementById('progress-text');

  if (preTestCompleted) {
    startCourseButton.classList.remove('disabled');
    preTestButton.classList.add('completed');
    preTestProgress.style.width = '100%';
    progressText.textContent = 'Pre-Test completed! You can now start the course.';
  }

  // Check if can proceed to post-test
  const canProceedToPostTest = localStorage.getItem('canProceedToPostTest') === 'true';
  if (canProceedToPostTest) {
    postTestButton.classList.remove('disabled');
    lessonsProgress.style.width = '100%';
    progressText.textContent = 'All lessons completed! You can now take the post-test.';
  }

  // Check if should show completion notification
  const showCompletionNotification = localStorage.getItem('showCompletionNotification') === 'true';
  if (showCompletionNotification) {
    showNotification();
    localStorage.removeItem('showCompletionNotification');
  }

  // Pre-test button click handler
  preTestButton.addEventListener('click', function() {
    if (!preTestCompleted) {
      localStorage.setItem('preTestCompleted', 'true');
      startCourseButton.classList.remove('disabled');
      this.classList.add('completed');
      preTestProgress.style.width = '100%';
      progressText.textContent = 'Pre-Test completed! You can now start the course.';
      
      // Show notification
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Pre-test completed! You can now start the course.</span>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
    }
  });

  // Start Course button click handler
  startCourseButton.addEventListener('click', function(e) {
    if (this.classList.contains('disabled')) {
      e.preventDefault();
    }
  });

  // Post-test button click handler
  postTestButton.addEventListener('click', function() {
    if (!this.classList.contains('disabled')) {
      const url = this.getAttribute('data-url');
      window.open(url, '_blank');
    }
  });
});

function showNotification() {
  const notification = document.getElementById('notification');
  notification.style.display = 'block';
}

function closeNotification() {
  const notification = document.getElementById('notification');
  notification.style.display = 'none';
} 