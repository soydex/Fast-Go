const toggleButton = document.getElementById('theme-toggle');
const toggleButtonimg = document.getElementById('theme-toggle-img');
const userPref = localStorage.getItem('theme');

if (toggleButton) {
  toggleButtonimg.src = userPref === 'dark' ? 'imgs/sun.svg' : 'imgs/moon.svg';
  toggleButtonimg.alt = userPref === 'dark' ? 'Light Mode' : 'Dark Mode';
}

if (userPref) {
  document.documentElement.setAttribute('data-theme', userPref);
  toggleButtonimg.src = userPref === 'dark' ? 'imgs/sun.svg' : 'imgs/moon.svg';
  toggleButtonimg.alt = userPref === 'dark' ? 'Light Mode' : 'Dark Mode';
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', initialTheme);
  toggleButtonimg.src = prefersDark ? 'imgs/sun.svg' : 'imgs/moon.svg';
  toggleButtonimg.alt = prefersDark ? 'Light Mode' : 'Dark Mode';
}

toggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleButtonimg.src = newTheme === 'dark' ? 'imgs/sun.svg' : 'imgs/moon.svg';
  toggleButtonimg.alt = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
});