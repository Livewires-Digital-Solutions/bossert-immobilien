import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextField, SelectField, FormSubmitButton } from "@/components/ui/FormField";
import { SELLING_PROCESS } from "@/config";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Sell Your Property – Bossert Immobilien",
  description:
    "Sell your property through Bossert Immobilien — discreet, professional, and market-driven. Request a free, no-obligation consultation today.",
};

export default function SellPage() {
  const t = useTranslations("CTA");
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Sell Your Property"
        subtitle="Discreet · Professional · Results-Driven"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Owners", href: "/for-owners" },
          { label: "Sell" },
        ]}
      />

      {/* ── Intro + Process ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <SectionHeader
                eyebrow="Our Process"
                title="A proven approach to selling with confidence."
                description="Every sale mandate begins with a thorough assessment of your property and the local market, followed by a bespoke strategy designed to attract the right buyer at the right price."
              />
              <div className="mt-12 flex flex-col gap-8">
                {SELLING_PROCESS.map((step, i) => (
                  <div key={step.num} className={`reveal stagger-${i + 1} flex gap-6 items-start`}>
                    <span className="font-display text-4xl text-[var(--bronze)]/30 leading-none w-12 shrink-0">{step.num}</span>
                    <div>
                      <h3 className="font-display text-xl text-[var(--navy)] mb-2">{step.title}</h3>
                      <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Enquiry Form ─────────────────────────────────────────── */}
            <div className="reveal-right">
              <div className="border border-[var(--navy)]/10 rounded-2xl p-8 md:p-10 bg-white shadow-sm">
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">Free Consultation</span>
                <h2 className="font-display text-2xl text-[var(--navy)] mb-8">Tell us about your property</h2>
                <form className="flex flex-col gap-6" id="sell-enquiry-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <TextField label="First Name" name="firstName" placeholder="Maximilian" />
                    <TextField label="Last Name" name="lastName" placeholder="Müller" />
                  </div>
                  <TextField label="Email Address" type="email" name="email" placeholder="name@example.de" />
                  <TextField label="Phone Number" type="tel" name="phone" placeholder="+49 6196 …" />
                  <TextField label="Property Address" name="address" placeholder="Street, City" />
                  <SelectField
                    label="Property Type"
                    name="type"
                    options={["Select Type", "Villa", "House", "Apartment", "Penthouse", "Commercial", "Other"]}
                  />
                  <TextField label="Approximate Size (sqm)" type="number" name="sqm" placeholder="250" />
                  <TextField label="Desired Timeframe" name="timeframe" placeholder="e.g. Within 6 months" />
                  <TextField label="Additional Notes" name="notes" rows={3} placeholder="Tell us anything else we should know…" />
                  <FormSubmitButton label={t('requestSellingConsultation')} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Sell with Bossert ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Our Advantages"
            title="Why owners choose Bossert."
            align="center"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Pre-Qualified Buyer Network", text: "Access to 500+ vetted, high-net-worth buyers who are actively searching for premium properties." },
              { title: "Off-Market Options", text: "For clients who value confidentiality, we offer fully discreet placements before any public listing." },
              { title: "Premium Marketing", text: "Professional photography, cinematic video, and bespoke exposés that position your property at its best." },
              { title: "Expert Negotiation", text: "Our advisors consistently achieve 97–100% of asking price through skilled, experience-backed negotiation." },
              { title: "Notary Coordination", text: "Full support through the legal process, including coordination with notaries and purchase contract review." },
              { title: "30+ Years Experience", text: "Over three decades of the Rhine-Main market — an unmatched combination of data, relationships, and instinct." },
            ].map((item, i) => (
              <div key={item.title} className={`reveal stagger-${(i % 6) + 1} p-6 border border-[var(--navy)]/10 rounded-xl bg-white`}>
                <h3 className="font-display text-lg text-[var(--navy)] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[var(--foreground)]/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
