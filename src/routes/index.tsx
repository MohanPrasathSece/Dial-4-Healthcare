import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Building2,
  Check,
  ChevronRight,
  Droplets,
  Ear,
  Eye,
  HeartPulse,
  Mail,
  Menu,
  Microscope,
  Phone,
  Ribbon,
  Search,
  ShieldCheck,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/d4h-hero.png";
import doctorAnanya from "@/assets/doctor-ananya.png";
import doctorArjun from "@/assets/doctor-arjun.png";
import doctorMeera from "@/assets/doctor-meera.png";
import hospitalPhoto from "@/assets/hospital.png";
import diagnosticsPhoto from "@/assets/diagnostics.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dial 4 Healthcare | Trusted doctors, hospitals & diagnostics" },
      {
        name: "description",
        content:
          "Discover trusted doctors, hospitals and diagnostic centres with Dial 4 Healthcare. Find care and get guidance, all in one place.",
      },
      {
        property: "og:title",
        content: "Dial 4 Healthcare | Trusted doctors, hospitals & diagnostics",
      },
      {
        property: "og:description",
        content:
          "Discover trusted doctors, hospitals and diagnostic centres with Dial 4 Healthcare.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

type ProviderType = "Doctors" | "Hospitals" | "Diagnostics";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Doctors", href: "#doctors" },
  { label: "Hospitals", href: "#providers" },
  { label: "Diagnostics", href: "#providers" },
  { label: "Blogs", href: "mailto:d4h.official@gmail.com?subject=Healthcare%20blogs" },
  { label: "Contact Us", href: "#contact" },
];

const specialties = [
  {
    title: "Infertility Specialist",
    description: "Supportive guidance for fertility and reproductive health.",
    icon: Baby,
  },
  {
    title: "Consultant ENT",
    description: "Care for ear, nose and throat concerns.",
    icon: Ear,
  },
  {
    title: "Ophthalmology",
    description: "Find guidance for clearer, healthier vision.",
    icon: Eye,
  },
  {
    title: "Diabetology",
    description: "Ongoing support for diabetes care.",
    icon: Activity,
  },
  {
    title: "Orthopaedic",
    description: "Care for bones, joints and movement.",
    icon: Bone,
  },
  {
    title: "Spine Specialist",
    description: "Specialist support for spine health.",
    icon: Stethoscope,
  },
  {
    title: "Hematology",
    description: "Care for blood-related health concerns.",
    icon: Droplets,
  },
  {
    title: "Oncology",
    description: "Guidance and support through cancer care.",
    icon: Ribbon,
  },
];

const providerCategories = [
  {
    title: "Doctors",
    description: "Find experienced medical specialists.",
    action: "Explore Doctors",
    href: "#doctors",
    image: doctorAnanya,
    imageAlt: "Doctor in a bright clinic",
    icon: Stethoscope,
  },
  {
    title: "Hospitals",
    description: "Discover trusted healthcare facilities.",
    action: "Explore Hospitals",
    href: "#featured",
    image: hospitalPhoto,
    imageAlt: "Modern multi-speciality hospital entrance",
    icon: Building2,
  },
  {
    title: "Diagnostics",
    description: "Explore diagnostic centres and testing services.",
    action: "Explore Diagnostics",
    href: "#featured",
    image: diagnosticsPhoto,
    imageAlt: "Technician working in a diagnostic laboratory",
    icon: Microscope,
  },
];

