const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    about: {
      eyebrow: "Kurucu & Başuzman",
      title: "Saç Ekim Uzmanı",
      titleName: "Halil Çetin",
      heroText: "Saç ekimi sadece bir cerrahi işlem değil, tıbbın ve estetik vizyonun kusursuz birleşimidir. Doğal, kalıcı ve kimsede anlaşılmayan sonuçlar için tecrübeli ellere güvenin.",
      experienceYears: "24+",
      experienceText: "Yıllık Tecrübe",
      section1: {
        title: "Estetik ve Tıbbın Kusursuz Birleşimi",
        p1: "Gaziantep merkezli kliniğinde Türkiye'nin dört bir yanından ve Avrupa'dan gelen hastalara hizmet veren <strong>Saç Ekim Uzmanı Halil Çetin</strong>, saç restorasyonu alanında bölgesinin en çok tercih edilen ve güvenilen isimlerinin başında gelmektedir.",
        p2: "24 yılı aşkın mesleki hayatında 10.000'in üzerinde hastanın saç, sakal ve kaş ekimi operasyonunu bizzat yönetmiş, binlerce insanın hayatına ve özgüvenine pozitif dokunuşlar yapmıştır. Sıradan ve \"seri üretim\" mantığıyla çalışan saç ekim merkezlerinin aksine Halil Çetin, <strong>\"butik ve kişiye özel\"</strong> tedavi protokolünü benimsemektedir.",
        p3: "Saç ekimi operasyonlarında başarı oranını maksimize eden Safir FUE (Sapphire FUE) ve DHI (Doğrudan Saç Ekimi) teknolojilerini en güncel cihazlarla uygulamaktadır."
      },
      section2: {
        title: "Operasyon Masasındaki Hassasiyet",
        p1: "Başarılı bir saç ekiminin sırrı sadece köklerin toplanıp ekilmesi değildir. <strong>Köklerin hangi açıyla, hangi derinlikte ve nasıl bir ön saç çizgisi tasarımıyla ekileceği</strong> asıl farkı yaratan unsurdur. Halil Çetin, operasyon masasında bir sanatçı titizliğiyle çalışır.",
        p2: "Altın oran kurallarına uygun olarak planlanan saç çizgisi tasarımı, hastanın yaşına, yüz anatomisine ve beklentilerine göre lazer cetveller kullanılarak çizilir. İşlem esnasında donör bölgeden alınan her bir greft (saç kökü), canlılığını yitirmeden, en uygun solüsyonlarda bekletilerek yeni yuvalarına transfer edilir."
      },
      galleryTitle: "Modern Klinik & Estetik Bakış Açısı",
      qualificationsTitle: "Neden Halil Çetin?",
      qualifications: [
        "24+ Yıllık Kesintisiz Saç Ekimi Tecrübesi",
        "10.000'in Üzerinde Başarılı Saç ve Sakal Ekimi Operasyonu",
        "DHI (Choi Pen) ve Safir FUE Yöntemlerinde İleri Düzey Uzmanlık",
        "Uluslararası Saç Restorasyon Cerrahisi Derneği (ISHRS) Standartlarında Tedavi",
        "Tam Donanımlı VIP Hastane Ortamında Steril Operasyon",
        "Kişiye Özel Doğal Saç Çizgisi (Altın Oran) Tasarımı"
      ],
      ctaBtn: "Ücretsiz Analiz Alın"
    }
  },
  en: {
    about: {
      eyebrow: "Founder & Lead Specialist",
      title: "Hair Transplant Specialist",
      titleName: "Halil Çetin",
      heroText: "Hair transplantation is not just a surgical procedure, it is the perfect combination of medicine and aesthetic vision. Trust experienced hands for natural, permanent and undetectable results.",
      experienceYears: "24+",
      experienceText: "Years of Experience",
      section1: {
        title: "The Perfect Combination of Aesthetics and Medicine",
        p1: "Serving patients from all over Turkey and Europe at his Gaziantep-based clinic, <strong>Hair Transplant Specialist Halil Çetin</strong> is one of the most preferred and trusted names in the region in the field of hair restoration.",
        p2: "In his professional life of over 24 years, he has personally managed the hair, beard and eyebrow transplant operations of over 10,000 patients, and made positive touches to the lives and self-confidence of thousands of people. Unlike ordinary hair transplant centers working with a \"mass production\" logic, Halil Çetin adopts a <strong>\"boutique and personalized\"</strong> treatment protocol.",
        p3: "He applies Sapphire FUE and DHI (Direct Hair Implantation) technologies, which maximize the success rate in hair transplant operations, with the latest devices."
      },
      section2: {
        title: "Precision on the Operation Table",
        p1: "The secret to a successful hair transplant is not just collecting and transplanting the roots. <strong>The angle, depth, and front hairline design at which the roots are planted</strong> is the real differentiating factor. Halil Çetin works with the meticulousness of an artist on the operating table.",
        p2: "The hairline design, planned in accordance with the golden ratio rules, is drawn using laser rulers according to the patient's age, facial anatomy and expectations. During the procedure, each graft (hair follicle) taken from the donor area is transferred to its new home by keeping it in the most suitable solutions without losing its vitality."
      },
      galleryTitle: "Modern Clinic & Aesthetic Perspective",
      qualificationsTitle: "Why Halil Çetin?",
      qualifications: [
        "24+ Years of Continuous Hair Transplant Experience",
        "Over 10,000 Successful Hair and Beard Transplant Operations",
        "Advanced Expertise in DHI (Choi Pen) and Sapphire FUE Methods",
        "Treatment in accordance with International Society of Hair Restoration Surgery (ISHRS) Standards",
        "Sterile Operation in a Fully Equipped VIP Hospital Environment",
        "Personalized Natural Hairline (Golden Ratio) Design"
      ],
      ctaBtn: "Get a Free Analysis"
    }
  },
  ar: {
    about: {
      eyebrow: "المؤسس وكبير المتخصصين",
      title: "أخصائي زراعة الشعر",
      titleName: "خليل جتين",
      heroText: "زراعة الشعر ليست مجرد إجراء جراحي، بل هي المزيج المثالي بين الطب والرؤية الجمالية. ثق بالأيدي الخبيرة للحصول على نتائج طبيعية ودائمة لا يمكن اكتشافها.",
      experienceYears: "+24",
      experienceText: "سنوات من الخبرة",
      section1: {
        title: "المزيج المثالي بين الجمال والطب",
        p1: "يخدم <strong>أخصائي زراعة الشعر خليل جتين</strong> المرضى من جميع أنحاء تركيا وأوروبا في عيادته في غازي عنتاب، وهو أحد أكثر الأسماء المفضلة والموثوقة في المنطقة في مجال استعادة الشعر.",
        p2: "خلال حياته المهنية التي تزيد عن 24 عاماً، أدار شخصياً عمليات زراعة الشعر واللحية والحاجب لأكثر من 10000 مريض، وأحدث لمسات إيجابية في حياة وثقة آلاف الأشخاص. على عكس مراكز زراعة الشعر العادية التي تعمل بمنطق \"الإنتاج الضخم\"، يتبنى خليل جتين بروتوكول علاج <strong>\"حصري ومخصص شخصياً\"</strong>.",
        p3: "يطبق تقنيات السفير FUE و DHI (زراعة الشعر المباشرة)، التي تزيد من معدل النجاح في عمليات زراعة الشعر، بأحدث الأجهزة."
      },
      section2: {
        title: "الدقة على طاولة العمليات",
        p1: "سر نجاح زراعة الشعر ليس مجرد جمع الجذور وزراعتها. <strong>الزاوية، العمق، وتصميم خط الشعر الأمامي الذي تزرع فيه الجذور</strong> هو العامل الفارق الحقيقي. يعمل خليل جتين بدقة فنان على طاولة العمليات.",
        p2: "يتم رسم تصميم خط الشعر، المخطط وفقاً لقواعد النسبة الذهبية، باستخدام مساطر ليزر وفقاً لعمر المريض وتشريح وجهه وتوقعاته. أثناء الإجراء، يتم نقل كل بصيلة (جذر شعرة) مأخوذة من المنطقة المانحة إلى موطنها الجديد عن طريق الاحتفاظ بها في أنسب المحاليل دون أن تفقد حيويتها."
      },
      galleryTitle: "عيادة حديثة ومنظور جمالي",
      qualificationsTitle: "لماذا خليل جتين؟",
      qualifications: [
        "أكثر من 24 عاماً من الخبرة المستمرة في زراعة الشعر",
        "أكثر من 10,000 عملية زراعة شعر ولحية ناجحة",
        "خبرة متقدمة في تقنيات DHI (قلم تشوي) و Sapphire FUE",
        "العلاج وفقاً لمعايير الجمعية الدولية لجراحة استعادة الشعر (ISHRS)",
        "عملية معقمة في بيئة مستشفى VIP مجهزة بالكامل",
        "تصميم خط شعر طبيعي مخصص (النسبة الذهبية)"
      ],
      ctaBtn: "احصل على تحليل مجاني"
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  data.about = translations[lang].about;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('About updates complete.');
