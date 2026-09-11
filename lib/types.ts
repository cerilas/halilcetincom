export type Clinic = {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  doctorName: string;
  doctorTitle: string;
};

export type SeoDefaults = {
  title: string;
  description: string;
  keywords: string[];
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  italic: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type Treatment = {
  id: string;
  slug: string;
  title: string;
  image?: string;
  imageAlt?: string;
  excerpt: string;
  description: string;
  contentHtml?: string;
  grafts: string;
  duration: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  body: string;
};

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  quote: string;
  rating: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type AboutContent = {
  headline: string;
  body: string;
  highlights: string[];
};

export type SiteContent = {
  clinic: Clinic;
  seo: SeoDefaults;
  hero: HeroContent;
  stats: Stat[];
  treatments: Treatment[];
  process: ProcessStep[];
  testimonials: Testimonial[];
  faqs: Faq[];
  about: {
    eyebrow: string;
    title: string;
    titleName: string;
    heroText: string;
    experienceYears: string;
    experienceText: string;
    section1: {
      title: string;
      p1: string;
      p2: string;
      p3: string;
    };
    section2: {
      title: string;
      p1: string;
      p2: string;
    };
    galleryTitle: string;
    qualificationsTitle: string;
    qualifications: string[];
    ctaBtn: string;
  };
  ui: {
    quickLinks: string;
    contactInfo: string;
    faqTitle: string;
    serviceAreas: string;
    allRightsReserved: string;
    whatsappCta: string;
    whatsappAria: string;
    appointment: string;
    whatsappAnalysis: string;
    cta: {
      eyebrow: string;
      title: string;
      fillForm: string;
      whatsapp: string;
    };
    home: {
      treatmentsEyebrow: string;
      treatmentsTitle: string;
      allTreatments: string;
      testimonialsEyebrow: string;
      faqTitle: string;
      marquee: string[];
      reelsTitle: string;
      reelsSubtitle: string;
      processEyebrow: string;
      processTitle: string;
      swipeHint: string;
      goldSection: {
        eyebrow: string;
        title: string;
        description: string;
        features: string[];
        cta: string;
      };
    };
    gallery: {
      eyebrow: string;
      title: string;
      before: string;
      after: string;
      monthsLater: string;
      loadMore: string;
    };
    footer: {
      developedBy: string;
      adminPanel: string;
    };
    treatment: {
      pageTitle: string;
      pageSubtitle: string;
      backToTreatments: string;
      analyzeBtn: string;
      imageAltSuffix: string;
    };
    knowledgeBase: {
      eyebrow: string;
      title: string;
      description: string;
      specialContentCount: string;
      libraryHas: string;
      found: string;
      noMatch: string;
      noArticles: string;
      readAll: string;
      prev: string;
      next: string;
      page: string;
      backToLibrary: string;
      categories: Record<string, string>;
    };
    bio: {
      founderTitle: string;
      expertiseAndTrust: string;
      experience: string;
      description: string;
      button: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      callNow: string;
      whatsappLine: string;
      form: {
        title: string;
        name: string;
        phone: string;
        email: string;
        message: string;
        send: string;
        success: string;
        error: string;
      };
    };
    booking: {
      title: string;
      description: string;
      tabs: {
        book: string;
        manage: string;
      };
      types: Record<string, { label: string; desc: string }>;
      form: {
        date: string;
        time: string;
        noSlots: string;
        details: string;
        name: string;
        phone: string;
        email: string;
        confirm: string;
        success: string;
      };
    };
  };
  headerLinks: { href: string; label: string }[];
  legalLinks: { name: string; href: string }[];
  footerFaqs: string[];
  seoLocations: string[];
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
};
