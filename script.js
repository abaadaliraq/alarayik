const virtualTours = [
  {
    title: "نموذج الجولة 01",
    url: "https://my.matterport.com/show?play=1&lang=en-US&m=SX1WhWQita6"
  },
  {
    title: "نموذج الجولة 02",
    url: "https://my.matterport.com/show?play=1&lang=en-US&m=oyaicKWaEQw"
  },
  {
    title: "نموذج الجولة 03",
    url: "https://my.matterport.com/show?play=1&lang=en-US&m=rUWyUPkBTgF"
  }
];

document.querySelectorAll(".tour-example").forEach((example) => {
  const tour = virtualTours[Number(example.dataset.tourIndex)];
  const preview = example.querySelector(".tour-preview");
  const title = example.querySelector("p");

  if (!tour || !preview || !title) return;

  title.textContent = tour.title;

  if (!tour.url || tour.url.startsWith("TOUR_URL_")) return;

  const iframe = document.createElement("iframe");
  iframe.src = tour.url;
  iframe.title = tour.title;
  iframe.loading = "lazy";
  iframe.allow = "fullscreen; xr-spatial-tracking";
  iframe.allowFullscreen = true;
  preview.appendChild(iframe);
});

const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelectorAll("[data-nav-link]");

const closeMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
  menuToggle.setAttribute("aria-expanded", "false");
};

const openMobileMenu = () => {
  if (!mobileMenu || !menuToggle) return;

  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
  menuToggle.setAttribute("aria-expanded", "true");
};

menuToggle?.addEventListener("click", openMobileMenu);
menuClose?.addEventListener("click", closeMobileMenu);

mobileMenu?.addEventListener("click", (event) => {
  if (event.target === mobileMenu) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach((element) => revealObserver.observe(element));

const navSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNavLink = (sectionId) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
  });
};

const navObserver = new IntersectionObserver((entries) => {
  const visibleEntry = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visibleEntry) {
    setActiveNavLink(visibleEntry.target.id);
  }
}, {
  rootMargin: "-24% 0px -58% 0px",
  threshold: [0.08, 0.2, 0.36]
});

navSections.forEach((section) => navObserver.observe(section));
