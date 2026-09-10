import React from 'react';
import type { PublicPropertyView } from '@/lib/property-view';

/**
 * Renders the property fact fields the admin enabled, grouped into the same
 * sections as the admin panel. Adapts automatically as toggles change — no
 * hard-coded field list. Short values go in a stat grid; long prose renders
 * full-width.
 */
export default function CuratedPropertyFacts({
  sections,
}: {
  sections: PublicPropertyView['sections'];
}) {
  if (!sections.length) return null;

  return (
    <>
      {sections.map((section) => {
        const shortFields = section.fields.filter((f) => f.value.length <= 70);
        const longFields = section.fields.filter((f) => f.value.length > 70);

        return (
          <section className="property-section" key={section.name}>
            <h2 className="property-section-title">{sectionTitleDe(section.name)}</h2>

            {shortFields.length > 0 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: longFields.length ? '2rem' : 0,
                  color: 'var(--navy)',
                }}
              >
                {shortFields.map((field) => (
                  <div key={field.key}>
                    <strong>{field.label}</strong>
                    <br />
                    {field.value}
                  </div>
                ))}
              </div>
            )}

            {longFields.map((field) => (
              <div key={field.key} style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--navy)' }}>
                  {field.label}
                </strong>
                <p className="property-description" style={{ whiteSpace: 'pre-line' }}>
                  {field.value}
                </p>
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}

const SECTION_DE: Record<string, string> = {
  Overview: 'Überblick',
  Price: 'Preis & Kosten',
  Areas: 'Flächen',
  Rooms: 'Räume',
  Building: 'Gebäude',
  Energy: 'Energie & Heizung',
  Location: 'Lage',
  Description: 'Beschreibung',
  Other: 'Weitere Angaben',
};

function sectionTitleDe(name: string): string {
  return SECTION_DE[name] ?? name;
}
