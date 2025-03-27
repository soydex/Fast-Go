const questionBoxes = document.querySelectorAll('.questions_box');

questionBoxes.forEach((box) => {
  const question = box.querySelector('.questions');
  const answer = box.querySelector('.answers');
  const arrow = box.querySelector('.questions img');
  if (question && answer && arrow) {
    question.addEventListener('click', () => {
      console.log('clicked');
      answer.classList.toggle('active');
      arrow.classList.toggle('active');
      question.classList.toggle('active');
    });
  }
});

const heroSection = document.querySelector('.hero');
const dots = document.querySelectorAll('.dot');

const heroBackgrounds = [
  'hero hero-1', 
  'hero hero-2', 
  'hero hero-3', 
];

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    dots.forEach((dot) => dot.classList.remove('active'));
    heroSection.className = heroBackgrounds[index] || heroBackgrounds[0];
    dot.classList.add('active');
  });
});

let currentIndex = 0;
setInterval(() => {
  dots.forEach((dot) => dot.classList.remove('active'));
  currentIndex = (currentIndex + 1) % heroBackgrounds.length;
  heroSection.className = heroBackgrounds[currentIndex];
  dots[currentIndex].classList.add('active');
}, 7500);