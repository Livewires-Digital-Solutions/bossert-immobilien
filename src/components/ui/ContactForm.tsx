"use client";

import { useSearchParams } from "next/navigation";
import { TEAM_MEMBERS } from "@/config";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const t = useTranslations("CTA");

  const source = searchParams.get("source");
  const agentSlug = searchParams.get("agent");
  const propertyRef = searchParams.get("ref");

  let regardingText = "";

  if (agentSlug) {
    const agent = TEAM_MEMBERS.find((m) => m.slug === agentSlug);
    if (agent) {
      regardingText = `Regarding: Contacting ${agent.name}`;
    }
  } else if (propertyRef) {
    regardingText = `Regarding: Property Ref ${propertyRef}`;
  } else if (source) {
    const isSubscribe = source.startsWith("subscribe-");
    if (isSubscribe) {
      const cat = source.replace("subscribe-", "");
      regardingText = `Regarding: Subscription to ${cat.charAt(0).toUpperCase() + cat.slice(1)} Updates`;
    } else if (source === "newsletter") {
      regardingText = "Regarding: Newsletter Subscription";
    } else {
      regardingText = `Regarding: ${source.charAt(0).toUpperCase() + source.slice(1)} Services`;
    }
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[var(--navy)]/10">
      <h3 className="font-display text-3xl text-[var(--navy)] mb-2">Send a Message</h3>
      {regardingText && (
        <p className="font-body text-[0.7rem] tracking-[0.1em] uppercase text-[var(--bronze)] mb-8 p-3 bg-[var(--bronze)]/5 rounded-md border border-[var(--bronze)]/20 inline-block">
          {regardingText}
        </p>
      )}
      {!regardingText && <div className="mb-8" />}
      
      <form className="font-body flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col relative group">
            <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">First Name</label>
            <div className="relative">
              <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm" placeholder="John" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
            </div>
          </div>
          <div className="flex flex-col relative group">
            <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">Last Name</label>
            <div className="relative">
              <input type="text" className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm" placeholder="Doe" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
            </div>
          </div>
        </div>

        <div className="flex flex-col relative group">
          <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">Email Address</label>
          <div className="relative">
            <input type="email" className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm" placeholder="john@example.com" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
          </div>
        </div>

        <div className="flex flex-col relative group">
          <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 mb-2 group-focus-within:text-[var(--navy)] transition-colors duration-500 ease-out-circ">Message</label>
          <div className="relative">
            <textarea rows={4} className="border-b border-gray-300 py-2 bg-transparent outline-none w-full text-sm resize-none" placeholder="How can we assist you?"></textarea>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[var(--bronze)] group-focus-within:w-full transition-all duration-700 ease-out-expo" />
          </div>
        </div>

        <div className="mt-4">
          <button type="button" className="cta-btn !bg-[var(--navy)] !text-[var(--cream)] w-full justify-center">
            {t('submitRequest')}
            <span className="cta-btn-icon !bg-[var(--cream)] !text-[var(--navy)]" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
