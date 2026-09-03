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
  about: AboutContent;
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
