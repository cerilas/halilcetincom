const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'data/content.tr.json');
const enPath = path.join(__dirname, 'data/content.en.json');
const arPath = path.join(__dirname, 'data/content.ar.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Common UI translations
tr.ui = {
  "quickLinks": "Hızlı Bağlantılar",
  "contactInfo": "İletişim Bilgileri",
  "faqTitle": "Sık Sorulan Sorular",
  "serviceAreas": "Hizmet Bölgelerimiz",
  "allRightsReserved": "Tüm Hakları Saklıdır.",
  "whatsappCta": "Merhaba, saç ekimi hakkında bilgi almak istiyorum.",
  "whatsappAria": "WhatsApp ile iletişime geçin",
  "appointment": "Randevu Al"
};
en.ui = {
  "quickLinks": "Quick Links",
  "contactInfo": "Contact Information",
  "faqTitle": "Frequently Asked Questions",
  "serviceAreas": "Our Service Areas",
  "allRightsReserved": "All Rights Reserved.",
  "whatsappCta": "Hello, I would like to get information about hair transplantation.",
  "whatsappAria": "Contact via WhatsApp",
  "appointment": "Get Appointment"
};
ar.ui = {
  "quickLinks": "روابط سريعة",
  "contactInfo": "معلومات الاتصال",
  "faqTitle": "الأسئلة الشائعة",
  "serviceAreas": "مناطق خدمتنا",
  "allRightsReserved": "كل الحقوق محفوظة.",
  "whatsappCta": "مرحباً، أود الحصول على معلومات حول زراعة الشعر.",
  "whatsappAria": "تواصل عبر الواتساب",
  "appointment": "احجز موعد"
};

// Header Links
tr.headerLinks = [
  { "href": "/halil-cetin-kimdir", "label": "Hakkımızda" },
  { "href": "/tedaviler", "label": "Tedaviler" },
  { "href": "/surec", "label": "Süreç" },
  { "href": "/bilgi-bankasi", "label": "Bilgi Bankası" },
  { "href": "/iletisim", "label": "İletişim" }
];
en.headerLinks = [
  { "href": "/halil-cetin-kimdir", "label": "About Us" },
  { "href": "/tedaviler", "label": "Treatments" },
  { "href": "/surec", "label": "Process" },
  { "href": "/bilgi-bankasi", "label": "Knowledge Base" },
  { "href": "/iletisim", "label": "Contact" }
];
ar.headerLinks = [
  { "href": "/halil-cetin-kimdir", "label": "من نحن" },
  { "href": "/tedaviler", "label": "العلاجات" },
  { "href": "/surec", "label": "العملية" },
  { "href": "/bilgi-bankasi", "label": "قاعدة المعرفة" },
  { "href": "/iletisim", "label": "اتصل بنا" }
];

// Footer Legal Links
tr.legalLinks = [
  { "name": "Aydınlatma Metni & KVKK", "href": "/kvkk" },
  { "name": "Gizlilik Politikası", "href": "/gizlilik-politikasi" },
  { "name": "Kullanım Koşulları", "href": "/kullanim-kosullari" },
  { "name": "Çerez Politikası", "href": "/cerez-politikasi" },
  { "name": "Yasal Uyarı", "href": "/yasal-uyari" }
];
en.legalLinks = [
  { "name": "Privacy Policy & GDPR", "href": "/kvkk" },
  { "name": "Privacy Policy", "href": "/gizlilik-politikasi" },
  { "name": "Terms of Use", "href": "/kullanim-kosullari" },
  { "name": "Cookie Policy", "href": "/cerez-politikasi" },
  { "name": "Legal Notice", "href": "/yasal-uyari" }
];
ar.legalLinks = [
  { "name": "سياسة الخصوصية", "href": "/kvkk" },
  { "name": "سياسة الخصوصية", "href": "/gizlilik-politikasi" },
  { "name": "شروط الاستخدام", "href": "/kullanim-kosullari" },
  { "name": "سياسة ملفات تعريف الارتباط", "href": "/cerez-politikasi" },
  { "name": "إشعار قانوني", "href": "/yasal-uyari" }
];

// Footer FAQs
tr.footerFaqs = [
  "Saç ekimi fiyatları 2026 ne kadar?",
  "Gaziantep en iyi saç ekim merkezi nasıl seçilir?",
  "Saç ekimi işlemi acıtır mı, ağrılı mıdır?",
  "Saç ekimi sonrası iyileşme süreci kaç gün sürer?",
  "FUE mi yoksa DHI saç ekimi mi daha iyi?",
  "Saç ekimi operasyonu kaç saat sürer?",
  "Saç ekimi sonrası ilk yıkama ne zaman yapılır?",
  "Tıraşsız saç ekimi mümkün mü, kimlere yapılır?",
  "Saç ekimi için uygun yaş aralığı nedir?",
  "Ekilen saçlar ileride dökülür mü, kalıcı mıdır?",
  "Saç ekimi sonuçları ne zaman tam belli olur?",
  "Saç ekimi sonrası şapka takılır mı?",
  "Saç ekimi sonrası spor ve egzersiz ne zaman yapılır?",
  "Saç ekiminden sonra iz kalır mı?",
  "Kadınlarda saç ekimi nasıl yapılır?",
  "Saç ekiminde greft hesaplama nasıl yapılır?",
  "Sigara ve alkol tüketimi saç ekimini etkiler mi?",
  "Saç ekiminde kök hücre ve PRP tedavisi faydalı mı?",
  "Şeker ve tansiyon hastaları saç ekimi yaptırabilir mi?",
  "Saç ekimi yaz aylarında sıcakta yapılır mı?"
];
en.footerFaqs = [
  "How much does a hair transplant cost in 2026?",
  "How to choose the best hair transplant clinic in Gaziantep?",
  "Does the hair transplant procedure hurt?",
  "How long is the recovery process after hair transplant?",
  "Is FUE or DHI hair transplant better?",
  "How many hours does the operation take?",
  "When is the first wash done after hair transplant?",
  "Is unshaven hair transplant possible?",
  "What is the suitable age range for a hair transplant?",
  "Will the transplanted hair fall out in the future?",
  "When are the full results of hair transplant visible?",
  "Can I wear a hat after hair transplant?",
  "When can I exercise after hair transplant?",
  "Will there be scars after hair transplant?",
  "How is hair transplant done for women?",
  "How is graft calculation done?",
  "Do smoking and alcohol affect hair transplant?",
  "Are stem cell and PRP treatments useful?",
  "Can diabetes and blood pressure patients have hair transplants?",
  "Is hair transplant done in summer heat?"
];
ar.footerFaqs = [
  "كم تكلفة زراعة الشعر في 2026؟",
  "كيف تختار أفضل مركز لزراعة الشعر في غازي عنتاب؟",
  "هل عملية زراعة الشعر مؤلمة؟",
  "كم يوم تستغرق عملية الشفاء بعد زراعة الشعر؟",
  "هل تقنية FUE أم DHI أفضل؟",
  "كم ساعة تستغرق العملية؟",
  "متى يتم الغسيل الأول بعد زراعة الشعر؟",
  "هل زراعة الشعر بدون حلاقة ممكنة؟",
  "ما هو العمر المناسب لزراعة الشعر؟",
  "هل سيتساقط الشعر المزروع في المستقبل؟",
  "متى تظهر النتائج الكاملة لزراعة الشعر؟",
  "هل يمكنني ارتداء قبعة بعد زراعة الشعر؟",
  "متى يمكنني ممارسة الرياضة بعد العملية؟",
  "هل ستبقى ندوب بعد زراعة الشعر؟",
  "كيف تتم زراعة الشعر للنساء؟",
  "كيف يتم حساب عدد البصيلات؟",
  "هل يؤثر التدخين والكحول على زراعة الشعر؟",
  "هل الخلايا الجذعية وعلاج PRP مفيد؟",
  "هل يمكن لمرضى السكري والضغط إجراء زراعة الشعر؟",
  "هل يمكن إجراء زراعة الشعر في حرارة الصيف؟"
];

// Footer SEO Locations
tr.seoLocations = [
  "Gaziantep Saç Ekimi", "Gaziantep Şahinbey Saç Ekimi", "Gaziantep Şehitkamil Saç Ekimi", 
  "Nizip Saç Ekimi", "Oğuzeli Saç Ekimi", "İslahiye Saç Ekimi", "Nurdağı Saç Ekimi",
  "Diyarbakır Saç Ekimi", "Diyarbakır Kayapınar Saç Ekimi", "Diyarbakır Yenişehir Saç Ekimi", "Bağlar Saç Ekimi",
  "Şanlıurfa Saç Ekimi", "Urfa Karaköprü Saç Ekimi", "Siverek Saç Ekimi", "Birecik Saç Ekimi", "Viranşehir Saç Ekimi",
  "Mardin Saç Ekimi", "Kızıltepe Saç Ekimi", "Midyat Saç Ekimi", "Nusaybin Saç Ekimi",
  "Batman Saç Ekimi", "Kozluk Saç Ekimi",
  "Adıyaman Saç Ekimi", "Besni Saç Ekimi", "Kahta Saç Ekimi",
  "Osmaniye Saç Ekimi", "Kadirli Saç Ekimi", "Düziçi Saç Ekimi",
  "Kahramanmaraş Saç Ekimi", "Elbistan Saç Ekimi", "Onikişubat Saç Ekimi",
  "Elazığ Saç Ekimi", "Malatya Saç Ekimi", "Kilis Saç Ekimi", 
  "Şırnak Saç Ekimi", "Cizre Saç Ekimi", "Silopi Saç Ekimi",
  "Hatay Saç Ekimi", "İskenderun Saç Ekimi", "Antakya Saç Ekimi"
];
en.seoLocations = [
  "Gaziantep Hair Transplant", "Şahinbey Hair Transplant", "Şehitkamil Hair Transplant", 
  "Nizip Hair Transplant", "Oğuzeli Hair Transplant", "İslahiye Hair Transplant", "Nurdağı Hair Transplant",
  "Diyarbakır Hair Transplant", "Kayapınar Hair Transplant", "Yenişehir Hair Transplant", "Bağlar Hair Transplant",
  "Şanlıurfa Hair Transplant", "Karaköprü Hair Transplant", "Siverek Hair Transplant", "Birecik Hair Transplant", "Viranşehir Hair Transplant",
  "Mardin Hair Transplant", "Kızıltepe Hair Transplant", "Midyat Hair Transplant", "Nusaybin Hair Transplant",
  "Batman Hair Transplant", "Kozluk Hair Transplant",
  "Adıyaman Hair Transplant", "Besni Hair Transplant", "Kahta Hair Transplant",
  "Osmaniye Hair Transplant", "Kadirli Hair Transplant", "Düziçi Hair Transplant",
  "Kahramanmaraş Hair Transplant", "Elbistan Hair Transplant", "Onikişubat Hair Transplant",
  "Elazığ Hair Transplant", "Malatya Hair Transplant", "Kilis Hair Transplant", 
  "Şırnak Hair Transplant", "Cizre Hair Transplant", "Silopi Hair Transplant",
  "Hatay Hair Transplant", "İskenderun Hair Transplant", "Antakya Hair Transplant"
];
ar.seoLocations = [
  "زراعة الشعر غازي عنتاب", "زراعة الشعر شاهين بيه", "زراعة الشعر شهيت كامل", 
  "زراعة الشعر نزيب", "زراعة الشعر أوغوز إيلي", "زراعة الشعر إصلاحية", "زراعة الشعر نورداغي",
  "زراعة الشعر ديار بكر", "زراعة الشعر كايا بينار", "زراعة الشعر يني شهير", "زراعة الشعر باعلار",
  "زراعة الشعر شانلي أورفا", "زراعة الشعر كارا كوبرو", "زراعة الشعر سيفرك", "زراعة الشعر بيرجيك", "زراعة الشعر فيران شهير",
  "زراعة الشعر ماردين", "زراعة الشعر كيزيلتيبي", "زراعة الشعر مديات", "زراعة الشعر نصيبين",
  "زراعة الشعر باتمان", "زراعة الشعر كوزلوك",
  "زراعة الشعر أديامان", "زراعة الشعر بيسني", "زراعة الشعر كاهتا",
  "زراعة الشعر عثمانية", "زراعة الشعر قادرلي", "زراعة الشعر دوزيتشي",
  "زراعة الشعر كهرمان مرعش", "زراعة الشعر البستان", "زراعة الشعر أونيكيشوبات",
  "زراعة الشعر إلازيغ", "زراعة الشعر ملاطية", "زراعة الشعر كلس", 
  "زراعة الشعر شرناق", "زراعة الشعر جيزرة", "زراعة الشعر سيلوبي",
  "زراعة الشعر هاتاي", "زراعة الشعر إسكندرون", "زراعة الشعر أنطاكيا"
];

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2));

console.log('Successfully added translations to JSON files');
