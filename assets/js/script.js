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

// Count Up Animation on Scroll
function animateCountUp(span, target) {
  let start = 0;
  let end = parseFloat(target.replace(/,/g, ""));
  let duration = 2000;
  let startTime = null;
  let isFloat =
    target.includes(".") || target.includes("M") || target.includes("$");
  let decimals = target.split(".")[1]?.length || 0;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = Math.min((timestamp - startTime) / duration, 1);
    let value = start + (end - start) * progress;
    if (isFloat) {
      span.textContent = value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    } else {
      span.textContent = Math.floor(value).toLocaleString();
    }
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

function handleCountRowAnimation() {
  const countRow = document.querySelector(".count-row");
  const spans = countRow.querySelectorAll("span[data-target]");
  let animated = false;

  function onScroll() {
    const rect = countRow.getBoundingClientRect();
    if (!animated && rect.top < window.innerHeight && rect.bottom > 0) {
      spans.forEach((span) => {
        animateCountUp(span, span.getAttribute("data-target"));
      });
      animated = true;
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  // In case already in view on load
  onScroll();
}

document.addEventListener("DOMContentLoaded", handleCountRowAnimation);

// ------------------------------------------------------------------------------------------------------

// Functionality for WhatsApp Form Submission
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function () {
  this.value = this.value.slice(0, 10);
});

document.getElementById("whatsappForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (phone.length !== 10) return; // Silently ignore invalid length

  const whatsappNumber = "917771810803";
  const message = `Hello, my name is ${name} and my phone number is ${phone}. I would like to trade on your platform.`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
});

// ------------------------------------------------------------------------------------------------------