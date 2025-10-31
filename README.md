# Setur - Glov İçerik Zenginleştirme ve Dönüşüm Optimizasyonu Teklifi

## 📁 Dosyalar

### Ana Teklif Dokümanları
1. **`setur-proposal.html`** - Yeni revize edilmiş Setur teklifi
   - Otel detay sayfaları için içerik zenginleştirme odaklı
   - 6 modül detayları
   - A/B testing metodolojisi
   - **Embedded dashboard** with Setur logo (Wikimedia Commons)
   - Hibrit ücretlendirme modeli (100K TL/ay + %5 delta rev - sadece section 6'da)
   - ❌ Başta fiyatlandırma bölümü kaldırıldı
   - ❌ Teknik ek dokümanlar kaldırıldı (daha temiz sunum için)

2. **`setur-ab-testing-dashboard.html`** - A/B Test sonuçları demo dashboard'u (standalone)
   - ⚠️ **Not:** Dashboard artık ana proposal içinde embed edilmiş durumda
   - Kontrol vs Test grubu karşılaştırması
   - Dönüşüm oranı metrikleri
   - Modül bazlı engagement performansı
   - Real-time data visualization
   - Segment analizi

### Referans Dosyalar (Orijinal Otokoc)
- `index.html` - Otokoc için hazırlanmış orijinal teklif (lead generation)
- `otokoc-dashboard (2).html` - Otokoc lead tracking dashboard

### Teknik Dosyalar (Setur Implementation)
- `glov-seturcomtr-config.js` - 6 modülün GTM injection JavaScript kodu
- `glov-seturcomtr-styles.css` - Modüller için CSS styling (Setur red branding)

### Görseller
- `otokoc.png`, `otokoc-2EL.png` - Otokoc UI örnekleri
- `Screenshot 2025-10-17 at *.png` - Raporlama ekran görüntüleri
- `Ducale Lara Fiyatları 2025 _ Setur.pdf` - Setur otel detay sayfası örneği

---

## 🎯 Ana Değişiklikler (Otokoc → Setur)

### 1. **İş Modeli Değişikliği**
- ❌ **Eski:** Lead generation (test sürüşü, servis randevusu)
- ✅ **Yeni:** Conversion rate optimization (rezervasyon dönüşümü)

### 2. **Scope Değişikliği**
- ❌ **Eski:** CRM entegrasyonu, lead toplama, sesli asistan
- ✅ **Yeni:** İçerik zenginleştirme, A/B testing, modül geliştirme

### 3. **Branding**
- ❌ **Eski:** Otokoc turuncu (#FF6B35, #FF8C42)
- ✅ **Yeni:** Setur kırmızı (#e2221b, #c91d16)

### 4. **Ücretlendirme**
- ❌ **Eski:** 195K TL/ay sabit, sınırsız lead
- ✅ **Yeni:** 100K TL/ay + %5 artımlı gelir (hibrit model)

### 5. **KPI'lar**
- ❌ **Eski:** Lead sayısı, lead kalitesi, yanıt süresi
- ✅ **Yeni:** Conversion rate, faturalanan satış, statistical significance

### 6. **Teknoloji Odağı**
- ❌ **Eski:** AI sesli/yazılı lead toplama
- ✅ **Yeni:** GTM injection, içerik enrichment, A/B test yönetimi

---

## 📦 6 İçerik Modülü

### 1. **Öne Çıkan Özellikler**
- Ana feature kartı + horizontal slider
- Like/dislike feedback
- Görsel odaklı feature cards

### 2. **Müşteri Puanları**
- Rating metrikleri (konum, odalar, değer, vb.)
- Best features grid
- Hotel ranking bilgisi

### 3. **Özet Özellikler**
- Accordion yapısında kategorize edilmiş özellikler
- Konaklama, oda, spa, çocuk kategorileri

### 4. **Detaylı Yorum Özeti**
- AI-generated summary
- Tag cloud (konum, atmosfer, temizlik)
- Sosyal kanıt (guest avatars)

### 5. **Benzer Otellerle Kıyaslama**
- İki görünüm: (A) Hotel cards, (B) Comparison table
- Toggle ile değişim
- Detaylı özellik karşılaştırması

### 6. **AI Asistanına Sor**
- Horizontal scrolling suggestion pills
- Input field ile soru sorma
- 12+ hazır soru önerisi

---

## 💰 Ücretlendirme

### Hibrit Model
- **Sabit Aylık Ücret:** 100.000 TL (+KDV)
- **Performans Primi:** Artımlı gelirin %5'i

### Örnek Hesaplama
```
Senaryo: 2M ziyaretçi/ay

Kontrol Grubu: 1M ziyaret × 2% CR = 20K rezervasyon × 2,500 TL = 50M TL
Test Grubu:    1M ziyaret × 2.3% CR = 23K rezervasyon × 2,500 TL = 57.5M TL

Artımlı Gelir: 7.5M TL
Performans Primi: 7.5M × 5% = 375K TL

Toplam Ödeme: 100K + 375K = 475K TL (+KDV)
```

---

## 📅 Timeline

| Tarih | Milestone | Açıklama |
|-------|-----------|----------|
| 1 Aralık | Kick-off | GTM erişimi, veri kurulumu |
| 2-15 Aralık | İçerik Pipeline | Veri toplama, scraping, API setup |
| 2-22 Aralık | Modül Geliştirme | 6 modülün front-end kodlaması |
| 16-22 Aralık | İçerik Zenginleştirme | İlk batch oteller için içerik |
| 23 Aralık | QA | Cross-browser, performance test |
| 26 Aralık | Soft Launch | %10 trafikte ilk test |
| 1 Ocak | Full A/B Test | %50/%50 trafik dağılımı |
| 15 Ocak | İlk Analiz | İstatistiksel analiz, raporlama |
| 23 Ocak+ | Sürekli Optimizasyon | İteratif iyileştirmeler |

---

## 📊 A/B Testing Metodolojisi

### İstatistiksel Yaklaşım
- **Test Tipi:** Two-sample Z-test for proportions
- **Anlamlılık:** α = 0.05 (95% güven)
- **Power:** 1-β = 0.80
- **Minimum Örneklem:** 20,000 ziyaretçi/grup
- **Test Süresi:** Minimum 2 hafta

### Başarı Metrikleri
**Birincil KPI:**
- Rezervasyon Dönüşüm Oranı (CR)

**İkincil KPI'lar:**
- Faturalanan satış geliri
- Ortalama sepet değeri
- Bounce rate
- Time on page
- Modül engagement oranları

### Segment Analizi
- Cihaz tipi (desktop, mobile, tablet)
- Otel kategorisi (luxury, mid-range, budget)
- Destinasyon
- Kullanıcı tipi (new vs. returning)
- Trafik kaynağı

---

## 🎨 Branding Guidelines

### Renkler
- **Primary:** `#e2221b` (Setur Red)
- **Secondary:** `#c91d16` (Dark Red)
- **Accent:** `#FFB0AA` (Light Red)
- **Background:** `#FFF5F4` (Very Light Red)

### Typography
- **Font Family:** 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Heading:** 600-700 weight
- **Body:** 400-500 weight

---

## 🔗 Demo Links

### Live Examples
- **Setur Proposal:** `setur-proposal.html`
- **A/B Dashboard:** `setur-ab-testing-dashboard.html`
- **Live Implementation:** [setur.com.tr/otel-detay/ducale-lara-hotel](https://www.setur.com.tr/otel-detay/ducale-lara-hotel)

---

## 📞 İletişim

**Proje Yöneticisi:** Buse Çelik  
**E-posta:** buse@glov.ai  
**Telefon:** 0541 940 89 59

---

## 📝 Notlar

### Teknik Gereksinimler (Setur'dan)
1. ✅ GTM erişimi (zaten mevcut)
2. 🔄 Otel verilerine erişim (data layer veya API)
3. 🔄 Analytics ve conversion tracking
4. 🔄 3. parti veri lisansı koordinasyonu

### Glov Sorumluluğu
1. ✅ 6 modülün tasarım ve geliştirmesi
2. ✅ GTM script injection
3. ✅ İçerik zenginleştirme (public web + TripAdvisor)
4. ✅ A/B test yönetimi
5. ✅ Dashboard ve raporlama
6. ✅ Teknik destek ve optimizasyon

---

## 🚀 Sonraki Adımlar

1. ✅ Teklif incelemesi ve Q&A
2. ⏳ Ticari koşulların müzakeresi
3. ⏳ Teknik ön değerlendirme
4. ⏳ Kontrat imzası
5. ⏳ 1 Aralık kick-off toplantısı

---

**Versiyon:** 1.0  
**Tarih:** 31 Ekim 2024  
**Durum:** İlk Teklif - İnceleme Aşamasında

