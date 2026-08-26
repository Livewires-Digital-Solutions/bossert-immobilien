import PageHero from "@/components/ui/PageHero";
import { SelectField, TextField } from "@/components/ui/FormField";

export default function PropertySearchPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <PageHero
        title="Property Search"
        subtitle="Refine Your Criteria"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Properties", href: "/properties" }, { label: "Search" }]}
      />

      <section className="py-24 px-6 md:px-10 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-display text-3xl text-[var(--navy)] mb-2">Search Our Portfolio</h3>
          <p className="font-body text-sm text-[var(--foreground)]/60 mb-10">
            Set your criteria below and browse matching properties from our exclusive portfolio.
          </p>

          <form action="/properties/search-results" method="GET" className="font-body flex flex-col gap-8">
            <TextField label="Keyword" name="q" placeholder="e.g. Villa Marienhöhe, Westend…" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectField
                label="Location"
                name="location"
                options={["All Locations", "Wiesbaden", "Frankfurt", "Mainz", "Kronberg"]}
              />
              <SelectField
                label="Property Type"
                name="type"
                options={["All Types", "Villa", "Penthouse", "Apartment", "House"]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectField
                label="Min. Rooms"
                name="rooms"
                options={["Any", "3+", "5+", "7+", "10+"]}
              />
              <SelectField
                label="Budget"
                name="price"
                options={["Any Price", "Under €2M", "€2M – €4M", "Over €4M"]}
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)] w-full justify-center">
                Search Properties
                <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)] ml-2" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" />
                    <polyline points="6.5,2.5 10,6 6.5,9.5" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
