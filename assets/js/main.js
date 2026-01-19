
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

  // Smooth scroll for .scrollto links (including menu)
  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();

      // Close mobile nav if open
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

  // Scroll with offset on page load if hash in URL
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
   * Skills progress animation (if legacy .skills-content exists)
   * ------------------------------------------------------------------ */

  const skilsContent = select(".skills-content");
  if (skilsContent && typeof Waypoint !== "undefined") {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function () {
        const progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      }
    });
  }

  /* ------------------------------------------------------------------
   * Portfolio / Projects
   * - Isotope filtering
   * - GLightbox for images
   * ------------------------------------------------------------------ */

  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (portfolioContainer && typeof Isotope !== "undefined") {
      const portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item"
      });

      const portfolioFilters = select("#portfolio-flters li", true);
      on("click", "#portfolio-flters li", function (e) {
        e.preventDefault();
        portfolioFilters.forEach(el => el.classList.remove("filter-active"));
        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter")
        });
        portfolioIsotope.on("arrangeComplete", () => {
          if (typeof AOS !== "undefined") AOS.refresh();
        });
      }, true);
    }
  });

  // Global lightbox for any .portfolio-lightbox image
  const portfolioLightbox = (typeof GLightbox !== "undefined")
    ? GLightbox({ selector: ".portfolio-lightbox" })
    : null;

  /* ------------------------------------------------------------------
   * Project Summary Modal + Project Details (image / pdf)
   * ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    // Summary modal
    const summaryModalEl = document.getElementById("projectSummaryModal");
    if (summaryModalEl && typeof bootstrap !== "undefined") {
      const summaryModal = new bootstrap.Modal(summaryModalEl);
      const titleEl = summaryModalEl.querySelector(".summary-title");
      const textEl = summaryModalEl.querySelector(".summary-text");

      document.querySelectorAll(".project-summary-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          const title = this.getAttribute("data-project-title") || "Project Summary";
          const summary = this.getAttribute("data-project-summary") || "";

          if (titleEl) titleEl.textContent = title;
          if (textEl) textEl.textContent = summary;

          summaryModal.show();
        });
      });
    }

    // Project details (image via GLightbox, pdf via new tab)
    document.querySelectorAll(".project-details-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const type = this.getAttribute("data-project-type");

        if (type === "image") {
          const imgSrc = this.getAttribute("data-project-image");
          if (!imgSrc || typeof GLightbox === "undefined") return;

          const lightbox = GLightbox({
            elements: [{ href: imgSrc, type: "image" }]
          });
          lightbox.open();
        }

        if (type === "pdf") {
          const pdfUrl = this.getAttribute("data-project-pdf");
          if (!pdfUrl) return;
          window.open(pdfUrl, "_blank");
        }
      });
    });
  });

  /* ------------------------------------------------------------------
   * Simple tilt effect for elements with [data-tilt]
   * ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", () => {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    tiltElements.forEach(el => {
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
   * Collaboration badge pulse (hero / about)
   * ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", () => {
    // There are two elements with id="collabBadge" in HTML; querySelector will get the first.
    // This pulse interaction is purely visual, so it is fine to use the first occurrence.
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
   * Skill pills click pulse
   * ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", () => {
    const skillPills = document.querySelectorAll(".skill-pill");
    skillPills.forEach(pill => {
      pill.addEventListener("click", () => {
        pill.classList.add("pill-pulse");
        setTimeout(() => pill.classList.remove("pill-pulse"), 350);
      });
    });
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
   * Copy-to-clipboard buttons (if present)
   * ------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const targetSelector = this.getAttribute("data-copy-target");
        const target = document.querySelector(targetSelector);
        if (!target || !navigator.clipboard) return;

        const text = target.textContent.trim();
        navigator.clipboard.writeText(text).then(() => {
          this.innerHTML = '<i class="bi bi-check2"></i> Copied';
          setTimeout(() => {
            this.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
          }, 1500);
        });
      });
    });
  });

  /* ------------------------------------------------------------------
   * AOS (Animate on Scroll) + PureCounter
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

    if (typeof PureCounter !== "undefined") {
      new PureCounter();
    }
  });

  /* ------------------------------------------------------------------
   * Bootstrap Tooltips (for any [data-bs-toggle="tooltip"])
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
