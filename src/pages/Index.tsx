import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutDelivery from "@/components/AboutDelivery";
import ReviewsContacts from "@/components/ReviewsContacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [preorderFruit, setPreorderFruit] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preorderSuccess, setPreorderSuccess] = useState(false);
  const [preorderLoading, setPreorderLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-montserrat" style={{ backgroundColor: "var(--fruit-bg)" }}>
      <NavBar
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <HeroSection
        visible={visible}
        scrollTo={scrollTo}
        preorderFruit={preorderFruit}
        setPreorderFruit={setPreorderFruit}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        preorderSuccess={preorderSuccess}
        setPreorderSuccess={setPreorderSuccess}
        preorderLoading={preorderLoading}
        setPreorderLoading={setPreorderLoading}
      />

      <AboutDelivery />

      <ReviewsContacts
        scrollTo={scrollTo}
        contactForm={contactForm}
        setContactForm={setContactForm}
        contactSuccess={contactSuccess}
        setContactSuccess={setContactSuccess}
        contactLoading={contactLoading}
        setContactLoading={setContactLoading}
      />
    </div>
  );
}
