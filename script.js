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
