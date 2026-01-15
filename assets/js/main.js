
/**
* Template Name: MyResume
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', function () {
  // ===== Summary Modal =====
  var summaryModalEl = document.getElementById('projectSummaryModal');
  if (summaryModalEl) {
    var summaryModal = new bootstrap.Modal(summaryModalEl);
    var titleEl = summaryModalEl.querySelector('.summary-title');
    var textEl = summaryModalEl.querySelector('.summary-text');

    document.querySelectorAll('.project-summary-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var title = this.getAttribute('data-project-title') || 'Project Summary';
        var summary = this.getAttribute('data-project-summary') || '';

        titleEl.textContent = title;
        textEl.textContent = summary;

        summaryModal.show();
      });
    });
  }

  // ===== Project Details (image via GLightbox, PDF via new tab) =====
  document.querySelectorAll('.project-details-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var type = this.getAttribute('data-project-type');

      if (type === 'image') {
        var imgSrc = this.getAttribute('data-project-image');
        if (!imgSrc) return;

        var lightbox = GLightbox({
          elements: [{
            href: imgSrc,
            type: 'image'
          }]
        });
        lightbox.open();
      }

      if (type === 'pdf') {
        var pdfUrl = this.getAttribute('data-project-pdf');
        if (!pdfUrl) return;
        window.open(pdfUrl, '_blank');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (!selectEl) return;
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const scrollto = (el) => {
    const elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  // Scroll with offset on links with .scrollto class
  on('click', '.nav-menu a.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      // Active class
      const navbarlinks = select('#navbar .nav-link', true);
      navbarlinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');

      // Smooth scroll
      scrollto(this.hash);
    }
  }, true);
});

document.addEventListener('DOMContentLoaded', () => {
  // ...your existing code...

  // Simple tilt effect for elements with [data-tilt]
  const tiltElements = document.querySelectorAll('[data-tilt]');

  tiltElements.forEach(el => {
    const height = el.clientHeight;
    const width = el.clientWidth;

    el.addEventListener('mousemove', (event) => {
      const xVal = event.layerX;
      const yVal = event.layerY;

      const yRotation = 8 * ((xVal - width / 2) / width);
      const xRotation = -8 * ((yVal - height / 2) / height);

      el.style.transform = `perspective(600px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.18s ease-out';
      setTimeout(() => {
        el.style.transition = 'none';
      }, 200);
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // ...your existing code...

  const collabBadge = document.getElementById('collabBadge');
  if (collabBadge) {
    collabBadge.addEventListener('click', () => {
      collabBadge.classList.add('status-pulse');
      setTimeout(() => {
        collabBadge.classList.remove('status-pulse');
      }, 600);
    });
  }
});
//---------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const skillPills = document.querySelectorAll('.skill-pill');

  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.add('pill-pulse');
      setTimeout(() => pill.classList.remove('pill-pulse'), 350);
    });
  });
});


//---------------------------------------resume--------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Scroll-highlight for experience cards
  const expCards = document.querySelectorAll('.exp-card');

  const updateActiveCard = () => {
    let best = null;
    let bestDist = Infinity;

    expCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - window.innerHeight * 0.45);
      if (dist < bestDist) {
        bestDist = dist;
        best = card;
      }
    });

    expCards.forEach(card => card.classList.remove('is-active'));
    if (best) best.classList.add('is-active');
  };

  if (expCards.length) {
    window.addEventListener('scroll', updateActiveCard, { passive: true });
    updateActiveCard();
  }

  // Hover pulse for education items
  const eduItems = document.querySelectorAll('.edu-item');
  eduItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('edu-pulse');
      setTimeout(() => item.classList.remove('edu-pulse'), 350);
    });
  });
});

  const eduSpotlight = document.getElementById('eduSpotlight');
  if (eduSpotlight) {
    // Mouse hover gives subtle “focus” animation
    eduSpotlight.addEventListener('mouseenter', () => {
      eduSpotlight.classList.add('is-expanded');
    });

    eduSpotlight.addEventListener('mouseleave', () => {
      eduSpotlight.classList.remove('is-expanded');
    });

    // Optional: click to keep it expanded briefly
    eduSpotlight.addEventListener('click', () => {
      eduSpotlight.classList.add('is-expanded');
      setTimeout(() => eduSpotlight.classList.remove('is-expanded'), 600);
    });
  }

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetSelector = this.getAttribute('data-copy-target');
      var target = document.querySelector(targetSelector);
      if (!target) return;

      var text = target.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        this.innerHTML = '<i class="bi bi-check2"></i> Copied';
        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
        }, 1500);
      });
    });
  });
});


// --- Pokhara PDFs slider ---

const pokharaPdfs = [
  'assets/img/portfolio/gps.pdf',
  'assets/img/portfolio/flow.pdf',
  'assets/img/portfolio/lakeside.pdf',
];

let pokharaPdfIndex = 0;

function showPokharaPdf(index) {
  const frame = document.getElementById('pokharaPdfFrame');
  if (!frame) return;
  pokharaPdfIndex = (index + pokharaPdfs.length) % pokharaPdfs.length;
  frame.src = pokharaPdfs[pokharaPdfIndex];
}

function openPokharaSlider() {
  const overlay = document.getElementById('pokharaPdfOverlay');
  if (!overlay) return;
  overlay.style.display = 'block';
  showPokharaPdf(0);
}

function closePokharaSlider() {
  const overlay = document.getElementById('pokharaPdfOverlay');
  const frame = document.getElementById('pokharaPdfFrame');
  if (overlay) overlay.style.display = 'none';
  if (frame) frame.src = ''; // stop loading
}

function nextPokharaPdf() {
  showPokharaPdf(pokharaPdfIndex + 1);
}

function prevPokharaPdf() {
  showPokharaPdf(pokharaPdfIndex - 1);
}

// Attach click handler for this specific project's button
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.project-details-btn');
  if (!btn) return;
  if (btn.dataset.projectType === 'pokhara-pdfs') {
    e.preventDefault();
    openPokharaSlider();
  }
});













































(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  const tooltipList = tooltipTriggerList.map(function (el) {
    return new bootstrap.Tooltip(el);
  });

