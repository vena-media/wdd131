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
const temples = [
    {
        name: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: 2005,
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        name: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: 1888,
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        name: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: 2015,
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        name: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: 2020,
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        name: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: 1974,
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        name: "Lima Perú",
        location: "Lima, Perú",
        dedicated: 1986,
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        name: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: 1983,
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        name: "Abijan Ivory Coast",
        location: "abidjan, Cote d'Ivoire",
        dedicated: 2025,
        area: 17362,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/abidjan-ivory-coast-temple/abidjan-ivory-coast-temple-59305.jpg"
    },
    {
        name: "Antofagasta Chile",
        location: "Antofagasta Chile",
        dedicated: 2025,
        area: 26163,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/antofagasta-chile-temple/antofagasta-chile-temple-48608.jpg"
    },
    {
        name: "Dallas Texas",
        location: "Dallas Texas, United States",
        dedicated: 1984,
        area: 44207,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-59552.jpg"
    }
];


function displayTemples(list) {
    const container = document.querySelector(".grid");
    container.innerHTML = "";

    list.forEach(temple => {
        const card = document.createElement("section");

        card.innerHTML = `
      <h3>${temple.name}</h3>
      <p>${temple.location}</p>
      <p>Dedicated: ${temple.dedicated}</p>
      <p>Area: ${temple.area} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.name}" loading="lazy">
    `;

        container.appendChild(card);
    });
}




document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const filter = e.target.dataset.filter();

        let filteredTemples = temples;

        if (filter === "old") {
            filteredTemples = temples.filter(t => t.dedicated < 1900);
        }
        else if (filter === "new") {
            filteredTemples = temples.filter(t => t.dedicated > 2000);
        }
        else if (filter === "large") {
            filteredTemples = temples.filter(t => t.area > 90000);
        }
        else if (filter === "small") {
            filteredTemples = temples.filter(t => t.area < 10000);
        }

        displayTemples(filteredTemples);
    });
});


displayTemples(temples);