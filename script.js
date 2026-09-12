// ===== HERO IMAGE SLIDER (crossfade + Ken Burns zoom, boxed style) =====
const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsContainer = document.getElementById("heroDots");
let heroCurrent = 0;
let heroTimer;

heroSlides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToHeroSlide(i));
  heroDotsContainer.appendChild(dot);
});

const heroDots = document.querySelectorAll("#heroDots .dot");

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
  heroDots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function goToHeroSlide(index) {
  heroCurrent = index;
  showHeroSlide(heroCurrent);
  resetHeroTimer();
}

function nextHeroSlide() {
  heroCurrent = (heroCurrent + 1) % heroSlides.length;
  showHeroSlide(heroCurrent);
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextHeroSlide, 3800); // 3.8s per slide, smooth crossfade
}

resetHeroTimer();

// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle("active");
    question.classList.toggle("open");
  });
});

// ===== APPLY NOW MODAL =====
const applyModal = document.getElementById("applyModal");

function openModal() {
  applyModal.classList.add("active");
}

function closeModal() {
  applyModal.classList.remove("active");
}

applyModal.addEventListener("click", (e) => {
  if (e.target === applyModal) closeModal();
});

// ===== APPLY FORM -> WHATSAPP =====
const applyForm = document.getElementById("applyForm");
const WHATSAPP_NUMBER = "916267294111";

applyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("applyName").value;
  const phone = document.getElementById("applyPhone").value;

  const checkedBoxes = applyForm.querySelectorAll('input[type="checkbox"]:checked');
  const selectedServices = Array.from(checkedBoxes).map((box) => box.value).join(", ");

  if (!selectedServices) {
    alert("Kripya kam se kam ek seva chunein");
    return;
  }

  const message = `Namaste Mansi Choice Center, mera naam ${name} hai.%0AMera phone number: ${phone}%0AMujhe ye seva chahiye: ${selectedServices}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  closeModal();
});

// ===== CONTACT FORM -> WHATSAPP =====
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("cName").value;
  const email = document.getElementById("cEmail").value;
  const phone = document.getElementById("cPhone").value;
  const location = document.getElementById("cLocation").value;
  const msg = document.getElementById("cMessage").value;

  const message =
    `Namaste Mansi Choice Center,%0A` +
    `Naam: ${name}%0A` +
    `Email: ${email}%0A` +
    `Contact Number: ${phone}%0A` +
    `Location: ${location}%0A` +
    `Message: ${msg}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  contactForm.reset();
});

// ===== SHARE WEBSITE =====
function shareWebsite() {
  const shareData = {
    title: document.title,
    text: "Mansi Choice Center - Digital Seva Kendra, Nimora Raipur",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copy ho gaya hai!");
  }
}

// ===== DARK / LIGHT MODE TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeIcon.classList.toggle("fa-moon", !isDark);
  themeIcon.classList.toggle("fa-sun", isDark);
}

// Load saved preference
const savedTheme = localStorage.getItem("mcc-theme");
applyTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem("mcc-theme", isDark ? "dark" : "light");
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 300);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a.nav-link[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== SCROLLSPY (ACTIVE NAV LINK ON SCROLL) =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

// ===== LOGIN MODAL =====
const loginModal = document.getElementById("loginModal");

function openLoginModal() {
  loginModal.classList.add("active");
}

function closeLoginModal() {
  loginModal.classList.remove("active");
}

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) closeLoginModal();
});

// Tabs: Password vs OTP
function switchLoginTab(type) {
  const tabPassword = document.getElementById("tabPassword");
  const tabOtp = document.getElementById("tabOtp");
  const passwordGroup = document.getElementById("passwordGroup");
  const otpGroup = document.getElementById("otpGroup");

  if (type === "password") {
    tabPassword.classList.add("active");
    tabOtp.classList.remove("active");
    passwordGroup.style.display = "flex";
    otpGroup.style.display = "none";
  } else {
    tabOtp.classList.add("active");
    tabPassword.classList.remove("active");
    passwordGroup.style.display = "none";
    otpGroup.style.display = "flex";
  }
}

// Show / hide password
const togglePassword = document.getElementById("togglePassword");
const loginPassword = document.getElementById("loginPassword");

togglePassword.addEventListener("click", () => {
  const isHidden = loginPassword.type === "password";
  loginPassword.type = isHidden ? "text" : "password";
  togglePassword.classList.toggle("fa-eye", !isHidden);
  togglePassword.classList.toggle("fa-eye-slash", isHidden);
});

// Send OTP (demo — connect to a real SMS API/backend for production use)
function sendOtp() {
  const btn = document.getElementById("sendOtpBtn");
  let seconds = 30;
  btn.disabled = true;
  btn.textContent = `Resend in ${seconds}s`;

  const timer = setInterval(() => {
    seconds--;
    btn.textContent = `Resend in ${seconds}s`;
    if (seconds <= 0) {
      clearInterval(timer);
      btn.disabled = false;
      btn.textContent = "Send OTP";
    }
  }, 1000);
}

// Login form submit (demo only — hook this up to your real backend/auth)
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login demo hai. Real login ke liye backend (jaise Firebase/PHP) se jodna hoga.");
  closeLoginModal();
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));
