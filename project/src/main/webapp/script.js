/** Show and hide nav bar */
function toggleNavBar() {
  const nav = document.getElementById('nav');
  if (nav.style.display === 'none') {
    nav.style.display = 'block';
  } else {
    nav.style.display = 'none';
  }
}