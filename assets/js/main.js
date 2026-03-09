(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * Small helper utilities
   * ------------------------------------------------------------------ */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) return;
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener));
    } else {
      selectEl.addEventListener(type, listener);
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  const scrollto = (el) => {
    const target = select(el);
    if (!target) return;
    const elementPos = target.offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth"
    });
  };

  /* ------------------------------------------------------------------
   * Navbar active state on scroll
   * ------------------------------------------------------------------ */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      const section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= (section.offsetTop + section.offsetHeight)
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /* ------------------------------------------------------------------
   * Back to top button
   * ------------------------------------------------------------------ */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /* ------------------------------------------------------------------
   * Mobile nav toggle + smooth scroll
   * ------------------------------------------------------------------ */
  on("click", ".mobile-nav-toggle", function () {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      const body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        const navbarToggle = select(".mobile-nav-toggle");
        if (navbarToggle) {
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
      }

      scrollto(this.hash);
    }
  }, true);

  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  /* ------------------------------------------------------------------
   * Preloader
   * ------------------------------------------------------------------ */
  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /* ------------------------------------------------------------------
   * Hero type effect
   * ------------------------------------------------------------------ */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    if (typed_strings) {
      typed_strings = typed_strings.split(",");
      new Typed(".typed", {
        strings: typed_strings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  /* ------------------------------------------------------------------
   * Collaboration badge pulse
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const collabBadge = document.getElementById("collabBadge");
    if (collabBadge) {
      collabBadge.addEventListener("click", () => {
        collabBadge.classList.add("status-pulse");
        setTimeout(() => {
          collabBadge.classList.remove("status-pulse");
        }, 600);
      });
    }
  });

  /* ------------------------------------------------------------------
   * Hero education spotlight hover/click
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const eduSpotlight = document.getElementById("eduSpotlight");
    if (!eduSpotlight) return;

    eduSpotlight.addEventListener("mouseenter", () => {
      eduSpotlight.classList.add("is-expanded");
    });

    eduSpotlight.addEventListener("mouseleave", () => {
      eduSpotlight.classList.remove("is-expanded");
    });

    eduSpotlight.addEventListener("click", () => {
      eduSpotlight.classList.add("is-expanded");
      setTimeout(() => eduSpotlight.classList.remove("is-expanded"), 600);
    });
  });

  /* ------------------------------------------------------------------
   * AOS (Animate on Scroll)
   * ------------------------------------------------------------------ */
  window.addEventListener("load", () => {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  });

  /* ------------------------------------------------------------------
   * Bootstrap Tooltips
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    if (typeof bootstrap === "undefined") return;
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll("[data-bs-toggle=\"tooltip\"]")
    );
    tooltipTriggerList.map(function (el) {
      return new bootstrap.Tooltip(el);
    });
  });

})();
/*--------------------------------------------------------------
ABOUT PAGE
--------------------------------------------------------------*/

  /* ------------------------------------------------------------------
   * Tilt effect for [data-tilt] elements
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-tilt]").forEach(el => {
      const height = el.clientHeight;
      const width = el.clientWidth;

      el.addEventListener("mousemove", (event) => {
        const xVal = event.layerX;
        const yVal = event.layerY;

        const yRotation = 8 * ((xVal - width / 2) / width);
        const xRotation = -8 * ((yVal - height / 2) / height);

        el.style.transform =
          `perspective(600px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
      });

      el.addEventListener("mouseleave", () => {
        el.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg)";
      });

      el.addEventListener("mouseenter", () => {
        el.style.transition = "transform 0.18s ease-out";
        setTimeout(() => {
          el.style.transition = "none";
        }, 200);
      });
    });
  });

  /* ------------------------------------------------------------------
   * Collaboration badge pulse (second badge in About section)
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const collabBadge2 = document.getElementById("collabBadge2");
    if (collabBadge2) {
      collabBadge2.addEventListener("click", () => {
        collabBadge2.classList.add("status-pulse");
        setTimeout(() => {
          collabBadge2.classList.remove("status-pulse");
        }, 600);
      });
    }
  });

  /* ------------------------------------------------------------------
   * SKILL SECTIOn
   * ------------------------------------------------------------------ */



    /* ------------------------------------------------------------------
   * Experience cards — subtle entrance on scroll
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const expCards = document.querySelectorAll(".exp-timeline-card");
    if (!expCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.15 });

    expCards.forEach(card => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(card);
    });
  });


  




    /* ------------------------------------------------------------------
   * Projects — tab switching
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".proj-card").forEach(card => {
      const btns = card.querySelectorAll(".proj-btn:not(.proj-btn-poster):not(.proj-btn-webapp)");
      const panels = card.querySelectorAll(".proj-panel");

      btns.forEach(btn => {
        btn.addEventListener("click", () => {
          // Deactivate all tab buttons and panels
          btns.forEach(b => b.classList.remove("active"));
          panels.forEach(p => p.classList.remove("show"));

          // Activate clicked button and its panel
          btn.classList.add("active");
          const target = card.querySelector(btn.getAttribute("data-target"));
          if (target) {
            target.classList.add("show");
          }
        });
      });
    });
  });

  /* ------------------------------------------------------------------
   * Projects — poster / maps lightbox
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    // Create overlay element once
    const overlay = document.createElement("div");
    overlay.className = "proj-poster-overlay";
    overlay.innerHTML = `
      <button class="proj-poster-close" aria-label="Close poster">
        <i class="bi bi-x-lg"></i>
      </button>
      <img src="" alt="Project Poster">
    `;
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector("img");
    const closeBtn = overlay.querySelector(".proj-poster-close");

    // Open poster on click
    document.querySelectorAll(".proj-btn-poster").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const posterSrc = btn.getAttribute("data-poster");
        if (!posterSrc) return;
        overlayImg.src = posterSrc;
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // Close functions
    const closePoster = () => {
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closePoster);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePoster();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("active")) {
        closePoster();
      }
    });
  });

  /* ------------------------------------------------------------------
   * Projects — card entrance animation on scroll
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const projCards = document.querySelectorAll(".proj-card");
    if (!projCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    projCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`;
      observer.observe(card);
    });
  });




    /* ------------------------------------------------------------------
   * Conference cards — entrance animation
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const confCards = document.querySelectorAll(".conf-card-v2");
    if (!confCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    confCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.45s ease ${index * 0.06}s, transform 0.45s ease ${index * 0.06}s`;
      observer.observe(card);
    });
  });











    /* ------------------------------------------------------------------
   * Training cards — entrance animation
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const trainCards = document.querySelectorAll(".train-card");
    if (!trainCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    trainCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.45s ease ${index * 0.06}s, transform 0.45s ease ${index * 0.06}s`;
      observer.observe(card);
    });
  });

  /* ------------------------------------------------------------------
   * Award cards — entrance animation
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const awardCards = document.querySelectorAll(".award-card-v2");
    if (!awardCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    awardCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.45s ease ${index * 0.08}s, transform 0.45s ease ${index * 0.08}s`;
      observer.observe(card);
    });
  });







    /* ------------------------------------------------------------------
   * Affiliation cards — entrance animation
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const affilCards = document.querySelectorAll(".affil-card");
    if (!affilCards.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    affilCards.forEach((card, index) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = `opacity 0.45s ease ${index * 0.06}s, transform 0.45s ease ${index * 0.06}s`;
      observer.observe(card);
    });
  });

  /* ------------------------------------------------------------------
   * Contact form — AJAX submit via Web3Forms
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const statusEl = document.getElementById("contactStatus");
    const submitBtn = document.getElementById("contactSubmitBtn");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // UI feedback
      submitBtn.classList.add("sending");
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
      statusEl.className = "contact-status mt-3";
      statusEl.textContent = "";

      try {
        const formData = new FormData(form);
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
        const data = await response.json();

        if (data.success) {
          statusEl.className = "contact-status mt-3 success";
          statusEl.textContent = "Message sent successfully! I'll get back to you soon.";
          form.reset();
        } else {
          throw new Error(data.message || "Something went wrong.");
        }
      } catch (err) {
        statusEl.className = "contact-status mt-3 error";
        statusEl.textContent = "Failed to send. Please try emailing me directly.";
      }

      // Reset button
      submitBtn.classList.remove("sending");
      submitBtn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';

      // Clear status after 6 seconds
      setTimeout(() => {
        statusEl.className = "contact-status mt-3";
        statusEl.textContent = "";
      }, 6000);
    });
  });

  /* ------------------------------------------------------------------
   * Hero Showcase — SVG border draw, reveal, slideshow, typewriter
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", () => {
    const showcase = document.getElementById("heroShowcase");
    if (!showcase) return;

    const svg = showcase.querySelector(".hero-showcase-svg");
    const inner = document.getElementById("heroShowcaseInner");
    const descEl = document.getElementById("heroShowcaseDesc");
    const detailsBtn = document.getElementById("heroShowcaseDetails");
    const images = showcase.querySelectorAll(".hero-showcase-img");

    if (!svg || !inner || !descEl) return;

    let currentImg = 0;
    const descText = 'It is a GIS app that scores powerline segment risk and tall-tree alerts.<br><strong>Note:</strong> Switch browser to dark mode if numbers not visible (Click top right button of app)';

    // ── Step 1: Start drawing border after 0.5s page load ──
    setTimeout(() => {
      svg.classList.add("drawing");
    }, 500);

    // ── Step 2: After border finishes drawing, start glow + reveal content ──
    setTimeout(() => {
      svg.classList.remove("drawing");
      svg.classList.add("drawn");
    }, 2400);

    setTimeout(() => {
      inner.classList.add("visible");

      // ── Step 3: Start typewriter ──
      let charIndex = 0;
      const cursor = document.createElement("span");
      cursor.className = "showcase-cursor";

      function type() {
        if (charIndex < descText.length) {
          if (cursor.parentNode) cursor.remove();
          // Check for HTML tags — add the whole tag at once
          if (descText.charAt(charIndex) === '<') {
            const closingIndex = descText.indexOf('>', charIndex);
            if (closingIndex !== -1) {
              const tag = descText.substring(charIndex, closingIndex + 1);
              descEl.innerHTML += tag;
              charIndex = closingIndex + 1;
            }
          } else {
            descEl.innerHTML += descText.charAt(charIndex);
            charIndex++;
          }
          descEl.appendChild(cursor);
          setTimeout(type, 28);
        } else {
          setTimeout(() => { cursor.remove(); }, 2000);
        }
      }
      type();

      // ── Step 4: Start image slideshow ──
      setInterval(() => {
        images[currentImg].classList.remove("active");
        currentImg = (currentImg + 1) % images.length;
        images[currentImg].classList.add("active");
      }, 5000);
    }, 2700);

    // ── "Details" button — scroll to ArborGRID and highlight ──
    if (detailsBtn) {
      detailsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("project-arborgrid");
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "center" });

        setTimeout(() => {
          target.classList.add("proj-card-highlight");
          setTimeout(() => {
            target.classList.remove("proj-card-highlight");
          }, 3000);
        }, 600);
      });
    }
  });