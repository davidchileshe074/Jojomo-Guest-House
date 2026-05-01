function renderSite() {
    // Check for local storage data (from CMS)
    const localData = localStorage.getItem('jojomo_site_data');
    const data = localData ? JSON.parse(localData) : window.siteData;

    if (!data) return;

    // 1. Hero Slides
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Remove existing slides except for the first one (or all)
        document.querySelectorAll('.hero-slide').forEach(s => s.remove());
        data.hero.slides.forEach((slide, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.className = `hero-bg hero-slide ${index === 0 ? 'active' : ''}`;
            slideDiv.style.backgroundImage = `url('${slide.image}')`;
            heroSection.insertBefore(slideDiv, heroSection.firstChild);
        });
    }

    // 2. Hero Content
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;

    // 3. About Section
    const aboutTitle = document.querySelector('.about-text .section-title');
    const aboutDesc = document.querySelector('.about-text p');
    const aboutFeatures = document.querySelector('.about-text .features');
    const aboutImg = document.querySelector('.about-img img');

    if (aboutTitle) aboutTitle.textContent = data.about.title;
    if (aboutDesc) aboutDesc.textContent = data.about.description;
    if (aboutImg) aboutImg.src = data.about.image;
    if (aboutFeatures) {
        aboutFeatures.innerHTML = data.about.features.map(f => `
            <div class="feature"><i class="${f.icon}"></i> <span>${f.text}</span></div>
        `).join('');
    }

    // 4. Locations
    const locationContainer = document.querySelector('.location-cards');
    if (locationContainer) {
        locationContainer.innerHTML = data.locations.map((loc, index) => `
            <div class="card location-card animate-on-scroll zoom-in ${index > 0 ? 'delay-1' : ''}">
                <div class="card-img" style="background-image: url('${loc.image}');"></div>
                <div class="card-content">
                    <h3><i class="fas fa-map-marker-alt text-gold"></i> ${loc.name}</h3>
                    <ul class="location-details">
                        ${loc.details.map(d => `<li><i class="fas fa-check-circle"></i> ${d}</li>`).join('')}
                    </ul>
                    <div class="map-container">
                        <iframe src="${loc.mapEmbed}" width="100%" height="150" style="border:0; border-radius: 10px; margin-top: 15px;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 5. Rooms
    const pricingGrid = document.querySelector('.pricing-grid');
    if (pricingGrid) {
        pricingGrid.innerHTML = data.rooms.map((room, index) => `
            <div class="price-card ${room.popular ? 'popular' : ''} tilt-effect animate-on-scroll zoom-in ${index % 3 !== 0 ? 'delay-' + (index % 3) : ''}" 
                 data-room="${room.name}" data-price="${room.price}" data-desc="${room.description}" data-img="${room.image}">
                ${room.badge ? `<div class="badge ${room.popular ? 'gold-badge' : ''}">${room.badge}</div>` : ''}
                <h3>${room.name}</h3>
                <div class="price">${room.price}<span>/night</span></div>
                <div class="card-actions">
                    <a href="#contact" class="btn-primary">Book Now</a>
                    <button class="btn-quickview"><i class="fas fa-eye"></i> Quick View</button>
                </div>
            </div>
        `).join('');
    }

    // 6. Gallery
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        sliderTrack.innerHTML = data.gallery.map(img => `
            <img src="${img}" alt="Room" class="lightbox-trigger">
        `).join('');
    }

    // 7. Offers & Services
    const offerList = document.querySelector('.offer-list');
    if (offerList) {
        offerList.innerHTML = data.offers.map(o => `
            <li><i class="fas fa-tags text-gold"></i> ${o}</li>
        `).join('');
    }

    const servicesBox = document.querySelector('.services-box');
    if (servicesBox) {
        // Keep the title
        const title = servicesBox.querySelector('.section-title').outerHTML;
        servicesBox.innerHTML = title + data.services.map(s => `
            <div class="service-item">
                <div class="service-icon"><i class="${s.icon}"></i></div>
                <div class="service-info">
                    <h4>${s.title}</h4>
                    <p>${s.detail}</p>
                </div>
            </div>
        `).join('');
    }

    // 8. FAQ
    const accordion = document.querySelector('.accordion');
    if (accordion) {
        accordion.innerHTML = data.faq.map(f => `
            <div class="accordion-item">
                <button class="accordion-header">
                    ${f.q} <i class="fas fa-plus"></i>
                </button>
                <div class="accordion-content">
                    <p>${f.a}</p>
                </div>
            </div>
        `).join('');
    }

    // 9. Testimonials
    const testimonialTrack = document.getElementById('testimonialTrack');
    if (testimonialTrack) {
        testimonialTrack.innerHTML = data.testimonials.map(t => `
            <div class="testimonial-card">
                <div class="testimonial-stars">${Array(Math.floor(t.stars)).fill('<i class="fas fa-star"></i>').join('')}${t.stars % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}</div>
                <p class="testimonial-text">&ldquo;${t.text}&rdquo;</p>
                <div class="testimonial-author">
                    <div class="author-avatar"><i class="fas fa-user"></i></div>
                    <div>
                        <strong>${t.author}</strong>
                        <span>${t.location}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 10. Contact Info
    const contactMethods = document.querySelector('.contact-methods');
    if (contactMethods) {
        contactMethods.innerHTML = `
            <div class="method">
                <i class="fas fa-phone-alt"></i>
                <div><p>${data.contact.phone}</p></div>
            </div>
            <div class="method">
                <i class="fab fa-whatsapp"></i>
                <div><p>${data.contact.phone}</p></div>
            </div>
        `;
    }
    
    // Update links
    document.querySelectorAll('a[href^="tel:"]').forEach(a => a.href = `tel:${data.contact.phone}`);
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => a.href = `https://wa.me/${data.contact.whatsapp}`);

    // Re-initialize observers and event listeners if needed
    // Note: Since script.js runs on DOMContentLoaded, we should call renderSite() before script.js or inside it.
}

// Execute rendering
document.addEventListener('DOMContentLoaded', () => {
    renderSite();
});
