// Toggle Mobile Menu
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Slideshow Functionality
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
  setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  slides[slideIndex - 1].style.display = 'none';
  slideIndex--;
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  slides[slideIndex - 1].style.display = 'block';
}

function nextSlide() {
  const slides = document.querySelectorAll('.slide');
  slides[slideIndex - 1].style.display = 'none';
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = 'block';
}

// Login Modal
const loginBtn = document.getElementById('login-btn');
const modal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close');
const loginForm = document.getElementById('login-form');
const profile = document.getElementById('profile');
const profileName = document.getElementById('profile-name');

// Open modal
loginBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const regNumber = document.getElementById('reg-number').value;

  // Send data to Google Apps Script
  const response = await fetch('https://script.google.com/macros/s/AKfycbwFvTlKHUSMq7ov_-2eLK-YPSlpgPZYLgr9mqV8FnzUMKRPsux4nOSKoJuBWFkb8Bn_/exec', {
    method: 'POST',
    body: JSON.stringify({ name, regNumber }),
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await response.json();
  if (result.status === 'success') {
    // Show profile and hide login button
    profileName.textContent = result.name;
    profile.style.display = 'inline';
    loginBtn.style.display = 'none';
    modal.style.display = 'none';
  } else {
    alert('Invalid credentials. Please try again.');
  }
});