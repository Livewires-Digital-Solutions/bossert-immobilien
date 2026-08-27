import { COMPANY } from "@/config";
import ContactForm from "@/components/ui/ContactForm";
import PageHero from "@/components/ui/PageHero";
import { Suspense } from "react";

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Hero */}
      <PageHero
        title="Get in Touch"
        subtitle="We are here for you"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        backgroundImage="https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-4 block">
              Contact Details
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[var(--navy)] mb-10">
              Visit us in {COMPANY.address.city}
            </h2>
            
            <div className="font-body text-[var(--foreground)]/70 flex flex-col gap-6 text-lg">
              <div>
                <strong className="text-[var(--navy)] block mb-1">Office Address</strong>
                {COMPANY.address.street}<br />
                {COMPANY.address.zip} {COMPANY.address.city}, {COMPANY.address.country}
              </div>
              <div>
                <strong className="text-[var(--navy)] block mb-1">Email</strong>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-[var(--bronze)] transition-colors">{COMPANY.email}</a>
              </div>
              <div>
                <strong className="text-[var(--navy)] block mb-1">Phone</strong>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-[var(--bronze)] transition-colors">{COMPANY.phone}</a>
              </div>
              <div>
                <strong className="text-[var(--navy)] block mb-1">Business Hours</strong>
                {COMPANY.hours.weekdays}<br />
                {COMPANY.hours.saturday}
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--navy)]/10 h-96 animate-pulse" />}>
            <ContactForm />
          </Suspense>

        </div>
      </section>
    </div>
  );
}
