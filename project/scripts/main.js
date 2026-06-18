// ============================================================
// Vee Bites Blog — main.js
// ============================================================

// ── Data ──────────────────────────────────────────────────
const recipes = [
    {
        id: 'creamy-chicken-pasta',
        name: 'Creamy Chicken Pasta',
        category: 'Lunch',
        description: 'A rich and satisfying pasta dish made with tender chicken, a creamy sauce, and herbs.',
        ingredients: ['Pasta', 'Chicken breast', 'Heavy cream', 'Garlic', 'Parmesan cheese', 'Butter', 'Parsley'],
        emoji: '🍝',
        Image: 'images/creamy-chicken-pasta.webp',
    },
    {
        id: 'vegetable-omelette',
        name: 'Vegetable Omelette with Toast',
        category: 'Breakfast',
        description: 'A fluffy omelette packed with fresh vegetables and served with toasted bread for a healthy start to the day.',
        ingredients: ['Eggs', 'Bell peppers', 'Onions', 'Tomatoes', 'Spinach', 'Bread', 'Butter'],
        emoji: '🍳',
        image: 'images/vegetable-omelette.webp'
    },
    {
        id: 'grilled-fish-garlic-rice',
        name: 'Grilled Fish with Garlic Rice',
        category: 'Dinner',
        description: 'Flavorful grilled fish paired with aromatic garlic rice and fresh herbs for a balanced evening meal.',
        ingredients: ['Fish fillets', 'Rice', 'Garlic', 'Olive oil', 'Lemon', 'Parsley', 'Black pepper'],
        emoji: '🐟',
        image: 'images/grilled-fish-garlic-rice.webp',
    },
];

const reviews = [
    {
        id: 'pasta-corner',
        name: 'The Pasta Corner',
        location: 'Lagos, Nigeria',
        type: 'Italian Restaurant',
        rating: 5,
        review: 'The creamy pasta was perfectly cooked, and the service was fast and friendly. A must-visit for Italian food lovers in Lagos.',
        image: 'images/pasta-corner.webp',
    },
    {
        id: 'item-7',
        name: 'Item 7',
        location: 'Ikeja & Lekki',
        type: 'Shawarma & Fast Food',
        rating: 5,
        review: 'The shawarma was generously filled, perfectly seasoned, and served fresh with a delicious garlic sauce. Consistently excellent.',
        image: 'images/item-7-logo.webp',
    },
];

// ── Helpers ───────────────────────────────────────────────

/**
 * Generate star string from a numeric rating
 * @param {number} rating - 1 to 5
 * @returns {string} star emoji string
 */
function renderStars(rating) {
    const filled = '⭐'.repeat(rating);
    const empty = '☆'.repeat(5 - rating);
    return `${filled}${empty}`;
}

/**
 * Show a toast notification
 * @param {string} message
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── localStorage helpers ───────────────────────────────────

/**
 * Get saved recipe IDs from localStorage
 * @returns {string[]}
 */
function getSavedRecipes() {
    const stored = localStorage.getItem('vee-bites-saved');
    return stored ? JSON.parse(stored) : [];
}

/**
 * Toggle save state for a recipe and persist
 * @param {string} id
 * @returns {boolean} true if now saved
 */
function toggleSavedRecipe(id) {
    const saved = getSavedRecipes();
    const index = saved.indexOf(id);

    if (index === -1) {
        saved.push(id);
        localStorage.setItem('vee-bites-saved', JSON.stringify(saved));
        return true;
    } else {
        saved.splice(index, 1);
        localStorage.setItem('vee-bites-saved', JSON.stringify(saved));
        return false;
    }
}

// ── Build recipe card HTML ─────────────────────────────────

/**
 * Build a recipe card element
 * @param {Object} recipe
 * @returns {HTMLElement}
 */
function buildRecipeCard(recipe) {
    const saved = getSavedRecipes();
    const isSaved = saved.includes(recipe.id);

    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.dataset.category = recipe.category;
    card.dataset.id = recipe.id;

    card.innerHTML = `
   <img
    src="${recipe.image}"
    alt="${recipe.name}"
    class="recipe-card-img"
    loading="lazy"
    width="800"
    height="600"
>
    </div>
    <div class="recipe-card-body">
      <span class="recipe-category">${recipe.category}</span>
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
    </div>
    <div class="recipe-card-footer">
      <button
        class="btn-save ${isSaved ? 'saved' : ''}"
        aria-label="${isSaved ? 'Remove from saved' : 'Save'} ${recipe.name}"
        data-id="${recipe.id}"
      >${isSaved ? '✓ Saved' : '+ Save'}</button>
    </div>
  `;

    // Save button event
    const saveBtn = card.querySelector('.btn-save');
    saveBtn.addEventListener('click', () => {
        const nowSaved = toggleSavedRecipe(recipe.id);
        saveBtn.textContent = nowSaved ? '✓ Saved' : '+ Save';
        saveBtn.classList.toggle('saved', nowSaved);
        saveBtn.setAttribute('aria-label', `${nowSaved ? 'Remove from saved' : 'Save'} ${recipe.name}`);
        showToast(nowSaved ? `"${recipe.name}" saved!` : `"${recipe.name}" removed from saved.`);
        updateSavedBanner();
    });

    return card;
}

