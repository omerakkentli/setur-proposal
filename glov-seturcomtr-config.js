// Setur slider JavaScript fonksiyonları
function initializeSeturSlider(container) {
  // Slider class'ları ve fonksiyonları
  class FeatureSlider {
    constructor(container) {
      // Farklı selector'ları deneyelim
      this.container = container.querySelector('.slider-container') || 
                      container.querySelector('.features-slider') || 
                      container.querySelector('[class*="slider"]');
      
      if (!this.container) {
        console.log('Slider container bulunamadı');
        return;
      }
      
      this.track = this.container.querySelector('.slider-track') || 
                   this.container.querySelector('.track') ||
                   this.container.querySelector('[class*="track"]');
      
      this.cards = this.container.querySelectorAll('.feature-card') || 
                   this.container.querySelectorAll('.card') ||
                   this.container.querySelectorAll('[class*="card"]');
      
      // Butonları daha geniş arama ile bulalım
      this.prevBtn = container.querySelector('[id*="prevBtn"]') ||
                     container.querySelector('.prev') ||
                     container.querySelector('[class*="prev"]') ||
                     container.querySelector('button[class*="prev"]') ||
                     container.querySelector('[onclick*="prev"]');
      
      this.nextBtn = container.querySelector('[id*="nextBtn"]') ||
                     container.querySelector('.next') ||
                     container.querySelector('[class*="next"]') ||
                     container.querySelector('button[class*="next"]') ||
                     container.querySelector('[onclick*="next"]');
      
      // Eğer hala bulunamazsa, tüm butonları listele
      if (!this.prevBtn || !this.nextBtn) {
        const allButtons = container.querySelectorAll('button');
        console.log('Tüm butonlar:', Array.from(allButtons).map(btn => ({
          className: btn.className,
          textContent: btn.textContent?.trim(),
          onclick: btn.getAttribute('onclick')
        })));
      }
      
      this.currentIndex = 0;
      this.cardWidth = 280;
      
      console.log('Slider elements:', {
        container: this.container,
        track: this.track,
        cards: this.cards.length,
        prevBtn: this.prevBtn,
        nextBtn: this.nextBtn
      });
      
      this.init();
    }
    
    init() {
      if (!this.track || !this.prevBtn || !this.nextBtn) {
        console.log('Slider elementleri eksik:', {
          track: !!this.track,
          prevBtn: !!this.prevBtn,
          nextBtn: !!this.nextBtn
        });
        return;
      }
      
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
      this.updateButtons();
      console.log('Slider initialized successfully');
    }
    
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateSlider();
      }
    }
    
    next() {
      if (this.currentIndex < this.cards.length - 1) {
        this.currentIndex++;
        this.updateSlider();
      }
    }
    
    updateSlider() {
      const translateX = -(this.currentIndex * this.cardWidth);
      this.track.style.transform = 'translateX(' + translateX + 'px)';
      this.updateButtons();
    }
    
    updateButtons() {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
    }
  }
  
  class Accordion {
    constructor(container) {
      this.headers = container.querySelectorAll('.accordion-header');
      this.init();
    }
    
    init() {
      this.headers.forEach(header => {
        header.addEventListener('click', () => this.toggle(header));
      });
    }
    
    toggle(header) {
      const content = header.nextElementSibling;
      const isOpen = content.style.maxHeight;
      
      // Tümünü kapat
      this.headers.forEach(h => {
        const c = h.nextElementSibling;
        c.style.maxHeight = null;
        h.classList.remove('active');
      });
      
      // Seçileni aç/kapat
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        header.classList.add('active');
      }
    }
  }
  
  // Initialize all components
  setTimeout(() => {
    new FeatureSlider(container);
    new Accordion(container);
  }, 100);
}



