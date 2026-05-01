document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State
    let currentSection = 'hero';
    let data = localStorage.getItem('jojomo_site_data') 
               ? JSON.parse(localStorage.getItem('jojomo_site_data')) 
               : window.siteData;

    // 2. Selectors
    const navLinks = document.querySelectorAll('.admin-nav a');
    const sectionTitle = document.getElementById('sectionTitle');
    const editorContent = document.getElementById('editorContent');
    const publishBtn = document.getElementById('publishBtn');
    const publishBtnHeader = document.getElementById('publishBtnHeader');
    const toast = document.getElementById('adminToast');
    const imageUploader = document.getElementById('imageUploader');
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const adminContainer = document.querySelector('.admin-container');
    const adminOverlay = document.getElementById('adminOverlay');
    let activeUploadTarget = null;

    // ── Mobile Menu Toggle ──
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            adminContainer.classList.toggle('sidebar-active');
        });
    }

    if (closeSidebar) {
        closeSidebar.addEventListener('click', () => {
            adminContainer.classList.remove('sidebar-active');
        });
    }

    if (adminOverlay) {
        adminOverlay.addEventListener('click', () => {
            adminContainer.classList.remove('sidebar-active');
        });
    }

    // ── Image Upload Handling ──
    window.triggerUpload = (targetSelector) => {
        activeUploadTarget = targetSelector;
        imageUploader.click();
    };

    imageUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Optimization: Check file size
        if (file.size > 1024 * 1024) { // 1MB limit for Base64 efficiency
            if (!confirm('This image is large. To keep the site fast, consider using images under 1MB. Continue?')) return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result;
            if (activeUploadTarget) {
                const input = document.querySelector(activeUploadTarget);
                if (input) {
                    input.value = base64;
                    // Trigger preview update
                    const imgPreview = input.parentElement.parentElement.querySelector('.image-preview-mini');
                    if (imgPreview) imgPreview.src = base64;
                }
            }
        };
        reader.readAsDataURL(file);
    });

    // 3. Section Rendering Logic
    const renderers = {
        hero: () => `
            <div class="form-card">
                <h3>Hero Content</h3>
                <div class="form-group">
                    <label>Subtitle</label>
                    <textarea id="heroSubtitle" rows="3">${data.hero.subtitle}</textarea>
                </div>
                <div class="form-group">
                    <label>Typing Words (comma separated)</label>
                    <input type="text" id="heroWords" value="${data.hero.typingWords.join(', ')}">
                </div>
            </div>
            <div class="form-card">
                <h3>Background Slides</h3>
                <div class="item-list-editor" id="heroSlidesList">
                    ${data.hero.slides.map((s, i) => `
                        <div class="item-row" data-index="${i}">
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-with-action">
                                    <input type="text" id="heroSlide${i}" class="slide-img-input" value="${s.image}" readonly placeholder="Image selected..." onclick="triggerUpload('#heroSlide${i}')">
                                    <button class="btn-upload" onclick="triggerUpload('#heroSlide${i}')"><i class="fas fa-upload"></i> Upload</button>
                                </div>
                                <img src="${s.image}" class="image-preview-mini">
                            </div>
                            <button class="btn-remove" onclick="removeListItem('hero.slides', ${i})"><i class="fas fa-trash"></i></button>
                        </div>
                    `).join('')}
                    <button class="btn-add" onclick="addListItem('hero.slides', {image: ''})"><i class="fas fa-plus"></i> Add Slide</button>
                </div>
            </div>
        `,
        about: () => `
            <div class="form-card">
                <h3>About Section</h3>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="aboutTitle" value="${data.about.title}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea id="aboutDesc" rows="6">${data.about.description}</textarea>
                </div>
                <div class="form-group">
                    <label>Main Image</label>
                    <div class="input-with-action">
                        <input type="text" id="aboutImgInput" value="${data.about.image}" readonly placeholder="Image selected..." onclick="triggerUpload('#aboutImgInput')">
                        <button class="btn-upload" onclick="triggerUpload('#aboutImgInput')"><i class="fas fa-upload"></i> Upload</button>
                    </div>
                    <img src="${data.about.image}" class="image-preview-mini">
                </div>
            </div>
        `,
        rooms: () => `
            <div class="item-list-editor">
                ${data.rooms.map((room, i) => `
                    <div class="form-card item-row" data-index="${i}">
                        <div style="width: 100%">
                            <div class="form-group">
                                <label>Room Name</label>
                                <input type="text" class="room-name" value="${room.name}">
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="text" class="room-price" value="${room.price}">
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="room-desc" rows="3">${room.description}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Badge (e.g. Promotion, Most Popular)</label>
                                <input type="text" class="room-badge" value="${room.badge || ''}">
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-with-action">
                                    <input type="text" id="roomImg${i}" class="room-img" value="${room.image}" readonly placeholder="Image selected..." onclick="triggerUpload('#roomImg${i}')">
                                    <button class="btn-upload" onclick="triggerUpload('#roomImg${i}')"><i class="fas fa-upload"></i> Upload</button>
                                </div>
                                <img src="${room.image}" class="image-preview-mini">
                            </div>
                        </div>
                        <button class="btn-remove" onclick="removeListItem('rooms', ${i})"><i class="fas fa-trash"></i></button>
                    </div>
                `).join('')}
                <button class="btn-add" onclick="addListItem('rooms', {name: 'New Room', price: 'K100', description: '', image: ''})"><i class="fas fa-plus"></i> Add New Room</button>
            </div>
        `,
        gallery: () => `
            <div class="form-card">
                <h3>Gallery Images</h3>
                <div class="item-list-editor">
                    ${data.gallery.map((img, i) => `
                        <div class="item-row" data-index="${i}">
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-with-action">
                                    <input type="text" id="galleryImg${i}" class="gallery-img-input" value="${img}" readonly placeholder="Image selected..." onclick="triggerUpload('#galleryImg${i}')">
                                    <button class="btn-upload" onclick="triggerUpload('#galleryImg${i}')"><i class="fas fa-upload"></i> Upload</button>
                                </div>
                                <img src="${img}" class="image-preview-mini">
                            </div>
                            <button class="btn-remove" onclick="removeListItem('gallery', ${i})"><i class="fas fa-trash"></i></button>
                        </div>
                    `).join('')}
                    <button class="btn-add" onclick="addListItem('gallery', '')"><i class="fas fa-plus"></i> Add Image</button>
                </div>
            </div>
        `,
        testimonials: () => `
            <div class="item-list-editor">
                ${data.testimonials.map((t, i) => `
                    <div class="form-card item-row" data-index="${i}">
                        <div style="width: 100%">
                            <div class="form-group">
                                <label>Author Name</label>
                                <input type="text" class="t-author" value="${t.author}">
                            </div>
                            <div class="form-group">
                                <label>Location</label>
                                <input type="text" class="t-location" value="${t.location}">
                            </div>
                            <div class="form-group">
                                <label>Testimonial Text</label>
                                <textarea class="t-text" rows="3">${t.text}</textarea>
                            </div>
                            <div class="form-group">
                                <label>Stars (0-5)</label>
                                <input type="number" step="0.5" class="t-stars" value="${t.stars}">
                            </div>
                        </div>
                        <button class="btn-remove" onclick="removeListItem('testimonials', ${i})"><i class="fas fa-trash"></i></button>
                    </div>
                `).join('')}
                <button class="btn-add" onclick="addListItem('testimonials', {author: 'New Guest', location: '', text: '', stars: 5})"><i class="fas fa-plus"></i> Add Testimonial</button>
            </div>
        `,
        locations: () => `
            <div class="item-list-editor">
                ${data.locations.map((loc, i) => `
                    <div class="form-card item-row" data-index="${i}">
                        <div style="width: 100%">
                            <div class="form-group">
                                <label>Branch Name</label>
                                <input type="text" class="loc-name" value="${loc.name}">
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <div class="input-with-action">
                                    <input type="text" id="locImg${i}" class="loc-img" value="${loc.image}" readonly placeholder="Image selected..." onclick="triggerUpload('#locImg${i}')">
                                    <button class="btn-upload" onclick="triggerUpload('#locImg${i}')"><i class="fas fa-upload"></i> Upload</button>
                                </div>
                                <img src="${loc.image}" class="image-preview-mini">
                            </div>
                            <div class="form-group">
                                <label>Details (comma separated)</label>
                                <input type="text" class="loc-details" value="${loc.details.join(', ')}">
                            </div>
                            <div class="form-group">
                                <label>Map Embed URL (iframe src)</label>
                                <input type="text" class="loc-map" value="${loc.mapEmbed}">
                            </div>
                        </div>
                        <button class="btn-remove" onclick="removeListItem('locations', ${i})"><i class="fas fa-trash"></i></button>
                    </div>
                `).join('')}
                <button class="btn-add" onclick="addListItem('locations', {name: 'New Branch', image: '', details: [], mapEmbed: ''})"><i class="fas fa-plus"></i> Add New Branch</button>
            </div>
        `,
        contact: () => `
            <div class="form-card">
                <h3>Contact Information</h3>
                <div class="form-group">
                    <label>Display Phone Number</label>
                    <input type="text" id="contactPhone" value="${data.contact.phone}">
                </div>
                <div class="form-group">
                    <label>WhatsApp Number (format: 260XXXXXXXXX)</label>
                    <input type="text" id="contactWhatsApp" value="${data.contact.whatsapp}">
                </div>
                <div class="form-group">
                    <label>Facebook Page Link</label>
                    <input type="text" id="contactFB" value="${data.contact.facebook}">
                </div>
            </div>
        `
    };

    // 4. Navigation Control
    function switchSection(sectionId) {
        currentSection = sectionId;
        
        // Update UI
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
        });
        
        const link = document.querySelector(`.admin-nav a[data-section="${sectionId}"]`);
        sectionTitle.textContent = link.textContent.trim();
        
        // Render content
        if (renderers[sectionId]) {
            editorContent.innerHTML = renderers[sectionId]();
        } else {
            editorContent.innerHTML = `<div class="form-card">Editor for ${sectionId} coming soon.</div>`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            saveCurrentSection(); // Auto-save when switching
            switchSection(section);
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 992) {
                adminContainer.classList.remove('sidebar-active');
            }
        });
    });

    // 5. Data Manipulation
    window.addListItem = (path, defaultValue) => {
        const parts = path.split('.');
        let target = data;
        for (let i = 0; i < parts.length - 1; i++) target = target[parts[i]];
        target[parts[parts.length - 1]].push(defaultValue);
        switchSection(currentSection); // Refresh view
    };

    window.removeListItem = (path, index) => {
        if (!confirm('Are you sure you want to remove this item?')) return;
        const parts = path.split('.');
        let target = data;
        for (let i = 0; i < parts.length - 1; i++) target = target[parts[i]];
        target[parts[parts.length - 1]].splice(index, 1);
        switchSection(currentSection); // Refresh view
    };

    // 6. Saving Logic
    function saveCurrentSection() {
        if (currentSection === 'hero') {
            data.hero.subtitle = document.getElementById('heroSubtitle').value;
            data.hero.typingWords = document.getElementById('heroWords').value.split(',').map(s => s.trim());
            const slides = [];
            document.querySelectorAll('.slide-img-input').forEach(input => {
                slides.push({ image: input.value });
            });
            data.hero.slides = slides;
        } else if (currentSection === 'about') {
            data.about.title = document.getElementById('aboutTitle').value;
            data.about.description = document.getElementById('aboutDesc').value;
            data.about.image = document.getElementById('aboutImgInput').value;
        } else if (currentSection === 'locations') {
            const locations = [];
            document.querySelectorAll('.item-row[data-index]').forEach(row => {
                locations.push({
                    name: row.querySelector('.loc-name').value,
                    image: row.querySelector('.loc-img').value,
                    details: row.querySelector('.loc-details').value.split(',').map(s => s.trim()),
                    mapEmbed: row.querySelector('.loc-map').value
                });
            });
            data.locations = locations;
        } else if (currentSection === 'rooms') {
            const rooms = [];
            document.querySelectorAll('.item-row[data-index]').forEach(row => {
                rooms.push({
                    name: row.querySelector('.room-name').value,
                    price: row.querySelector('.room-price').value,
                    description: row.querySelector('.room-desc').value,
                    badge: row.querySelector('.room-badge').value,
                    image: row.querySelector('.room-img').value,
                    popular: row.classList.contains('popular') // Logic for popularity could be added
                });
            });
            data.rooms = rooms;
        } else if (currentSection === 'gallery') {
            const gallery = [];
            document.querySelectorAll('.gallery-img-input').forEach(input => {
                gallery.push(input.value);
            });
            data.gallery = gallery;
        } else if (currentSection === 'testimonials') {
            const testimonials = [];
            document.querySelectorAll('.item-row[data-index]').forEach(row => {
                testimonials.push({
                    author: row.querySelector('.t-author').value,
                    location: row.querySelector('.t-location').value,
                    text: row.querySelector('.t-text').value,
                    stars: parseFloat(row.querySelector('.t-stars').value)
                });
            });
            data.testimonials = testimonials;
        } else if (currentSection === 'contact') {
            data.contact.phone = document.getElementById('contactPhone').value;
            data.contact.whatsapp = document.getElementById('contactWhatsApp').value;
            data.contact.facebook = document.getElementById('contactFB').value;
        }

        localStorage.setItem('jojomo_site_data', JSON.stringify(data));
    }

    const handlePublish = () => {
        saveCurrentSection();
        
        // Show success toast
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);

        // Download/Export Option
        const dataStr = "const siteData = " + JSON.stringify(data, null, 4) + ";\n\n// Export for use...\nif (typeof module !== 'undefined' && module.exports) {\n    module.exports = siteData;\n} else {\n    window.siteData = siteData;\n}";
        const blob = new Blob([dataStr], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.js';
        
        if(confirm('Changes saved to browser! Do you also want to download the updated data.js file to update your code permanently?')) {
            link.click();
        }
    };

    publishBtn && publishBtn.addEventListener('click', handlePublish);
    publishBtnHeader && publishBtnHeader.addEventListener('click', handlePublish);

    // Initialize
    switchSection('hero');
});