const providerProfiles: Array<{
  type: ProviderType;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  label: string;
}> = [
  {
    type: "Doctors",
    title: "Infertility Specialist",
    description: "Explore supportive fertility and reproductive health care.",
    image: doctorAnanya,
    imageAlt: "Illustrative portrait of a woman doctor",
    label: "Speciality",
  },
  {
    type: "Doctors",
    title: "Consultant ENT",
    description: "Find a specialist for ear, nose and throat concerns.",
    image: doctorArjun,
    imageAlt: "Illustrative portrait of a male doctor",
    label: "Speciality",
  },
  {
    type: "Doctors",
    title: "Ophthalmology",
    description: "Connect with care focused on eye health and vision.",
    image: doctorMeera,
    imageAlt: "Illustrative portrait of a woman eye specialist",
    label: "Speciality",
  },
  {
    type: "Hospitals",
    title: "Hospital network",
    description: "Explore 3 hospitals in the Dial 4 Healthcare network.",
    image: hospitalPhoto,
    imageAlt: "Contemporary hospital with a glass entrance",
    label: "3 hospitals",
  },
  {
    type: "Diagnostics",
    title: "Diagnostic centre",
    description: "Discover diagnostic testing and care services.",
    image: diagnosticsPhoto,
    imageAlt: "Medical professional preparing a diagnostic sample",
    label: "1 centre",
  },
];

