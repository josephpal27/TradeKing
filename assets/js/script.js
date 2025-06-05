// Lenis Scroll Adjustment For All Pages
const lenis = new Lenis({
  duration: 0.5, // Adjust the duration for smooth scrolling
  easing: (t) => t * (2 - t),
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// ------------------------------------------------------------------------------------------------------