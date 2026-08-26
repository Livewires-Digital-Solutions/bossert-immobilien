import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextField, SelectField, FormSubmitButton } from "@/components/ui/FormField";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Property Valuation – Bossert Immobilien",
  description:
    "Request a professional, market-driven property valuation from Bossert Immobilien's certified appraisers. No obligation, complete discretion.",
};

export default function ValuationPage() {
  const t = useTranslations("CTA");
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Property Valuation"
        subtitle="Precise · Market-Driven · Certified"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Owners", href: "/for-owners" },
          { label: "Property Valuation" },
        ]}
      />

      {/* ── Intro + Form ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="reveal-left">
            <SectionHeader
              eyebrow="Valuation Service"
              title="Know exactly what your property is worth."
              description="Our certified appraisers combine three decades of Rhine-Main market data with on-site inspection to deliver a defensible, evidence-based valuation — suitable for sale, financing, inheritance, or peace of mind."
            />
            <div className="mt-10 flex flex-col gap-6">
              {[
                { title: "Market Value Appraisal", text: "Comprehensive, comparable-based assessment reflecting current buyer demand." },
                { title: "Certified Documentation", text: "Reports accepted by banks, courts, and tax authorities." },
                { title: "Inheritance & Legal Valuations", text: "Sensitive, impartial reports for estate and legal proceedings." },
                { title: "No Obligation", text: "A free initial consultation with no commitment to sell or list with us." },
              ].map((item, i) => (
                <div key={item.title} className={`reveal stagger-${i + 1} flex gap-4 items-start`}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--bronze)] shrink-0" />
                  <div>
                    <h3 className="font-display text-base text-[var(--navy)] mb-1">{item.title}</h3>
                    <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Form ──────────────────────────────────────────────────── */}
          <div className="reveal-right">
            <div className="border border-[var(--navy)]/10 rounded-2xl p-8 md:p-10 bg-white shadow-sm">
              <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">Free Request</span>
              <h2 className="font-display text-2xl text-[var(--navy)] mb-8">Request your property valuation</h2>
              <form className="flex flex-col gap-6" id="valuation-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <TextField label="First Name" name="firstName" placeholder="Maximilian" />
                  <TextField label="Last Name" name="lastName" placeholder="Müller" />
                </div>
                <TextField label="Email Address" type="email" name="email" placeholder="name@example.de" />
                <TextField label="Phone Number" type="tel" name="phone" placeholder="+49 6196 …" />
                <TextField label="Property Address" name="address" placeholder="Full address including postal code" />
                <SelectField
                  label="Property Type"
                  name="type"
                  options={["Select Type", "Villa", "House", "Apartment", "Penthouse", "Commercial Land", "Other"]}
                />
                <TextField label="Approximate Living Space (sqm)" type="number" name="sqm" placeholder="250" />
                <TextField label="Plot Size (sqm, if applicable)" type="number" name="plot" placeholder="600" />
                <SelectField
                  label="Purpose of Valuation"
                  name="purpose"
                  options={["Considering a Sale", "Refinancing", "Inheritance / Estate", "Legal Proceedings", "General Information"]}
                />
                <TextField label="Additional Notes" name="notes" rows={3} placeholder="Year built, recent renovations, or other details…" />
                <FormSubmitButton label={t('getFreeValuation')} />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Makes Our Valuations Different ─────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Our Methodology"
            title="Valuations you can defend."
            description="We combine systematic market analysis with three decades of on-the-ground insight to produce valuations that stand up to scrutiny."
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Comparable Analysis", text: "We review recent, directly comparable transactions in your immediate area to establish a robust market baseline." },
              { num: "02", title: "On-Site Inspection", text: "A physical inspection of the property ensures condition, configuration, and unique features are accurately captured." },
              { num: "03", title: "Report & Debrief", text: "You receive a comprehensive written report plus a personal debrief call to explain the methodology and findings." },
            ].map((item, i) => (
              <div key={item.num} className={`reveal stagger-${i + 1} p-8 border border-[var(--navy)]/10 rounded-2xl bg-white`}>
                <span className="font-display text-4xl text-[var(--bronze)]/30 block mb-4">{item.num}</span>
                <h3 className="font-display text-xl text-[var(--navy)] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
