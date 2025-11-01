// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ---- Update copyright year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Sidebar toggle (mobile) ----
  const sidebar = document.getElementById('sidebar');
  const toggle   = document.getElementById('toggleSidebar');

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    sidebar.classList.toggle('sidebar-hidden');

    if (!expanded) {
      sidebar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // ---- Nav active state ----
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', e => {
      document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // ---- Responsive sidebar visibility ----
  const handleResize = () => {
    if (window.innerWidth <= 900) {
      sidebar.classList.add('sidebar-hidden');
    } else {
      sidebar.classList.remove('sidebar-hidden');
    }
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // initial call
});

// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });

    // Update active state
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
  });
});

// ---- Tab Navigation ----
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetTab = link.getAttribute('data-tab');

    // Update active nav
    document.querySelectorAll('.nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');

    // Show target tab
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    document.getElementById(targetTab).classList.add('active');

    // Smooth scroll to top of content
    document.querySelector('.tab-panels').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---- Portfolio: YouTube Preview on Hover ----
document.querySelectorAll('.project-card').forEach(card => {
  const iframe = card.querySelector('iframe');
  const videoUrl = card.getAttribute('data-video');

  card.addEventListener('mouseenter', () => {
    iframe.src = videoUrl + '?autoplay=1&mute=1&loop=1&playlist=' + videoUrl.split('/').pop();
  });

  card.addEventListener('mouseleave', () => {
    iframe.src = '';
  });
});

// Add to your script.js
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.skill-item').forEach(item => {
    const fill = item.querySelector('.skill-fill');
    const width = fill.style.width;
    fill.style.setProperty('--target-width', width);
    observer.observe(item);
  });
});