const defaultConfig = {
  isPdpPage: async () => {
    const sessionData = window.dataLayer.find((item) => item.session);
    return sessionData?.session?.content_group === 'Detay Sayfası';
  },
  pdpGetPrice: async () => {
    if (window.glovGetFromDataLayer) {
      return '';
    } else {
      return null;
    }
  },
  pdpGetCategory: async () => {
    if (window.glovGetFromDataLayer) {
      return '';
    } else {
      return null;
    }
  },
  pdpGetCategoryTree: async () => {
    if (window.glovGetFromDataLayer) {
      return [];
    } else {
      return null;
    }
  },
  pdpGetSku: async () => {
    const skuPattern = /com\.tr\/([^?]+)/;
    const match = window.location.href.match(skuPattern);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('SKU not found in URL');
    }
  },
  handleQNAContainer(el) {
    try {
      const rooms_card = document.querySelector('[name="rooms"]');

      const newEl = document.createElement('div');
      newEl.className = 'setur-container';
      newEl.innerHTML = `
    <div class="container">
        <!-- Ana Özellik Kartı -->
        <div class="main-feature">
            <div class="main-header">
                <div class="header-item">
                    <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    </svg>
                    <span>Öne Çıkan</span>
                </div>
                <div class="header-item">
                    <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1"/>
                    </svg>
                    <span>İmkân ve özellikler</span>
                </div>
            </div>
            
            <h2 class="main-title">Çok Sayıda Yüzme Havuzu</h2>
            <p class="main-description">
                İki açık havuzda (biri çocuklar için), bir kapalı havuzda yüzün veya su parkının heyecanının tadını çıkarın.
            </p>
            
            <div class="main-image">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Otel havuz alanı">
                <div class="image-counter">5</div>
            </div>
        </div>

         <!-- Slider Bölümü -->
         <div class="slider-section">
             <div class="slider-container">
                 <div class="slider-controls left">
                     <button class="slider-btn" id="prevBtn">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                             <path d="M15 18l-6-6 6-6"/>
                         </svg>
                     </button>
                 </div>
                 
                 <div class="slider-controls right">
                     <button class="slider-btn" id="nextBtn">
                         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                             <path d="M9 18l6-6-6-6"/>
                         </svg>
                     </button>
                 </div>

                 <div class="slider-track" id="sliderTrack">
                    <div class="feature-card">
                        <div class="card-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Spa ve wellness alanı">
                        </div>
                        <div class="card-content-wrapper">
                            <h3 class="feature-title">Kapsamlı Spa Olanakları</h3>
                            <p class="feature-description">
                                Sauna, Türk hamamı ve masaj hizmetleri içeren spa'da gençleştirici tedavilerin keyfini çıkarın.
                            </p>
                            <div class="card-footer">
                                <button class="like-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                </button>
                                <button class="dislike-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="feature-card">
                        <div class="card-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bahçe ve doğa alanı">
                        </div>
                        <div class="card-content-wrapper">
                            <h3 class="feature-title">Yemyeşil ve Güzel Bahçeler</h3>
                            <p class="feature-description">
                                Otel, rahatlıcı bir ortam yaratan güzel doğaya, yüzme havuzlarına ve oturma alanlarına sahiptir.
                            </p>
                            <div class="card-footer">
                                <button class="like-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                </button>
                                <button class="dislike-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card">
                        <div class="card-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Aktivite ve eğlence">
                        </div>
                        <div class="card-content-wrapper">
                            <h3 class="feature-title">Aktivite ve Eğlence</h3>
                            <p class="feature-description">
                                Çeşitli spor aktiviteleri, animasyon gösterileri ve eğlence programları ile keyifli vakit geçirin.
                            </p>
                            <div class="card-footer">
                                <button class="like-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                </button>
                                <button class="dislike-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card">
                        <div class="card-image-wrapper">
                            <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Çocuk dostu alanlar">
                        </div>
                        <div class="card-content-wrapper">
                            <h3 class="feature-title">Çocuk Dostu Olanaklar</h3>
                            <p class="feature-description">
                                Çocuk havuzu, oyun alanları ve çocuk kulübü ile ailecek unutulmaz tatil deneyimi yaşayın.
                            </p>
                            <div class="card-footer">
                                <button class="like-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                                    </svg>
                                </button>
                                <button class="dislike-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                                    </svg>
                                </button>
                            </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

        <!-- Feedback Bölümü -->
        <div class="feedback-section">
            <div class="feedback-text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span style="font-size: 11px;">Bu özet yapay zeka tarafından oluşturulmuştur ve %100 doğru olmayabilir.</span>
            </div>
            
            <div class="feedback-actions">
                <span class="feedback-question">Faydalı buldunuz mu?</span>
                <div class="feedback-buttons">
                    <button class="feedback-btn" title="Beğendim">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                        </svg>
                    </button>
                    <button class="feedback-btn" title="Beğenmedim">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- En İyi Özellikler (Görünür Grid) -->
<div class="rating-features-container">
        <!-- Rating Section -->
        <div class="rating-section-wrapper">
            <div class="rating-header-main">
                <span class="rating-number">4.9</span>
                <span class="rating-text">Mükemmel</span>
            </div>
            
            <div class="rating-dots-wrapper">
                <span class="rating-dot"></span>
                <span class="rating-dot"></span>
                <span class="rating-dot"></span>
                <span class="rating-dot"></span>
                <span class="rating-dot"></span>
                <a href="#reviews" class="reviews-count">(2.320 değerlendirme)</a>
            </div>
            
            <div class="hotel-ranking">Lara'daki 1.179 otel arasında #1</div>
            
            <ul class="rating-metrics">
                <li class="rating-metric">
                    <span class="metric-label">Konum</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 100%;"></div>
                    </div>
                    <span class="metric-score">5.0</span>
                </li>
                <li class="rating-metric">
                    <span class="metric-label">Odalar</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 98%;"></div>
                    </div>
                    <span class="metric-score">4.9</span>
                </li>
                <li class="rating-metric">
                    <span class="metric-label">Değer</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 94%;"></div>
                    </div>
                    <span class="metric-score">4.7</span>
                </li>
                <li class="rating-metric">
                    <span class="metric-label">Temizlik</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 98%;"></div>
                    </div>
                    <span class="metric-score">4.9</span>
                </li>
                <li class="rating-metric">
                    <span class="metric-label">Hizmet</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 100%;"></div>
                    </div>
                    <span class="metric-score">5.0</span>
                </li>
                <li class="rating-metric">
                    <span class="metric-label">Uyku Kalitesi</span>
                    <div class="metric-bar-container">
                        <div class="metric-bar-fill" style="width: 98%;"></div>
                    </div>
                    <span class="metric-score">4.9</span>
                </li>
            </ul>
        </div>
        
        <!-- Best Features Section -->
        <div class="best-features-wrapper">
            <div class="best-features-title">En İyi Özellikler</div>
            <div class="features-grid">
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>
                    <span class="feature-name">Lobide Wi-Fi</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wifi-icon lucide-wifi"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>
                    <span class="feature-name">Odalarda Wi-Fi</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-waves-ladder-icon lucide-waves-ladder"><path d="M19 5a2 2 0 0 0-2 2v11"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M7 13h10"/><path d="M7 9h10"/><path d="M9 5a2 2 0 0 0-2 2v11"/></svg>
                    <span class="feature-name">Havuz</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bubbles-icon lucide-bubbles"><path d="M7.2 14.8a2 2 0 0 1 2 2"/><circle cx="18.5" cy="8.5" r="3.5"/><circle cx="7.5" cy="16.5" r="5.5"/><circle cx="7.5" cy="4.5" r="2.5"/></svg>
                    <span class="feature-name">Spa</span>
                </div>
                <div class="feature-item">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-parking-icon lucide-square-parking"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
                    <span class="feature-name">Otopark</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-air-vent-icon lucide-air-vent"><path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12"/><path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 8h12"/><path d="M6.6 15.572A2 2 0 1 0 10 17v-5"/></svg>
                    <span class="feature-name">Klima</span>
                </div>


                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-tv-minimal-icon lucide-tv-minimal"><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg>
                    <span class="feature-name">Düz Ekran TV</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-music-icon lucide-music"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                    <span class="feature-name">Canlı Eğlence</span>
                </div>
                <div class="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bath-icon lucide-bath"><path d="M10 4 8 6"/><path d="M17 19v2"/><path d="M2 12h20"/><path d="M7 19v2"/><path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/></svg>
                    <span class="feature-name">Jakuzi</span>
                </div>
            </div>
        </div>
        </div>

        <!-- Akordion (Sadece Tüm Özellikler) -->
        <div class="accordion">
            <div class="accordion-header" id="accordionHeader">
                <h3 class="accordion-title">Tüm özellikler</h3>
                <svg class="accordion-icon" id="accordionIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </div>
            
            <div class="accordion-content" id="accordionContent">
                <div class="accordion-body">
                    <!-- Tüm Özellikler Listesi -->
                    <div class="all-features-section">
                        <div class="features-columns">
                            <div class="feature-column">
                                <h5>Konaklama yerinin özellikleri</h5>
                                <ul>
                                    <li>24 Saat Oda Servisi</li>
                                    <li>24 saat açık resepsiyon</li>
                                    <li>24 saat güvenlik</li>
                                    <li>Asansör</li>
                                    <li>Atari/Bilgisayar oyunları</li>
                                    <li>Atıştırma barı</li>
                                    <li>Açık Yüzme Havuzu</li>
                                    <li>Bagaj Servisi</li>
                                    <li>Bagaj deposu</li>
                                    <li>Canlı eğlence</li>
                                    <li>El dezenfektanları sağlanır</li>
                                    <li>Etkinlikler</li>
                                    <li>Faks/Modem erişimi</li>
                                    <li>Fitness</li>
                                    <li>Gece Kulübü</li>
                                    <li>Giriş Salonu/lobi</li>
                                    <li>Güneş Şemsiyesi</li>
                                    <li>Günlük kat hizmetleri</li>
                                    <li>Havaalanı servisi</li>
                                    <li>Havuz</li>
                                    <li>Havuz Barı</li>
                                    <li>Havuzda Havlu</li>
                                </ul>
                            </div>
                            
                            <div class="feature-column">
                                <h5>Oda özellikleri</h5>
                                <ul>
                                    <li>Açılabilir pencere</li>
                                    <li>Balkon</li>
                                    <li>Duş</li>
                                    <li>Düz ekran TV</li>
                                    <li>Elektrik su ısıtıcısı</li>
                                    <li>Hipoalerjenik Yatak</li>
                                    <li>Kablo TV</li>
                                    <li>Klima</li>
                                    <li>Masa</li>
                                    <li>Merkezi ısıtma</li>
                                    <li>Mini Bar</li>
                                    <li>Oda Kasası</li>
                                    <li>Saç kurutma makinası</li>
                                    <li>Ses geçirmez</li>
                                    <li>Telefon</li>
                                    <li>Televizyon</li>
                                    <li>Uydu TV</li>
                                    <li>Ücretsiz WiFi (odada)</li>
                                    <li>Ütü Masası</li>
                                </ul>
                            </div>
                            
                            <div class="feature-column">
                                <h5>Sağlık / Spa</h5>
                                <ul>
                                    <li>Bornoz</li>
                                    <li>Güzellik Salonu</li>
                                    <li>Hamam</li>
                                    <li>Jakuzi</li>
                                    <li>Masaj</li>
                                    <li>Sauna</li>
                                    <li>Sıcak Taş Masajı</li>
                                    <li>Vücut Bakımları</li>
                                    <li>Vücut peellingi</li>
                                </ul>
                                
                                <h5 style="margin-top: 10px;">Çocuklar için</h5>
                                <ul>
                                    <li>Çocuk Bakımı</li>
                                    <li>Çocuk Karyolası</li>
                                    <li>Çocuk Parkı</li>
                                    <li>Çocuk kulübü</li>
                                    <li>Çocuk yemekleri</li>
                                    <li>Çocuklar için düzenlenmiş etkinlikler</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
      const setur_gap = document.createElement('div');
      setur_gap.className = 'setur-gap';

      initializeSeturSlider(newEl);

      rooms_card?.parentElement?.insertBefore(newEl, rooms_card);
      for (let i = 0; i < 3; i++) {
        const gapClone = setur_gap.cloneNode(false);
        gapClone.className = 'setur-gap';
        rooms_card?.parentElement?.insertBefore(gapClone, rooms_card);
      }

      const about_card = document.querySelector('[name="about"]');

      const newEl2 = document.createElement('div');
      newEl2.className = 'setur-container';
      newEl2.innerHTML = `
    <div class="hotels-container">
        <div class="alt-switch" style="display:flex;gap:8px;margin-bottom:12px;align-items:center;">
          <span style="font-weight:600">Görünüm:</span>
          <button class="alt-btn alt-btn-1 active" data-alt="1" style="padding:6px 10px;border:1px solid #ddd;border-radius:6px;background:#f6f6f6;cursor:pointer">Alternate1</button>
          <button class="alt-btn alt-btn-2" data-alt="2" style="padding:6px 10px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer">Alternate2</button>
        </div>
        <div class="alt alt1">
        <div class="hotels-grid main-hotels">
            <div class="selected-hotel-box">
             <div class="section-header-top">
                <h2 class="section-title">Seçilen konaklama yeri</h2>
            </div>
            <div class="hotel-card selected-hotel-card">
                <div class="card-image-container">
                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Ducale Lara" class="card-image">
                    <div class="card-actions">
                        <button class="action-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                <path d="M16 6l2 2 4-4"/>
                                <path d="M6 6l2 2 4-4"/>
                            </svg>
                        </button>
                        <button class="action-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="card-content">
                    <div class="hotel-rating">
                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <span class="hotel-type">Otel</span>
                    </div>
                    
                    <h3 class="hotel-name">Ducale Lara</h3>
                    
                    <div class="review-score">
                        <span class="score-badge">8.4</span>
                        <span class="score-label">Çok iyi</span>
                        <span class="score-text">(5910 misafir puanı)</span>
                    </div>
                    
                    <div class="hotel-location">
                        <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>Kundu, Şehir merkezi 1.0 km uzaklıkta</span>
                    </div>
                    
                    <div class="hotel-amenities">
                        <div class="amenity">
                            <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M5 13l4 4L19 7"/>
                            </svg>
                            <span>Ücretsiz kablosuz internet</span>
                        </div>
                        <div class="amenity">
                            <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <span>Havuz</span>
                        </div>
                        <div class="amenity">
                            <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <span>Spa</span>
                        </div>
                    </div>
                    
                    
                    <div class="lowest-price-section">
                        <div class="lowest-price-label">En düşük fiyatımız:</div>
                        
                        <div class="booking-features">
                            <div class="feature">
                                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Ücretsiz iptal</span>
                            </div>
                            <div class="feature">
                                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Her Şey Dahil</span>
                            </div>
                        </div>
                        
                        <div class="price">₺13.486</div>
                        
                        <button class="book-btn">Göster ></button>
                    </div>
                </div>
            </div>
            </div>
            
            <div class="similar-hotels-box">
                <div class="section-header">
                    <h2 class="section-title">Benzer konaklama yerleri</h2>
                </div>
                
                <div class="similar-hotels-grid">
                    <!-- Limak Lara Hotel Card -->
                    <div class="hotel-card">
                    <div class="card-image-container">
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Limak Lara" class="card-image">
                        <div class="card-actions">
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <path d="M16 6l2 2 4-4"/>
                                    <path d="M6 6l2 2 4-4"/>
                                </svg>
                            </button>
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-content">
                        <div class="hotel-rating">
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        
                        <h3 class="hotel-name">Limak Lara De Luxe Hotel</h3>
                        
                        <div class="review-score">
                            <span class="score-badge">9.2</span>
                            <span class="score-label">Mükemmel</span>
                            <span class="score-text">(32925 misafir puanı)</span>
                        </div>
                        
                        <div class="hotel-location">
                            <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>Lara, Ducale Lara 2.4 km uzaklıkta</span>
                        </div>
                        
                        <div class="hotel-amenities">
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Ücretsiz kablosuz internet</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Havuz</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Spa</span>
                            </div>
                        </div>
                        
                        <div class="lowest-price-section">
                            <div class="lowest-price-label">En düşük fiyatımız:</div>
                            
                            <div class="booking-features">
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Ücretsiz iptal</span>
                                </div>
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Her Şey Dahil</span>
                                </div>
                            </div>
                            
                            <div class="price">₺12.827</div>
                            
                            <button class="book-btn">Göster ></button>
                        </div>
                    </div>
                </div>

                <!-- IC Hotels Green Palace Card -->
                <div class="hotel-card">
                    <div class="card-image-container">
<img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="IC Hotels" class="card-image">                        <div class="card-actions">
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <path d="M16 6l2 2 4-4"/>
                                    <path d="M6 6l2 2 4-4"/>
                                </svg>
                            </button>
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-content">
                        <div class="hotel-rating">
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        
                        <h3 class="hotel-name">IC Hotels Green Palace</h3>
                        
                        <div class="review-score">
                            <span class="score-badge">9.1</span>
                            <span class="score-label">Mükemmel</span>
                            <span class="score-text">(13397 misafir puanı)</span>
                        </div>
                        
                        <div class="hotel-location">
                            <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>Kundu, Ducale Lara 0.3 km uzaklıkta</span>
                        </div>
                        
                        <div class="hotel-amenities">
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Ücretsiz kablosuz internet</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Havuz</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Spa</span>
                            </div>
                        </div>
                        
                        <div class="lowest-price-section">
                            <div class="lowest-price-label">En düşük fiyatımız:</div>
                            
                            <div class="booking-features">
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Ücretsiz iptal</span>
                                </div>
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Her Şey Dahil</span>
                                </div>
                            </div>
                            
                            <div class="price">₺14.820</div>
                            
                            <button class="book-btn">Göster ></button>
                        </div>
                    </div>
                </div>

                <!-- Swandor Hotels Card -->
                <div class="hotel-card">
                    <div class="card-image-container">
                        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Swandor Hotels" class="card-image">
                        <div class="card-actions">
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                    <path d="M16 6l2 2 4-4"/>
                                    <path d="M6 6l2 2 4-4"/>
                                </svg>
                            </button>
                            <button class="action-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-content">
                        <div class="hotel-rating">
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <svg class="star" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        
                        <h3 class="hotel-name">Swandor Hotels</h3>
                        
                        <div class="review-score">
                            <span class="score-badge">8.8</span>
                            <span class="score-label">Mükemmel</span>
                            <span class="score-text">(17101 misafir puanı)</span>
                        </div>
                        
                        <div class="hotel-location">
                            <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            <span>Antalya, Ducale Lara 0.7 km uzaklıkta</span>
                        </div>
                        
                        <div class="hotel-amenities">
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7"/>
                                </svg>
                                <span>Ücretsiz kablosuz internet</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Havuz</span>
                            </div>
                            <div class="amenity">
                                <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                                <span>Spa</span>
                            </div>
                        </div>
                        
                        <div class="lowest-price-section">
                            <div class="lowest-price-label">En düşük fiyatımız:</div>

                            
                            <div class="booking-features">
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Ücretsiz iptal</span>
                                </div>
                                <div class="feature">
                                    <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M5 13l4 4L19 7"/>
                                    </svg>
                                    <span>Tam pansiyon</span>
                                </div>
                            </div>
                            
                            <div class="price">₺11.880</div>
                            
                            <button class="book-btn">Göster ></button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
        <div class="alt alt2" style="display:none">
          <div class="comparison-card">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px 6px 10px">
              <div style="font-weight:700;font-size:16px">Konaklama Yerleri Karşılaştırması</div>
              <span class="comparison-badge">AI Özet</span>
            </div>
            <table class="comparison-table">
              <thead>
                <tr>
                  <th style="text-align:left; width: 180px;"></th>
                  <th style="text-align:left; vertical-align: top;">
                    <div class="hotel-col-header">
                      <img class="hotel-col-img" src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Ducale Lara">
                      <div class="hotel-col-text">
                        <div class="hotel-col-name">Ducale Lara</div>
                        <div class="hotel-col-scoreline">
                          <span class="score-badge">8.4</span>
                          <span class="score-label">Çok iyi</span>
                          <span class="score-text">(5910 puanlama)</span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th style="text-align:left; vertical-align: top;">
                    <div class="hotel-col-header">
                      <img class="hotel-col-img" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Limak Lara De Luxe">
                      <div class="hotel-col-text">
                        <div class="hotel-col-name">Limak Lara De Luxe</div>
                        <div class="hotel-col-scoreline">
                          <span class="score-badge">9.2</span>
                          <span class="score-label">Mükemmel</span>
                          <span class="score-text">(32925 puanlama)</span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th style="text-align:left; vertical-align: top;">
                    <div class="hotel-col-header">
                      <img class="hotel-col-img" src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="IC Hotels Green Palace">
                      <div class="hotel-col-text">
                        <div class="hotel-col-name">IC Hotels Green Palace</div>
                        <div class="hotel-col-scoreline">
                          <span class="score-badge">9.1</span>
                          <span class="score-label">Mükemmel</span>
                          <span class="score-text">(13397 puanlama)</span>
                        </div>
                      </div>
                    </div>
                  </th>
                  <th style="text-align:left; vertical-align: top;">
                    <div class="hotel-col-header">
                      <img class="hotel-col-img" src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="Swandor Hotels">
                      <div class="hotel-col-text">
                        <div class="hotel-col-name">Swandor Hotels</div>
                        <div class="hotel-col-scoreline">
                          <span class="score-badge">8.8</span>
                          <span class="score-label">Mükemmel</span>
                          <span class="score-text">(17101 puanlama)</span>
                        </div>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="first-col">Konum</td>
                  <td>Havaalanına 10-15 dk</td>
                  <td>Plaja yakın, merkezi</td>
                  <td>Havaalanına 20 dk</td>
                  <td>Plaj ve doğal çevre</td>
                </tr>
                <tr>
                  <td class="first-col">Aile Dostu</td>
                  <td>Evet, çocuk alanı ve su parkı</td>
                  <td>Evet, geniş aktiviteler</td>
                  <td>Evet, aile konsepti</td>
                  <td>Evet, aile dostu otel</td>
                </tr>
                <tr>
                  <td class="first-col">Hizmet Kalitesi</td>
                  <td>Yüksek, cana yakın personel</td>
                  <td>Çok iyi, arkadaş canlısı</td>
                  <td>Yüksek, ilgili personel</td>
                  <td>Genel olarak iyi</td>
                </tr>
                <tr>
                  <td class="first-col">Oda Durumu</td>
                  <td>Yenilenmiş, modern</td>
                  <td>Geniş, temiz, bazı eski</td>
                  <td>Biraz eski, yenilenme gerek</td>
                  <td>Bilinmiyor</td>
                </tr>
                <tr>
                  <td class="first-col">Yiyecek-İçecek</td>
                  <td>Çeşitli ve kaliteli</td>
                  <td>Bol seçenekli</td>
                  <td>Çeşitli, kaliteli</td>
                  <td>Genel aile oteli kalitesi</td>
                </tr>
                <tr>
                  <td class="first-col">Eğlence & Aktiviteler</td>
                  <td>Su parkı, animasyon</td>
                  <td>Su parkı, çocuk kulübü</td>
                  <td>Gün boyu aktiviteler</td>
                  <td>Su sporları, havuz aktiviteleri</td>
                </tr>
                <tr>
                  <td class="first-col">Eksiler</td>
                  <td>Bazı alanlar kapalı</td>
                  <td>Gürültülü olabiliyor, pahalı</td>
                  <td>Ses yalıtımı eksik</td>
                  <td>Belirsiz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
      `;
      about_card?.parentElement?.insertBefore(newEl2, about_card);
      for (let i = 0; i < 3; i++) {
        const gapClone = setur_gap.cloneNode(false);
        gapClone.className = 'setur-gap';
        about_card?.parentElement?.insertBefore(gapClone, about_card);
      }

      // Alternate switch davranışı
      try {
        const altBtn1 = newEl2.querySelector('.alt-btn-1');
        const altBtn2 = newEl2.querySelector('.alt-btn-2');
        const alt1 = newEl2.querySelector('.alt1');
        const alt2 = newEl2.querySelector('.alt2');
        const setActive = (which) => {
          if (!alt1 || !alt2) return;
          if (which === 1) {
            alt1.style.display = '';
            alt2.style.display = 'none';
            altBtn1?.classList.add('active');
            altBtn2?.classList.remove('active');
          } else {
            alt1.style.display = 'none';
            alt2.style.display = '';
            altBtn2?.classList.add('active');
            altBtn1?.classList.remove('active');
          }
        };
        altBtn1?.addEventListener('click', () => setActive(1));
        altBtn2?.addEventListener('click', () => setActive(2));
      } catch (e) { console.warn('alt switch init error', e); }

      const list_card_content = document.querySelectorAll('.hfJbLY');
      const list_card_title = document.querySelectorAll('.ljVybC');

      const aiTextObj = [
        {
          name: 'Ducale Lara',
          text: 'Çok sayıda havuz ve spa imkanları ile ideal aile tatili.',
        },
        {
          name: 'Aska Lara Resort & Spa',
          text: 'Geniş aquapark ile çocuklar ve yetişkinler için eğlence.',
        },
        {
          name: 'Club Hotel Sera',
          text: 'Sahile yakın konum ve samimi atmosfer.',
        },
        {
          name: 'Melas Lara Hotel',
          text: 'Modern tasarım ve kaliteli hizmet anlayışı.',
        },
        {
          name: 'Royal Holiday Palace Hotel',
          text: 'Ultra her şey dahil ve zengin animasyon programları.',
        },
        {
          name: 'Royal Wings Hotel',
          text: 'Elegant mimari ve premium hizmet kalitesi.',
        },
        {
          name: 'Royal Seginus Hotel',
          text: 'Geniş plaj ve çeşitli su sporları imkanları.',
        },
        {
          name: 'Tourist Hotel Antalya',
          text: 'Şehir merkezine yakın konum ve kültür turları.',
        },
        {
          name: 'Limak Lara De Luxe Hotel & Resort',
          text: 'Kaliteli hizmet ve çeşitli gastronomi seçenekleri.',
        },
        {
          name: 'Concorde De Luxe Resort',
          text: 'Geniş aile odaları ve çocuk dostu imkanlar.',
        },
        {
          name: 'Birpa Kundu Otel',
          text: 'Samimi atmosfer ve kişiselleştirilmiş hizmet.',
        },
        {
          name: 'Swandor Hotels & Resort Topkapı Palace',
          text: 'Osmanlı temalı mimari ve tarihi atmosfer.',
        },
      ];

       for (let i = 0; i < list_card_content.length; i++) {
         const card = list_card_content[i];
         const titleElement = list_card_title[i];
         
         const hotelName = titleElement?.textContent?.trim();
         
         const matchedObj = aiTextObj.find(obj => hotelName?.includes(obj.name));
         const aiTextContent = matchedObj
           ? matchedObj.text
           : 'Konforlu konaklama ve kaliteli hizmet imkanları sunuyor.';
         
         const aiText = document.createElement('div');
         aiText.classList.add('ai-text');
         aiText.innerHTML = `
         <div class="ai-text-content">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles-icon lucide-sparkles"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/></svg>
           <div class="ai-text-content-text">${aiTextContent}</div>
         </div>
         `;

         card?.parentElement?.insertBefore(aiText, card);
         
       }



       const newEl3 = document.createElement('div');
        newEl3.innerHTML = `<div class="container" id="reviews">
    <!-- Reviews Summary Section -->
    <div class="reviews-summary">
        <div class="summary-header">
            <div class="header-left">
                <h2 class="summary-title">Değerlendirme özeti</h2>
                <p class="summary-subtitle">Bu özet, son değerlendirmelere dayanarak AI tarafından oluşturuldu.</p>
            </div>
            <div class="header-right">
                <div class="ai-badge">
                    <div class="avatar-group">
                        <img src="https://i.pravatar.cc/32?img=1" alt="Avatar 1" class="avatar">
                        <img src="https://i.pravatar.cc/32?img=2" alt="Avatar 2" class="avatar">
                        <img src="https://i.pravatar.cc/32?img=3" alt="Avatar 3" class="avatar">
                        <img src="https://i.pravatar.cc/32?img=4" alt="Avatar 4" class="avatar">
                    </div>
                    <span class="ai-text">AI tarafından destekleniyor</span>
                </div>
            </div>
        </div>

        <div class="summary-content">
            <div class="summary-text">
                 <p>Antalya'nın en prestijli sahil şeridinde, Kundu'nun eşsiz doğal güzellikleri arasında yükselen Ducale Hotels Lara, 2025 yaz sezonuyla birlikte "The Spirit of Luxury" konseptiyle misafirlerini ağırlamaya başlıyor. Venedik'in ikonik Dükler Sarayı'ndan esinlenerek adlandırılan bu muhteşem tesis, İtalyan zarafetini Akdeniz'in büyüleyici atmosferiyle ustaca harmanlayarak, konuklarına sarayları andıran bir konaklama deneyimi vaat ediyor.</p>
                
                <p>Denize sıfır konumda yer alan otel, özel tasarım odaları ve süitleriyle dikkat çekiyor. Her bir yaşam alanı, Venedik mimarisinin zarif dokunuşlarını modern lüksle buluşturarak, misafirlere aristokrat bir yaşam standardı sunuyor. Dünya mutfaklarından seçkin tatları sunan gurme restoranları, özenle seçilmiş şaraplarıyla dikkat çeken şarap mahzeni ve deniz manzaralı teraslarıyla gastronomi tutkunlarının yeni gözdesi olmaya aday.</p>
                
               </div>

            <div class="tags-grid">
                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                        <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Konum</span>
                        <span class="tag-value">Merkezi</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Atmosfer</span>
                        <span class="tag-value">Davetkar</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Odalar</span>
                        <span class="tag-value">Konforlu</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Değer</span>
                        <span class="tag-value">Mükemmel</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                        <path d="M5 3v4"/>
                        <path d="M19 17v4"/>
                        <path d="M3 5h4"/>
                        <path d="M17 19h4"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Temizlik</span>
                        <span class="tag-value">Kusursuz</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5Z"/>
                        <path d="M8 14a5 5 0 1 1 8 0"/>
                        <path d="M17 18.5a9 9 0 1 0-10 0"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Gürültü seviyesi</span>
                        <span class="tag-value">Sessiz</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Servis</span>
                        <span class="tag-value">Güler yüzlü</span>
                    </div>
                </div>

                <div class="tag-item">
                    <svg class="tag-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20v-6M6 20V10M18 20V4"/>
                    </svg>
                    <div class="tag-content">
                        <span class="tag-label">Olanaklar</span>
                        <span class="tag-value">İyi donanımlı</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="feedback-section">
            <span class="feedback-text">Bu faydalı oldu mu?</span>
            <div class="feedback-buttons">
                <button class="feedback-btn like-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                    </svg>
                </button>
                <button class="feedback-btn dislike-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>`;

       newEl2?.parentElement?.insertBefore(newEl3, newEl2);
       for (let i = 0; i < 3; i++) {
         const gapClone = setur_gap.cloneNode(false);
         gapClone.className = 'setur-gap';
         newEl2?.parentElement?.insertBefore(gapClone, newEl2);
       }

       const newEl4 = document.createElement('div');
       newEl4.innerHTML = `<div class="ai-assistant-container">
    <div class="assistant-header">
        <div class="header-content">
            <svg class="sparkle-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                <path d="M5 3v4"/>
                <path d="M19 17v4"/>
                <path d="M3 5h4"/>
                <path d="M17 19h4"/>
            </svg>
            <span class="assistant-title">AI Asistanımıza Sorun</span>
            <span class="beta-badge">BETA</span>
        </div>
    </div>

    <div class="suggestions-wrapper">
        <button class="scroll-btn scroll-left" aria-label="Önceki öneriler">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        </button>
        
        <div class="suggestions-container">
            <div class="suggestions-track">
                <button class="suggestion-pill">Oda tipleri neler, deniz manzarası garanti mi?</button>
                <button class="suggestion-pill">Havaalanından otele transfer var mı, ücretli mi?</button>
                <button class="suggestion-pill">Havuzlar ısıtmalı mı, kışın açık havuz var mı?</button>
                <button class="suggestion-pill">Otopark var mı, ücretsiz mi ve valeye gerek var mı?</button>
                <button class="suggestion-pill">Vegan/glütensiz menü var mı, önceden bildirmeli miyim?</button>
                <button class="suggestion-pill">Evcil hayvan kabul ediliyor mu?</button>
                <button class="suggestion-pill">Balayı konsepti/oda süslemesi var mı, şartları nelerdir?</button>
                <button class="suggestion-pill">Spa, hamam ve masaj için rezervasyon gerekli mi?</button>
                <button class="suggestion-pill">Engelli misafirler için oda ve rampalar mevcut mu?</button>
                <button class="suggestion-pill">Günlük animasyon ve akşam show programı saat kaçta?</button>
                <button class="suggestion-pill">Oda kapasitesi ve ekstra yatak ücreti nedir?</button>
                <button class="suggestion-pill">Toplantı/çalışma alanı var mı?</button>
            </div>
        </div>

        <button class="scroll-btn scroll-right" aria-label="Sonraki öneriler">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        </button>
    </div>

    <div class="input-container">
        <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="rgba(226, 34, 27, 1)" stroke-width="2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            <input type="text" class="question-input" placeholder="Sorunuzu girin">
            <button class="send-btn" aria-label="Gönder">
                <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 1)" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <polyline points="19 12 12 19 5 12"/>
                </svg>
            </button>
        </div>
    </div>
        </div>`;

        const location_card = document.querySelector('[name="location"]');
        location_card?.parentElement?.insertBefore(newEl4, location_card);
        for (let i = 0; i < 3; i++) {
        const gapClone = setur_gap.cloneNode(false);
        gapClone.className = 'setur-gap';
        location_card?.parentElement?.insertBefore(gapClone, location_card);
        }

         // Sadece AI asistan öneri butonları için yatay kaydırma (iki satır grid track)
         try {
           const asstContainer = newEl4.querySelector('.suggestions-container');
           const asstTrack = newEl4.querySelector('.suggestions-track');
           const asstLeft = newEl4.querySelector('.scroll-left');
           const asstRight = newEl4.querySelector('.scroll-right');
           if (asstContainer && asstTrack) {
             // Emniyet: yatay kaydırma aç
             asstContainer.style.overflowX = asstContainer.style.overflowX || 'auto';
             // track CSS grid iki satır; genişliği içerik kadar tutulsun
             asstTrack.style.width = 'max-content';
             // Fade/clip etkilerini önlemek için mask vb. kaldır
             asstContainer.style.webkitMaskImage = 'none';
             asstContainer.style.maskImage = 'none';
             asstContainer.style.background = asstContainer.style.background || 'transparent';
           }
           const step = () => asstContainer?.clientWidth ? Math.max(240, Math.floor(asstContainer.clientWidth * 0.8)) : 300;
           const update = () => {
             if (!asstContainer || !asstTrack) return;
             const max = asstTrack.scrollWidth - asstContainer.clientWidth - 2;
             if (asstLeft) asstLeft.disabled = asstContainer.scrollLeft <= 2;
             if (asstRight) asstRight.disabled = asstContainer.scrollLeft >= max;
           };
           asstLeft?.addEventListener('click', () => {
             asstContainer?.scrollBy({ left: -step(), behavior: 'smooth' });
             setTimeout(update, 250);
           });
           asstRight?.addEventListener('click', () => {
             asstContainer?.scrollBy({ left: step(), behavior: 'smooth' });
             setTimeout(update, 250);
           });
           asstContainer?.addEventListener('scroll', update);
           window.addEventListener('resize', update);
           setTimeout(update, 120);
         } catch (_) {}

       // Hash ile doğrudan reviews bölümüne kaydırma (dinamik eklenme nedeniyle)
       const scrollToReviews = () => {
         const el = document.getElementById('reviews');
         if (!el) return;
         const headerOffset = 80; // sabit header olasılığına karşı küçük offset
         const rect = el.getBoundingClientRect();
         const targetY = rect.top + window.pageYOffset - headerOffset;
         try {
           window.scrollTo({ top: targetY, behavior: 'smooth' });
         } catch (_) {
           window.scrollTo(0, targetY);
         }
       };
       if (window.location.hash === '#reviews') {
         setTimeout(scrollToReviews, 100);
       }
       window.addEventListener('hashchange', () => {
         if (window.location.hash === '#reviews') {
           setTimeout(scrollToReviews, 0);
         }
       });

       // Anchor tıklamasını yakala (hash aynıysa hashchange tetiklenmez)
       try {
         const reviewAnchors = document.querySelectorAll('a[href="#reviews"]');
         reviewAnchors.forEach((a) => {
           a.addEventListener('click', (e) => {
             e.preventDefault();
             if (window.location.hash !== '#reviews') {
               history.pushState(null, '', '#reviews');
             }
             scrollToReviews();
           });
         });
       } catch (_) {}

      

    } catch (error) {   
        console.error(error);
    }
  },
};

window.glovConfig = defaultConfig;
if (typeof window.onGlovConfigLoaded === 'function') {
  window.onGlovConfigLoaded(defaultConfig);
}
