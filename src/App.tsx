import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ValueProps from "./components/ValueProps";
import Capabilities from "./components/Capabilities";
import Upskill from "./components/Upskill";
import Logos from "./components/Logos";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import ChatAssistant from "./components/ChatAssistant";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col selection:bg-brand-lime selection:text-brand-green-deep">
      {/* Navigation */}
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* Hero Banner */}
        <Hero onOpenBooking={() => setIsBookingOpen(true)} />

        {/* 3 Value Propositions */}
        <ValueProps />

        {/* The Core Ecosystem Capabilities */}
        <Capabilities />

        {/* Capacity Building / Upskilling with code simulator */}
        <Upskill />

        {/* Brand/Client Logos */}
        <Logos />

        {/* Solutions Audit Contact Form */}
        <ContactForm />
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* Booking Consultation Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {/* Floating Gemini AI Chat Assistant */}
      <ChatAssistant />
    </div>
  );
}
