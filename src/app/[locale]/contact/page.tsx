import { COMPANY } from "@/config";
import ContactForm from "@/components/ui/ContactForm";
import { Suspense } from "react";

export default function ContactPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      {/* Mini Hero */}
      <section className="page-hero px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-display text-[var(--cream)] mb-4">Get in Touch</h1>
          <p className="font-body text-[var(--cream)]/70 tracking-[0.2em] uppercase text-xs">
            We are here for you
          </p>
        </div>
      </section>

      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
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