// ── Build review card HTML ─────────────────────────────────

/**
 * Build a review card element
 * @param {Object} r
 * @returns {HTMLElement}
 */
function buildReviewCard(r) {
    const card = document.createElement('article');
    card.className = 'review-card';

    card.innerHTML = `
    <img
    src="${r.image}"
    alt="${r.name} logo"
    class="review-logo"
    loading="lazy"
    width="800"
    height="600"
>
    <div class="review-card-header">
      <h3 class="review-name">${r.name}</h3>
      <span class="review-stars" aria-label="Rating: ${r.rating} out of 5 stars">${renderStars(r.rating)}</span>
    </div>
    <p class="review-meta">${r.type} &mdash; ${r.location}</p>
    <p class="review-text">${r.review}</p>
  `;

    return card;
}

// ── Saved recipes banner ───────────────────────────────────

function updateSavedBanner() {
    const banner = document.getElementById('saved-banner');
    if (!banner) return;

    const saved = getSavedRecipes();

    if (saved.length === 0) {
        banner.classList.remove('visible');
        return;
    }

    const savedNames = recipes
        .filter(r => saved.includes(r.id))
        .map(r => r.name);

    banner.innerHTML = `
    <strong>Your saved recipes (${savedNames.length}):</strong>
    ${savedNames.join(' &bull; ')}
  `;
    banner.classList.add('visible');
}

// ── Render: Homepage featured sections ────────────────────

function renderHomepage() {
    const recipeContainer = document.getElementById('featured-recipes');
    const reviewContainer = document.getElementById('featured-reviews');

    if (recipeContainer) {
        recipes.forEach(recipe => {
            recipeContainer.appendChild(buildRecipeCard(recipe));
        });
        updateSavedBanner();
    }

    if (reviewContainer) {
        reviews.forEach(review => {
            reviewContainer.appendChild(buildReviewCard(review));
        });
    }
}

// ── Render: Recipes page with filter ──────────────────────

function renderRecipesPage() {
    const grid = document.getElementById('recipe-grid');
    const filterBar = document.getElementById('filter-bar');
    if (!grid || !filterBar) return;

    // Get unique categories
    const categories = ['All', ...new Set(recipes.map(r => r.category))];

    // Build filter buttons
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn${cat === 'All' ? ' active' : ''}`;
        btn.textContent = cat;
        btn.setAttribute('aria-pressed', cat === 'All' ? 'true' : 'false');

        btn.addEventListener('click', () => {
            // Update active state
            filterBar.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            filterRecipes(cat);
        });

        filterBar.appendChild(btn);
    });

    // Render all recipes initially
    recipes.forEach(recipe => {
        grid.appendChild(buildRecipeCard(recipe));
    });

    updateSavedBanner();
}

/**
 * Filter recipe cards by category
 * @param {string} category
 */
function filterRecipes(category) {
    const grid = document.getElementById('recipe-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.recipe-card');

    cards.forEach(card => {
        const match = category === 'All' || card.dataset.category === category;
        card.style.display = match ? '' : 'none';
    });
}

// ── Render: Reviews page ───────────────────────────────────

function renderReviewsPage() {
    const grid = document.getElementById('review-grid');
    if (!grid) return;

    reviews.forEach(review => {
        grid.appendChild(buildReviewCard(review));
    });
}

// ── Form handling ──────────────────────────────────────────

function initContactForm() {
    const form = document.getElementById('suggest-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameVal = document.getElementById('your-name').value.trim();
        const emailVal = document.getElementById('your-email').value.trim();
        const restaurantVal = document.getElementById('restaurant-name').value.trim();

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const restaurantError = document.getElementById('restaurant-error');

        let valid = true;

        // Validate name
        if (nameVal === '') {
            nameError.classList.add('visible');
            valid = false;
        } else {
            nameError.classList.remove('visible');
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailVal)) {
            emailError.classList.add('visible');
            valid = false;
        } else {
            emailError.classList.remove('visible');
        }

        // Validate restaurant
        if (restaurantVal === '') {
            restaurantError.classList.add('visible');
            valid = false;
        } else {
            restaurantError.classList.remove('visible');
        }

        if (!valid) return;

        // Save submission to localStorage
        const submission = {
            name: nameVal,
            email: emailVal,
            restaurant: restaurantVal,
            location: document.getElementById('restaurant-location').value.trim(),
            cuisine: document.getElementById('cuisine-type').value,
            note: document.getElementById('why-suggest').value.trim(),
            submittedAt: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('vee-bites-suggestions') || '[]');
        existing.push(submission);
        localStorage.setItem('vee-bites-suggestions', JSON.stringify(existing));

        // Show success
        document.getElementById('form-success').classList.add('visible');
        form.reset();
        showToast(`Thanks, ${nameVal}! Suggestion received.`);
    });
}

// ── Nav: mobile toggle ────────────────────────────────────

function initNav() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });
}

// ── Detect current page and initialise ────────────────────

function init() {
    initNav();
    initContactForm();

    const path = window.location.pathname;

    if (path.includes('recipes.html')) {
        renderRecipesPage();
    } else if (path.includes('reviews.html')) {
        renderReviewsPage();
    } else {
        // Homepage — index.html or root
        renderHomepage();
    }
}

document.addEventListener('DOMContentLoaded', init);