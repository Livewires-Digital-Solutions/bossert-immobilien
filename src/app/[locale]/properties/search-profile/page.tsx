import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import { TextField, SelectField, FormSubmitButton } from "@/components/ui/FormField";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Save Search Profile – Bossert Immobilien",
  description:
    "Register your property search profile with Bossert Immobilien and be the first to hear about new listings that match your criteria — including off-market opportunities.",
};

export default function SearchProfilePage() {
  const t = useTranslations("CTA");

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Search Profile"
        subtitle="Be First to Know"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Properties", href: "/properties" },
          { label: "Search Profile" },
        ]}
      />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-10 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Left: Pitch */}
          <div className="reveal-left">
            <SectionHeader
              eyebrow="Your Personal Search"
              title="Never miss the perfect property."
              description="Register your exact criteria and we will match you with new listings — including exclusive off-market properties — before they reach the public market."
            />
            <div className="mt-10 flex flex-col gap-6">
              {[
                { title: "Instant Notification", text: "Receive an email alert the moment a matching property becomes available." },
                { title: "Off-Market Access", text: "Registered buyers are the first to hear about properties we handle discreetly." },
                { title: "Personalised Matching", text: "Our advisors review every profile and reach out directly when the right property arrives." },
                { title: "No Commitment", text: "Update or delete your profile at any time — there is no obligation attached." },
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

          {/* Right: Form */}
          <div className="reveal-right">
            <div className="border border-[var(--navy)]/10 rounded-2xl p-8 md:p-10 bg-white shadow-sm">
              <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[var(--bronze)] font-body mb-3 block">Free Registration</span>
              <h2 className="font-display text-2xl text-[var(--navy)] mb-8">Register your search profile</h2>
              <form className="flex flex-col gap-6" id="search-profile-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <TextField label="First Name" name="firstName" placeholder="Maximilian" />
                  <TextField label="Last Name" name="lastName" placeholder="Müller" />
                </div>
                <TextField label="Email Address" type="email" name="email" placeholder="name@example.de" />
                <TextField label="Phone Number" type="tel" name="phone" placeholder="+49 6196 …" />
                <SelectField
                  label="Preferred Location"
                  name="location"
                  options={["All Locations", "Wiesbaden", "Frankfurt", "Mainz", "Kronberg", "Flexible"]}
                />
                <SelectField
                  label="Property Type"
                  name="type"
                  options={["All Types", "Villa", "House", "Penthouse", "Apartment"]}
                />
                <div className="grid grid-cols-2 gap-6">
                  <TextField label="Min. Size (sqm)" type="number" name="minSqm" placeholder="100" />
                  <TextField label="Max. Size (sqm)" type="number" name="maxSqm" placeholder="600" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <SelectField
                    label="Min. Budget"
                    name="minBudget"
                    options={["No Min", "€500K", "€1M", "€2M", "€3M", "€5M"]}
                  />
                  <SelectField
                    label="Max. Budget"
                    name="maxBudget"
                    options={["No Max", "€1M", "€2M", "€3M", "€5M", "€10M+"]}
                  />
                </div>
                <SelectField
                  label="Min. Rooms"
                  name="minRooms"
                  options={["Any", "2+", "3+", "4+", "5+", "6+"]}
                />
                <TextField label="Special Requirements" name="notes" rows={3} placeholder="Garden, pool, home office, proximity to schools…" />
                <FormSubmitButton label={t('saveSearchProfile')} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
