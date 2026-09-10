const fs = require('fs');
const path = require('path');

const langs = ['tr', 'en', 'ar'];

const translations = {
  tr: {
    contact: {
      eyebrow: "İletişim",
      title: "Analiz için yazın.",
      callNow: "Hemen Arayın",
      whatsappLine: "WhatsApp Hattından Ulaşın",
      form: {
        title: "İletişim Formu",
        name: "Ad soyad",
        phone: "Telefon",
        email: "E-posta",
        message: "Mesaj",
        send: "Gönder",
        success: "Talebiniz alındı. En kısa sürede dönüş yapacağız.",
        error: "Gönderilemedi. Tekrar deneyin."
      }
    },
    booking: {
      title: "Randevu Alın",
      description: "Aşağıdaki takvimden size en uygun gün ve saati seçerek ücretsiz saç analizi ve planlama görüşmesi için yerinizi ayırtın.",
      tabs: { book: "Randevu Al", manage: "Randevularım" },
      types: {
        consultation: { label: "Ön Görüşme", desc: "Süreci planlamak ve tanışmak için" },
        analysis: { label: "Saç Analizi", desc: "Kök yapınızın detaylı incelenmesi" },
        care: { label: "Bakım (PRP vb.)", desc: "PRP, Mezoterapi ve güçlendirme" },
        control: { label: "Kontrol", desc: "Ekim sonrası rutin takip ve inceleme" }
      },
      form: {
        date: "Tarih Seçin",
        time: "Saat Seçin",
        noSlots: "Bu tarihte uygun saat bulunmuyor.",
        details: "Kişisel Bilgiler",
        name: "Ad Soyad",
        phone: "Telefon (05xx...)",
        email: "E-posta (Opsiyonel)",
        confirm: "Randevuyu Onayla",
        success: "Randevunuz Başarıyla Oluşturuldu",
        successDesc: "En kısa sürede sizinle iletişime geçeceğiz.",
        manageDesc: "Mevcut randevularınızı görüntülemek ve iptal etmek için telefon numaranızı girin.",
        search: "Sorgula",
        cancel: "İptal Et",
        cancelConfirm: "İptal etmek istediğinize emin misiniz?",
        cancelYes: "Evet, İptal Et",
        cancelNo: "Vazgeç"
      }
    }
  },
  en: {
    contact: {
      eyebrow: "Contact",
      title: "Contact us for analysis.",
      callNow: "Call Now",
      whatsappLine: "Contact via WhatsApp",
      form: {
        title: "Contact Form",
        name: "Full Name",
        phone: "Phone",
        email: "Email",
        message: "Message",
        send: "Send",
        success: "Your request has been received. We will get back to you shortly.",
        error: "Could not be sent. Please try again."
      }
    },
    booking: {
      title: "Book an Appointment",
      description: "Select the most suitable date and time from the calendar below to reserve your spot for a free hair analysis and planning consultation.",
      tabs: { book: "Book Appointment", manage: "My Appointments" },
      types: {
        consultation: { label: "Consultation", desc: "To plan the process and meet" },
        analysis: { label: "Hair Analysis", desc: "Detailed examination of your root structure" },
        care: { label: "Care (PRP, etc.)", desc: "PRP, Mesotherapy, and strengthening" },
        control: { label: "Check-up", desc: "Routine follow-up and examination after transplant" }
      },
      form: {
        date: "Select Date",
        time: "Select Time",
        noSlots: "No available slots on this date.",
        details: "Personal Information",
        name: "Full Name",
        phone: "Phone Number",
        email: "Email (Optional)",
        confirm: "Confirm Appointment",
        success: "Appointment Successfully Created",
        successDesc: "We will contact you as soon as possible.",
        manageDesc: "Enter your phone number to view and cancel your existing appointments.",
        search: "Search",
        cancel: "Cancel",
        cancelConfirm: "Are you sure you want to cancel?",
        cancelYes: "Yes, Cancel",
        cancelNo: "Give up"
      }
    }
  },
  ar: {
    contact: {
      eyebrow: "اتصال",
      title: "تواصل معنا للتحليل.",
      callNow: "اتصل الآن",
      whatsappLine: "تواصل عبر واتساب",
      form: {
        title: "نموذج الاتصال",
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        message: "رسالة",
        send: "إرسال",
        success: "تم استلام طلبك. سوف نرد عليك في أقرب وقت ممكن.",
        error: "لا يمكن الإرسال. يرجى المحاولة مرة أخرى."
      }
    },
    booking: {
      title: "احجز موعداً",
      description: "اختر التاريخ والوقت الأنسب من التقويم أدناه لحجز مكانك للحصول على تحليل مجاني للشعر واستشارة التخطيط.",
      tabs: { book: "احجز موعداً", manage: "مواعيدي" },
      types: {
        consultation: { label: "استشارة", desc: "لتخطيط العملية واللقاء" },
        analysis: { label: "تحليل الشعر", desc: "فحص دقيق لبنية الجذور الخاصة بك" },
        care: { label: "العناية (PRP، الخ)", desc: "بلازما الدم الغنية بالصفائح الدموية والميزوثيرابي والتقوية" },
        control: { label: "فحص", desc: "المتابعة الروتينية والفحص بعد الزراعة" }
      },
      form: {
        date: "اختر التاريخ",
        time: "اختر الوقت",
        noSlots: "لا توجد أوقات متاحة في هذا التاريخ.",
        details: "المعلومات الشخصية",
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني (اختياري)",
        confirm: "تأكيد الموعد",
        success: "تم إنشاء الموعد بنجاح",
        successDesc: "سنتصل بك في أقرب وقت ممكن.",
        manageDesc: "أدخل رقم هاتفك لعرض وإلغاء مواعيدك الحالية.",
        search: "بحث",
        cancel: "إلغاء",
        cancelConfirm: "هل أنت متأكد أنك تريد الإلغاء؟",
        cancelYes: "نعم، إلغاء",
        cancelNo: "تراجع"
      }
    }
  }
};

langs.forEach(lang => {
  const filePath = path.join(__dirname, `data/content.${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.ui) data.ui = {};
  data.ui.contact = translations[lang].contact;
  data.ui.booking = translations[lang].booking;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

console.log('UI contact & booking updates complete.');
