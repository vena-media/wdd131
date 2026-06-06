const yearSpan = document.getElementById('currentyear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
}

const lastModifiedP = document.getElementById('lastModified');
if (lastModifiedP) {
    lastModifiedP.textContent = 'Last Modified: ' + document.lastModified;
}

const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
    hamburger.setAttribute('aria-expanded', isOpen);
});

window.addEventListener('resize', function () {
    if (window.innerWidth >= 640) {
        nav.classList.remove('open');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', false);
    }
});