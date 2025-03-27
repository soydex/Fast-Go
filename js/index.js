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
