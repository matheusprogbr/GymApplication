const htmlDoc = document.querySelector('html');
const checkbox = document.querySelector('#theme');

checkbox.addEventListener('click', () => {
  htmlDoc.classList.toggle('active-theme');
});