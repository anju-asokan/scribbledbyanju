document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.header-inner');
  if (toggle && header) {
    toggle.addEventListener('click', () => {
      header.classList.toggle('mobile-open');
    });
  }

  // Duplicate testimonial cards at runtime (not in raw HTML) so the
  // seamless auto-scroll loop works without exposing duplicate text to crawlers.
  const reviewsTrack = document.querySelector('.reviews-track');
  if (reviewsTrack) {
    const originalCards = Array.from(reviewsTrack.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      reviewsTrack.appendChild(clone);
    });
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Contact form: submit via AJAX and show a fading "Thank you" popup
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          contactForm.reset();
          showToast('Thank you for submitting.');
        } else {
          showToast('Something went wrong. Please try again.');
        }
      } catch (err) {
        showToast('Something went wrong. Please try again.');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
      }
    });
  }

  // Site search overlay
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-field input');
  const searchResults = document.querySelector('.search-results');
  const searchClose = document.querySelector('.search-close');
  const index = window.SBA_SEARCH_INDEX || [];
  const categoryHints = window.SBA_SEARCH_CATEGORY_HINTS || {};

  function scoreItem(item, terms) {
    const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase();
    let score = 0;
    terms.forEach(term => {
      if (!term) return;
      if (item.title.toLowerCase().includes(term)) score += 5;
      if (haystack.includes(term)) score += 2;
    });
    return score;
  }

  function findCategoryFallback(terms) {
    // Count how many search terms match each category's hint words,
    // then surface items from the best-matching category.
    const categoryScores = {};
    Object.keys(categoryHints).forEach(cat => { categoryScores[cat] = 0; });
    terms.forEach(term => {
      if (!term) return;
      Object.entries(categoryHints).forEach(([cat, hints]) => {
        hints.forEach(hint => {
          if (term.includes(hint) || hint.includes(term)) categoryScores[cat] += 1;
        });
      });
    });
    const bestCat = Object.entries(categoryScores)
      .filter(([, score]) => score > 0)
      .sort((a, b) => b[1] - a[1])[0];
    if (!bestCat) return [];
    return index.filter(item => item.category === bestCat[0]);
  }

  function renderResults(query) {
    if (!searchResults) return;
    searchResults.innerHTML = '';
    const q = query.trim().toLowerCase();
    if (!q) return;
    const terms = q.split(/\s+/).filter(Boolean);

    let matches = index
      .map(item => ({ item, score: scoreItem(item, terms) }))
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.item);

    let heading = '';
    if (!matches.length) {
      matches = findCategoryFallback(terms);
      if (matches.length) {
        heading = `No exact match for "${query}" — here's what's closest:`;
      }
    }

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = `No results for "${query}". Try "engraving", "wedding" or "corporate".`;
      searchResults.appendChild(empty);
      return;
    }

    if (heading) {
      const note = document.createElement('p');
      note.className = 'search-empty';
      note.textContent = heading;
      searchResults.appendChild(note);
    }

    matches.slice(0, 8).forEach(item => {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = 'search-result';
      a.innerHTML = `<span class="r-title">${item.title}</span><span class="r-desc">${item.description}</span>`;
      searchResults.appendChild(a);
    });
  }

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput && searchInput.focus(), 50);
  }

  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', openSearch);
    searchClose && searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) closeSearch();
      if ((e.key === '/' || (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey))) &&
          document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
    });
    searchInput && searchInput.addEventListener('input', () => renderResults(searchInput.value));
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    // trigger fade-in
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    // fade out and remove
    setTimeout(() => {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, 3200);
  }
});
