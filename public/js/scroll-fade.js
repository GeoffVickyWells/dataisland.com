// Set initial hidden state via JS so the browser paints it
// before we animate to visible — guarantees the transition fires
document.querySelectorAll(".fade-in").forEach(function (el) {
  el.style.opacity = "0";
  el.style.transform = "translateY(40px)";
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
});

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -60px 0px"
});

document.querySelectorAll(".fade-in").forEach(function (el) {
  observer.observe(el);
});
