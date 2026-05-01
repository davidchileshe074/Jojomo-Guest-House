document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Hero Background Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // ── Canvas Particle System ──
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resizeCanvas() {
            const hero = canvas.parentElement;
            W = canvas.width  = hero.offsetWidth;
            H = canvas.height = hero.offsetHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

        const COLORS = [
            'rgba(212,175,55,',   // gold
            'rgba(255,215,0,',    // bright gold
            'rgba(255,255,255,',  // white
            'rgba(240,220,130,'   // pale gold
        ];

        class Particle {
            constructor() { this.reset(true); }
            reset(initial = false) {
                this.x    = Math.random() * W;
                this.y    = initial ? Math.random() * H : H + 10;
                this.r    = Math.random() * 2.5 + 0.5;
                this.vx   = (Math.random() - 0.5) * 0.4;
                this.vy   = -(Math.random() * 0.8 + 0.3);
                this.alpha = 0;
                this.maxAlpha = Math.random() * 0.5 + 0.2;
                this.fadeIn = true;
                this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
                this.twinkleSpeed = Math.random() * 0.02 + 0.005;
                this.twinkleDir = 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                // Twinkle
                if (this.fadeIn) {
                    this.alpha += this.twinkleSpeed;
                    if (this.alpha >= this.maxAlpha) this.fadeIn = false;
                } else {
                    this.alpha -= this.twinkleSpeed * 0.5;
                }
                // Reset when off screen or faded out
                if (this.y < -10 || this.alpha < 0) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha.toFixed(2) + ')';
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.floor((W * H) / 6000);
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function drawConnections() {
            const maxDist = 80;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < maxDist) {
                        const opacity = (1 - dist / maxDist) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212,175,55,${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, W, H);
            drawConnections();
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }


    // Navbar scroll effect & Scroll Indicator
    const navbar = document.getElementById('navbar');
    const scrollBar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (scrollBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollBar.style.width = scrolled + "%";
        }
    });

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            navbar.classList.add('scrolled'); // Force solid bg when open
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple Gallery Slider
    const track = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (track && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const scrollStep = 320; // image width + gap
        
        nextBtn.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            scrollAmount += scrollStep;
            if (scrollAmount > maxScroll) scrollAmount = maxScroll;
            track.style.transform = `translateX(-${scrollAmount}px)`;
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= scrollStep;
            if (scrollAmount < 0) scrollAmount = 0;
            track.style.transform = `translateX(-${scrollAmount}px)`;
        });

        // Basic Drag to scroll functionality
        let isDown = false;
        let startX;
        let currentTransform = 0;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            track.style.cursor = 'grabbing';
            startX = e.pageX - track.offsetLeft;
            const transformMatrix = window.getComputedStyle(track).getPropertyValue('transform');
            if (transformMatrix !== 'none') {
                currentTransform = Math.abs(parseInt(transformMatrix.split(',')[4].trim()));
            }
        });

        track.addEventListener('mouseleave', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mouseup', () => {
            isDown = false;
            track.style.cursor = 'grab';
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 2; // scroll-fast
            let newPos = currentTransform - walk;
            
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (newPos < 0) newPos = 0;
            if (newPos > maxScroll) newPos = maxScroll;
            
            scrollAmount = newPos;
            track.style.transform = `translateX(-${scrollAmount}px)`;
        });

        // Auto-slide gallery
        setInterval(() => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            if (scrollAmount >= maxScroll) {
                scrollAmount = 0;
                track.style.transform = `translateX(-${scrollAmount}px)`;
            } else {
                nextBtn.click();
            }
        }, 4000);
    }

    // Form submission handling (Send to WhatsApp)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('b_name').value;
            const phone = document.getElementById('b_phone').value;
            const location = document.getElementById('b_location').value;
            const message = document.getElementById('b_message').value;

            const btn = bookingForm.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Format WhatsApp Message
            let waMessage = `*New Booking Inquiry* 🏨%0A%0A`;
            waMessage += `*Name:* ${name}%0A`;
            waMessage += `*Phone:* ${phone}%0A`;
            waMessage += `*Preferred Branch:* ${location === 'lusaka' ? 'Lusaka – Chalala (House 6, Jumbe St)' : 'Luanshya – Gardenia & Mikomfwa'}%0A`;
            if (message) {
                waMessage += `*Requirements/Message:* ${message}%0A`;
            }
            
            const waPhone = '260966216259'; // WhatsApp Number
            const waLink = `https://wa.me/${waPhone}?text=${waMessage}`;

            setTimeout(() => {
                btn.innerHTML = '<i class="fab fa-whatsapp"></i> Redirecting to WhatsApp...';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = 'white';
                
                window.open(waLink, '_blank');
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    bookingForm.reset();
                }, 3000);
            }, 800);
        });
    }

    // Typing effect for Hero
    const typeWriterMulti = document.querySelector('.typing-multi');
    if(typeWriterMulti) {
        // Use data from siteData if available, fallback to defaults
        const words = (window.siteData && window.siteData.hero) ? window.siteData.hero.typingWords : ["Affordable Prices", "Comfortable Stays", "Secure Environments"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeMulti() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typeWriterMulti.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterMulti.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeMulti, typeSpeed);
        }
        setTimeout(typeMulti, 1000);
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Accordion Logic (using Event Delegation)
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.accordion-header');
        if (header) {
            const item = header.parentElement;
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        }
    });

    // ── Dark Mode Toggle ──
    const darkBtn = document.getElementById('darkModeToggle');
    const darkIcon = document.getElementById('darkModeIcon');
    if (darkBtn) {
        // Persist preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkIcon.classList.replace('fa-moon', 'fa-sun');
        }
        darkBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
            localStorage.setItem('darkMode', isDark);
        });
    }

    // ── Animated Stats Counter ──
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = +el.getAttribute('data-target');
                const duration = 1800;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target + (target >= 5 && target <= 5 ? '★' : '+');
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current) + '+';
                    }
                }, 16);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statsObserver.observe(el));

    // ── Testimonials Auto-Carousel ──
    const testimonialTrack = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    const totalTestimonials = dots.length;

    function goToTestimonial(index) {
        currentTestimonial = index;
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        if (dots[index]) dots[index].classList.add('active');
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToTestimonial(+dot.getAttribute('data-index'));
        });
    });

    // Auto-rotate every 5s
    setInterval(() => {
        const next = (currentTestimonial + 1) % totalTestimonials;
        goToTestimonial(next);
    }, 5000);

    // ── Back to Top Button ──
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Cursor Sparkle Trail ──
    const sparkleColors = ['#D4AF37','#FFD700','#FFF8DC','#ffffff','#f0c040'];
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.classList.add('sparkle');
        const size = Math.random() * 10 + 5;
        dot.style.cssText = `
            left: ${e.clientX - size/2}px;
            top: ${e.clientY - size/2}px;
            width: ${size}px;
            height: ${size}px;
            background: ${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]};
            opacity: ${Math.random() * 0.6 + 0.3};
        `;
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 700);
    });

    // ── Advanced Toast Notification ──
    const toast = document.getElementById('offerToast');
    const toastClose = document.getElementById('toastClose');
    if (toast) {
        // Show after a delay
        setTimeout(() => {
            toast.classList.add('show');
            
            // Auto-hide after 10 seconds (matches CSS animation)
            const autoHide = setTimeout(() => {
                toast.classList.remove('show');
            }, 10000);

            // Manual close
            toastClose && toastClose.addEventListener('click', () => {
                toast.classList.remove('show');
                clearTimeout(autoHide);
            });
        }, 4000);
    }

    // ── Gallery Lightbox ──
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    let lbImages = [], lbIndex = 0;

    // Lightbox Logic (using Event Delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-trigger')) {
            const img = e.target;
            const allTriggers = Array.from(document.querySelectorAll('.lightbox-trigger'));
            lbImages = allTriggers.map(t => t.src);
            lbIndex = allTriggers.indexOf(img);
            
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    lightboxClose && lightboxClose.addEventListener('click', closeLightbox);
    lightbox && lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    lightboxPrev && lightboxPrev.addEventListener('click', () => {
        lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
        lightboxImg.style.transform = 'translateX(-30px)';
        setTimeout(() => { lightboxImg.src = lbImages[lbIndex]; lightboxImg.style.transform = ''; }, 150);
    });
    lightboxNext && lightboxNext.addEventListener('click', () => {
        lbIndex = (lbIndex + 1) % lbImages.length;
        lightboxImg.style.transform = 'translateX(30px)';
        setTimeout(() => { lightboxImg.src = lbImages[lbIndex]; lightboxImg.style.transform = ''; }, 150);
    });

    // Keyboard nav for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxNext.click();
        if (e.key === 'ArrowLeft') lightboxPrev.click();
    });

    // ── Room Quick-View Modal ──
    const qvModal = document.getElementById('quickviewModal');
    const qvClose = document.getElementById('quickviewClose');
    const qvImg   = document.getElementById('qvImg');
    const qvTitle = document.getElementById('qvTitle');
    const qvPrice = document.getElementById('qvPrice');
    const qvDesc  = document.getElementById('qvDesc');

    // Room Quick-View Logic (using Event Delegation)
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-quickview');
        if (btn) {
            const card = btn.closest('.price-card');
            qvImg.src      = card.getAttribute('data-img');
            qvTitle.textContent = card.getAttribute('data-room');
            qvPrice.textContent = card.getAttribute('data-price') + ' / night';
            qvDesc.textContent  = card.getAttribute('data-desc');
            qvModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    function closeQV() {
        qvModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    qvClose && qvClose.addEventListener('click', closeQV);
    qvModal && qvModal.addEventListener('click', (e) => { if (e.target === qvModal) closeQV(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQV(); });

    // ── Mobile Bottom Nav Active State ──
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = ['home', 'pricing', 'services', 'contact'];
    
    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                mobileNavItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) navObserver.observe(section);
    });
});