const providerTabs = ["All", "Doctors", "Hospitals", "Diagnostics"] as const;
type ProviderTab = (typeof providerTabs)[number];

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ProviderTab>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const visibleProfiles = useMemo(() => {
    const query = submittedSearch.toLowerCase();
    return providerProfiles.filter((profile) => {
      const matchesTab = activeTab === "All" || profile.type === activeTab;
      const searchableText = `${profile.type} ${profile.title} ${profile.description}`.toLowerCase();
      return matchesTab && (!query || searchableText.includes(query));
    });
  }, [activeTab, submittedSearch]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedSearch(searchTerm.trim());
    setActiveTab("All");
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = encodeURIComponent(`Healthcare enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:d4h.official@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <div className="d4h-page">
      <header className="site-header">
        <div className="site-header-inner page-container">
          <a className="brand-lockup" href="#home" aria-label="Dial 4 Healthcare home">
            <span className="brand-symbol">D4H</span>
            <span className="brand-name">Dial 4 Healthcare</span>
          </a>

          <nav className="desktop-navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} className="navigation-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild className="header-booking">
            <a href="#contact">
              Book Appointment <ArrowRight aria-hidden="true" />
            </a>
          </Button>

          <Button
            className="mobile-menu-toggle"
            variant="ghost"
            size="icon"
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-navigation page-container" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                className="mobile-navigation-link"
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
                <ChevronRight aria-hidden="true" />
              </a>
            ))}
            <Button asChild className="mobile-booking">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                Book Appointment <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </nav>
        )}
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid page-container">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Your healthcare partner</p>
              <h1>Trustworthy Healthcare Network</h1>
              <p className="hero-description">
                Discover trusted doctors, hospitals and diagnostic centres. Find the right
                healthcare services and get the guidance you need, all in one place.
              </p>
              <form className="hero-search" onSubmit={handleSearch} role="search">
                <Search className="search-icon" aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Search doctors, hospitals, diagnostic centres, specialities or symptoms"
                  placeholder="Search Doctors, Hospitals, Diagnostic Centres, Specialities or Symptoms..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <Button type="submit" className="search-submit">
                  Search
                </Button>
              </form>
              <div className="hero-actions">
                <Button asChild className="hero-primary-button">
                  <a href="#providers">
                    Explore Healthcare <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="hero-secondary-button">
                  <a href="#contact">Book Appointment</a>
                </Button>
              </div>
              <div className="hero-assurance">
                <span className="assurance-icon"><ShieldCheck aria-hidden="true" /></span>
                <span>Thoughtful guidance. Trusted care.</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={heroDoctor} alt="Doctor ready to guide patients toward the right care" />
              </div>
              <div className="hero-floating-note">
                <span className="floating-note-icon"><Check aria-hidden="true" /></span>
                <span><strong>Care, connected</strong><small>Doctors · hospitals · diagnostics</small></span>
              </div>
              <div className="hero-image-caption">
                <HeartPulse aria-hidden="true" /> A more connected care journey
              </div>
            </div>
          </div>
          <div className="hero-bottom-rule" aria-hidden="true" />
        </section>

        <section className="specialties-section section-pad" id="specialities">
          <div className="page-container">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">Find care by speciality</p>
                <h2>Explore Our Specialities</h2>
              </div>
              <p className="section-intro">
                Start with the care you need, then find the right people to guide you.
              </p>
            </div>
            <div className="specialty-grid">
              {specialties.map((specialty, index) => {
                const Icon = specialty.icon;
                return (
                  <a
                    key={specialty.title}
                    className="specialty-tile"
                    href="#doctors"
                    style={{ animationDelay: `${index * 45}ms` }}
                  >
                    <span className="specialty-icon"><Icon aria-hidden="true" /></span>
                    <span className="specialty-title">{specialty.title}</span>
                    <span className="specialty-description">{specialty.description}</span>
                    <span className="specialty-arrow"><ArrowRight aria-hidden="true" /></span>
                  </a>
                );
              })}
            </div>
            <div className="section-action-row">
              <Button asChild variant="outline" className="more-specialties-button">
                <a href="#doctors">More Specialities <ArrowRight aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
        </section>

        <section className="providers-section section-pad" id="providers">
          <div className="page-container">
            <div className="providers-heading">
              <p className="section-kicker">Your care, all in one place</p>
              <h2>Find the Right Healthcare Provider</h2>
              <p className="section-intro">
                Explore trusted professionals and services for every step of your care journey.
              </p>
            </div>
            <div className="provider-category-grid">
              {providerCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <article className="provider-category" key={category.title}>
                    <a className="category-image-link" href={category.href} aria-label={category.action}>
                      <img src={category.image} alt={category.imageAlt} />
                      <span className="category-icon"><Icon aria-hidden="true" /></span>
                    </a>
                    <div className="category-copy">
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                      <Button asChild variant="link" className="category-action">
                        <a href={category.href}>{category.action} <ArrowRight aria-hidden="true" /></a>
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="featured-providers" id="featured">
              <div className="featured-heading-row" id="doctors">
                <div>
                  <p className="section-kicker">A trusted place to begin</p>
                  <h3>Featured Providers</h3>
                </div>
                <div className="provider-tabs" role="tablist" aria-label="Filter featured providers">
                  {providerTabs.map((tab) => (
                    <Button
                      key={tab}
                      type="button"
                      variant={activeTab === tab ? "default" : "ghost"}
                      size="sm"
                      className="provider-tab"
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
              </div>
              {submittedSearch && (
                <div className="search-results-note" role="status">
                  {visibleProfiles.length > 0
                    ? `Showing ${visibleProfiles.length} result${visibleProfiles.length === 1 ? "" : "s"} for “${submittedSearch}”`
                    : `No featured providers matched “${submittedSearch}”. Try a speciality or provider type.`}
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => {
                      setSearchTerm("");
                      setSubmittedSearch("");
                    }}
                  >
                    Clear search
                  </Button>
                </div>
              )}
              <div className="featured-grid">
                {visibleProfiles.map((profile) => (
                  <article className="featured-card" key={`${profile.type}-${profile.title}`}>
                    <div className="featured-image-wrap">
                      <img src={profile.image} alt={profile.imageAlt} loading="lazy" />
                      <span className="profile-type">{profile.label}</span>
                    </div>
                    <div className="featured-card-copy">
                      <span className="provider-type-label">{profile.type}</span>
                      <h4>{profile.title}</h4>
                      <p>{profile.description}</p>
                      <a className="featured-link" href="#contact">
                        Learn more <ArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <p className="illustrative-note">
                Doctor photos are illustrative. Contact us to confirm current provider listings.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="page-container about-grid">
            <div className="about-copy">
              <p className="section-kicker">Care begins with trust</p>
              <h2>Connecting People to Better Healthcare</h2>
              <p>
                Dial 4 Healthcare follows a three-pronged business approach. With almost 20 years
                of marketing experience in the healthcare industry, we have developed a
                healthcare-focused marketing division and built a trusted network of healthcare
                service providers who trust us with their business.
              </p>
              <div className="about-signature">
                <span className="signature-icon"><ShieldCheck aria-hidden="true" /></span>
                <span>Helping you find the right next step in care.</span>
              </div>
              <Button asChild className="guidance-button">
                <a href="#contact">Need Help? Let Us Guide You <ArrowRight aria-hidden="true" /></a>
              </Button>
            </div>
            <div className="trust-panel">
              <div className="trust-panel-topline">
                <span className="trust-icon"><Users aria-hidden="true" /></span>
                <span>Our healthcare network</span>
              </div>
              <div className="trust-stats-grid">
                <div className="trust-stat"><strong>3</strong><span>Hospitals</span></div>
                <div className="trust-stat"><strong>3</strong><span>Doctors</span></div>
                <div className="trust-stat"><strong>1</strong><span>Diagnostics</span></div>
                <div className="trust-stat"><strong>7</strong><span>Happy Patients</span></div>
              </div>
              <div className="trust-panel-footer">
                <span><Check aria-hidden="true" /> Guidance when you need it</span>
                <span><Check aria-hidden="true" /> A network built on trust</span>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="page-container contact-layout">
            <div className="contact-copy">
              <p className="section-kicker">We're here to help</p>
              <h2>Let’s find your next step in care.</h2>
              <p>
                Tell us what you need. Our team can help guide you to the right healthcare service.
              </p>
              <div className="contact-detail-list">
                <a href="mailto:d4h.official@gmail.com" className="contact-detail">
                  <span className="contact-detail-icon"><Mail aria-hidden="true" /></span>
                  <span><small>Email us</small><strong>d4h.official@gmail.com</strong></span>
                </a>
                <a href="tel:+917400465666" className="contact-detail">
                  <span className="contact-detail-icon"><Phone aria-hidden="true" /></span>
                  <span><small>Call us</small><strong>+91 74004 65666</strong></span>
                </a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-heading">
                <span className="form-heading-icon"><HeartPulse aria-hidden="true" /></span>
                <div><h3>Send us a message</h3><p>We’ll help you find the right care.</p></div>
              </div>
              <label className="form-field">
                <span>Your name</span>
                <input name="name" type="text" placeholder="Enter your name" required />
              </label>
              <label className="form-field">
                <span>Email address</span>
                <input name="email" type="email" placeholder="you@example.com" required />
              </label>
              <label className="form-field">
                <span>How can we help?</span>
                <textarea name="message" placeholder="Tell us a little about what you need" rows={4} required />
              </label>
              <Button type="submit" className="contact-submit">
                Send Message <ArrowRight aria-hidden="true" />
              </Button>
              <p className="form-footnote">Your message opens in your email app.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container footer-main">
          <div className="footer-brand-block">
            <a className="brand-lockup footer-brand" href="#home" aria-label="Dial 4 Healthcare home">
              <span className="brand-symbol">D4H</span>
              <span className="brand-name">Dial 4 Healthcare</span>
            </a>
            <p>Connecting you with trusted doctors, hospitals and diagnostic centres.</p>
            <div className="footer-social-proof"><ShieldCheck aria-hidden="true" /> Your healthcare partner</div>
          </div>
          <div className="footer-link-column">
            <h3>Quick links</h3>
            <a href="#about">About Us</a>
            <a href="#doctors">Doctors</a>
            <a href="#providers">Hospitals</a>
            <a href="#providers">Diagnostics</a>
          </div>
          <div className="footer-link-column">
            <h3>Specialities</h3>
            <a href="#specialities">Infertility care</a>
            <a href="#specialities">ENT</a>
            <a href="#specialities">Eye care</a>
            <a href="#specialities">Orthopaedics</a>
          </div>
          <div className="footer-link-column footer-contact-column">
            <h3>Contact</h3>
            <a href="mailto:d4h.official@gmail.com">d4h.official@gmail.com</a>
            <a href="tel:+917400465666">+91 74004 65666</a>
            <a href="#contact">Book an appointment <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="footer-bottom page-container">
          <span>© 2026 Dial 4 Healthcare. All Rights Reserved.</span>
          <span>Designed By Azhari Infotech.</span>
        </div>
      </footer>
    </div>
  );
}