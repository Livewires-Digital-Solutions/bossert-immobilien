import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextField, SelectField, FormSubmitButton } from "@/components/ui/FormField";
import { RENTING_PROCESS } from "@/config";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Rent Out Your Property – Bossert Immobilien",
  description:
    "Let Bossert Immobilien find you the ideal tenant. We handle screening, contracts, and handover — professionally and discreetly.",
};

export default function RentOutPage() {
  const t = useTranslations("CTA");
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Rent Out Your Property"
        subtitle="Professional Tenant Management"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "For Owners", href: "/for-owners" },
          { label: "Rent Out" },
        ]}
      />

      {/* ── Intro + Process ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="reveal-left">
              <SectionHeader
                eyebrow="Our Lettings Process"
                title="Qualified tenants, stress-free management."
                description="We take the complexity out of letting your property — from assessing rental potential and marketing to screening every applicant and coordinating the handover."
              />
              <div className="mt-12 flex flex-col gap-8">
                {RENTING_PROCESS.map((step, i) => (
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
                <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">Free Assessment</span>
                <h2 className="font-display text-2xl text-[var(--navy)] mb-8">Tell us about your rental property</h2>
                <form className="flex flex-col gap-6" id="rent-out-form">
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
                    options={["Select Type", "Villa", "House", "Apartment", "Penthouse", "Other"]}
                  />
                  <TextField label="Approximate Size (sqm)" type="number" name="sqm" placeholder="120" />
                  <TextField label="Target Monthly Rent (€)" type="number" name="rent" placeholder="2500" />
                  <SelectField
                    label="Preferred Tenancy Length"
                    name="tenancy"
                    options={["Open", "1 Year", "2 Years", "3+ Years"]}
                  />
                  <TextField label="Additional Notes" name="notes" rows={3} placeholder="Any specific requirements or tenant preferences?" />
                  <FormSubmitButton label={t('requestRentalAppraisal')} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits Band ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-[var(--navy)]">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="What We Offer"
            title="Lettings management you can rely on."
            description="Our lettings team manages every stage — so you can enjoy the income without the hassle."
            align="center"
            dark
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Full Tenant Screening", text: "Schufa credit checks, income verification, and landlord references on every applicant." },
              { title: "Bespoke Marketing", text: "Premium listings on major portals and placement within our private tenant network." },
              { title: "Lease Preparation", text: "Legally sound rental agreements prepared and reviewed by our specialist partners." },
              { title: "Handover Coordination", text: "Structured handover protocol with detailed condition reports and key management." },
              { title: "Ongoing Support", text: "We remain your point of contact throughout the tenancy for any queries or issues." },
              { title: "Rent Optimisation", text: "Market-informed pricing advice to maximise yield without compromising occupancy." },
            ].map((item, i) => (
              <div key={item.title} className={`reveal stagger-${(i % 6) + 1} stat-card px-6 py-7`}>
                <h3 className="font-display text-lg text-[var(--cream)] mb-3">{item.title}</h3>
                <p className="font-body text-sm text-[var(--cream)]/65 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
