// ------------------------------
// Page transition (fade in/out)
// ------------------------------
document.body.classList.add('fade-in'); // fade in on page load

document.querySelectorAll('a').forEach(link => {
  // Ignore links that open in new tab or anchor links
  if (!link.href || link.target === "_blank" || link.href.includes("#")) return;

  link.addEventListener('click', (e) => {
    e.preventDefault(); // stop immediate navigation
    const href = link.href;

    document.body.classList.add('fade-out'); // trigger fade-out
    setTimeout(() => {
      window.location.href = href; // navigate after animation
    }, 500); // match transition duration
  });
});

// ------------------------------
// Mobile nav toggle
// ------------------------------
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

hamburger?.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!expanded));
  navList.classList.toggle('show');
});

// ------------------------------
// Simple reveal on scroll (IntersectionObserver)
// ------------------------------
const revealTargets = document.querySelectorAll('.hero-left, .image-wrap, .social-vertical');

if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(t => obs.observe(t));
} else {
  // Fallback
  revealTargets.forEach(t => t.classList.add('revealed'));
}

// ------------------------------
// Small hover tilt for picture (desktop only)
// ------------------------------
const imgWrap = document.querySelector('.frame-front img');
if (imgWrap) {
  imgWrap.parentElement.addEventListener('mouseenter', () => {
    imgWrap.style.transform = 'scale(1.03) rotateZ(-0.8deg)';
  });
  imgWrap.parentElement.addEventListener('mouseleave', () => {
    imgWrap.style.transform = 'none';
  });
}

// ------------------------------
// Ensure nav collapses on link click (mobile)
// ------------------------------
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', () => {
    if (navList.classList.contains('show')) {
      navList.classList.remove('show');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// ------------------------------
// Scroll Down button → Scroll to Journal section
// ------------------------------
const scrollBtn = document.getElementById("scrollToJournal");

scrollBtn?.addEventListener("click", () => {
  const journalSection = document.querySelector("#journal");
  if (journalSection) {
    journalSection.scrollIntoView({ behavior: "smooth" });
  }
});
