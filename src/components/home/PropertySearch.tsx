"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { mockProperties } from "@/lib/mock-data";

export default function PropertySearch() {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations("CTA"); 
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    
    const formData = new FormData(e.currentTarget);
    const location = formData.get('location')?.toString() || '';
    const type = formData.get('type')?.toString() || '';
    const priceMin = formData.get('priceMin')?.toString() || '';
    const priceMax = formData.get('priceMax')?.toString() || '';
    
    // Construct query params
    const params = new URLSearchParams();
    if (location) {
      params.set('location', location);
      params.set('q', location); // Also set 'q' for generic search on the results page
    }
    
    // We map 'type' to the labels expected by the search-results if needed, 
    // but for now we just pass what they select.
    if (type && type !== 'Any type') {
      params.set('type', type);
    }
    
    // Handle price mapping for search-results which currently expects specific strings
    if (priceMax) {
      const pMax = parseFloat(priceMax);
      if (pMax <= 2000000) params.set('price', 'Under €2M');
      else if (pMax <= 4000000) params.set('price', '€2M – €4M');
      else params.set('price', 'Over €4M');
    }
    
    router.push(`/properties/search-results?${params.toString()}`);
    
    // Reset loading state after a delay
    setTimeout(() => setIsSearching(false), 1000);
  };

  return (
    <section className="relative z-20 -mt-16 md:-mt-24 px-6 md:px-10 mb-20 max-w-[1300px] mx-auto anim-fade-up">
      <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_24px_48px_rgba(4,36,51,0.08)] border border-white/40 p-6 md:p-8 flex flex-col gap-6 w-full relative z-30">
        
        {/* TOP ROW: Basic Search */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end relative">
          
          {/* Location */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--navy)] font-bold">Location</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--bronze)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </span>
              <input 
                type="text" 
                name="location"
                placeholder="Where are you looking?" 
                className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border-b-2 border-gray-100 focus:border-[var(--bronze)] focus:bg-white focus:shadow-sm outline-none transition-all duration-500 ease-out-circ text-sm text-[var(--navy)] placeholder:text-gray-400 rounded-t-md"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--navy)] font-bold">Property Type</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--bronze)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </span>
              <select name="type" className="w-full pl-10 pr-10 py-3 bg-gray-50/50 border-b-2 border-gray-100 focus:border-[var(--bronze)] focus:bg-white focus:shadow-sm outline-none transition-all duration-500 ease-out-circ text-sm text-[var(--navy)] appearance-none cursor-pointer rounded-t-md">
                <option value="">Any type</option>
                <optgroup label="House" className="font-bold">
                  <option value="House">All Houses</option>
                  <option value="bungalow">Bungalow</option>
                  <option value="semi-detached">Semi-detached house</option>
                  <option value="single-family">Single-family house</option>
                  <option value="end-of-terrace">End-of-terrace house</option>
                  <option value="terraced">Terraced house</option>
                  <option value="two-family">Two-family house</option>
                </optgroup>
                <optgroup label="Apartment" className="font-bold">
                  <option value="Apartment">All Apartments</option>
                  <option value="penthouse">Penthouse apartment</option>
                  <option value="maisonette">Maisonette apartment</option>
                </optgroup>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--navy)] font-bold">Bedrooms</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--bronze)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
              </span>
              <select name="bedrooms" className="w-full pl-10 pr-8 py-3 bg-gray-50/50 border-b-2 border-gray-100 focus:border-[var(--bronze)] focus:bg-white focus:shadow-sm outline-none transition-all duration-500 ease-out-circ text-sm text-[var(--navy)] appearance-none cursor-pointer rounded-t-md">
                <option value="">Any</option>
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num}+</option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
          </div>

          {/* Year Built */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[0.65rem] tracking-[0.15em] uppercase text-[var(--navy)] font-bold">Year Built</label>
            <div className="relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--bronze)] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </span>
              <select name="yearBuilt" className="w-full pl-10 pr-8 py-3 bg-gray-50/50 border-b-2 border-gray-100 focus:border-[var(--bronze)] focus:bg-white focus:shadow-sm outline-none transition-all duration-500 ease-out-circ text-sm text-[var(--navy)] appearance-none cursor-pointer rounded-t-md">
                <option value="">Any</option>
                <option value="2020">2020+</option>
                <option value="2010">2010+</option>
                <option value="2000">2000+</option>
                <option value="1990">1990+</option>
                <option value="historic">Historic</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
            </div>
          </div>

          {/* Search Button */}
          <div className="md:col-span-2 flex flex-col gap-2 justify-end">
            <button 
              type="submit"
              disabled={isSearching}
              className="h-[46px] w-full bg-[var(--navy)] hover:bg-[var(--bronze)] disabled:bg-[var(--navy)]/70 text-[var(--cream)] rounded-md flex items-center justify-center gap-2 transition-all duration-400 ease-out-circ font-body text-sm font-medium tracking-wide shadow-[0_4px_12px_rgba(4,36,51,0.1)] hover:shadow-[0_8px_20px_rgba(175,140,83,0.25)] hover:-translate-y-0.5"
            >
              {isSearching ? "Searching..." : "Search"}
              {!isSearching && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* Divider & Advanced Toggle */}
        <div className="relative pt-2">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-start">
            <button 
              type="button" 
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex items-center gap-2 bg-white pr-4 text-sm font-medium text-[var(--navy)] hover:text-[var(--bronze)] transition-colors group"
            >
              <div className={`flex items-center justify-center w-5 h-5 rounded border ${advancedOpen ? 'bg-[var(--navy)] border-[var(--navy)]' : 'border-gray-300 group-hover:border-[var(--bronze)]'} transition-colors`}>
                {advancedOpen && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                )}
              </div>
              Advanced search
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transform transition-transform duration-300 ml-1 ${advancedOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>
        </div>

        {/* Advanced Search Area */}
        <div className={`grid transition-all duration-500 ease-in-out ${advancedOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
          <div className="overflow-hidden flex flex-col gap-8">
            
            {/* Filters Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-2">
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Price</label>
                <div className="flex items-center gap-2">
                  <input type="number" name="priceMin" placeholder="Min" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                  <span className="text-gray-400 text-xs">to</span>
                  <input type="number" name="priceMax" placeholder="Max" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Living Area</label>
                <div className="flex items-center gap-2">
                  <input type="number" name="livingMin" placeholder="Min m²" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                  <span className="text-gray-400 text-xs">to</span>
                  <input type="number" name="livingMax" placeholder="Max m²" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Land Area</label>
                <div className="flex items-center gap-2">
                  <input type="number" name="landMin" placeholder="Min m²" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                  <span className="text-gray-400 text-xs">to</span>
                  <input type="number" name="landMax" placeholder="Max m²" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm text-center" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Bathrooms</label>
                <div className="relative">
                  <select name="bathrooms" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm appearance-none cursor-pointer">
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Energy Rating</label>
                <div className="relative">
                  <select name="energy" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm appearance-none cursor-pointer">
                    <option value="">Any</option>
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Filters Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-3 flex flex-col gap-3">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Features</label>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { id: 'balcony', name: 'feature_balcony', label: 'Balcony', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M5 21v-4"></path><path d="M19 21v-4"></path><path d="M3 12h18"></path><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"></path><path d="M12 12v9"></path></svg> },
                    { id: 'garden', name: 'feature_garden', label: 'Garden', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c4.97-4.97 8-9.45 8-13a8 8 0 1 0-16 0c0 3.55 3.03 8.03 8 13z"></path><circle cx="12" cy="9" r="2"></circle></svg> },
                    { id: 'garage', name: 'feature_garage', label: 'Garage / Parking', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a2 2 0 0 0-1.6-.8H9.3a2 2 0 0 0-1.6.8L5 11l-5.16.86a1 1 0 0 0-.84.99V16h3m10 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0m-5 0a2 2 0 1 1-4 0m4 0a2 2 0 1 0-4 0"></path></svg> },
                    { id: 'terrace', name: 'feature_terrace', label: 'Terrace', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M3 17h18"></path><path d="M7 17v4"></path><path d="M17 17v4"></path><path d="M12 17v4"></path><path d="M5 13h14"></path><path d="M7 13l-2-6"></path><path d="M17 13l2-6"></path></svg> },
                    { id: 'elevator', name: 'feature_elevator', label: 'Elevator', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><polyline points="12 7 12 11"></polyline><polyline points="10 9 12 7 14 9"></polyline><polyline points="12 17 12 13"></polyline><polyline points="14 15 12 17 10 15"></polyline></svg> },
                    { id: 'fireplace', name: 'feature_fireplace', label: 'Fireplace', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg> }
                  ].map((feature) => (
                    <label key={feature.id} className="flex items-center gap-2 cursor-pointer group text-sm text-[var(--navy)]">
                      <input type="checkbox" name={feature.name} value="true" className="hidden peer" />
                      <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center peer-checked:bg-[var(--navy)] peer-checked:border-[var(--navy)] group-hover:border-[var(--bronze)] transition-colors">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 peer-checked:opacity-100 transition-opacity"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-gray-400 group-hover:text-[var(--navy)] peer-checked:text-[var(--navy)] transition-colors">{feature.icon}</span>
                      <span>{feature.label}</span>
                    </label>
                  ))}
                  
                  <button type="button" className="text-xs text-gray-500 hover:text-[var(--navy)] underline underline-offset-2 flex items-center gap-1 transition-colors ml-2 mt-0.5">
                    Show more <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.65rem] tracking-[0.1em] uppercase text-gray-500 font-bold">Availability</label>
                <div className="relative">
                  <select name="availability" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-md outline-none focus:border-[var(--bronze)] transition-colors text-sm appearance-none cursor-pointer">
                    <option value="">Any</option>
                    <option value="immediate">Immediate</option>
                    <option value="arranged">By arrangement</option>
                    <option value="project">Project phase</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 mt-2 gap-4">
              <button type="reset" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--navy)] font-medium transition-colors w-full sm:w-auto justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>
                Reset filters
              </button>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <span className="text-sm font-medium text-[var(--navy)]">{mockProperties.length} properties found</span>
                <button 
                  type="submit" 
                  disabled={isSearching}
                  className="cta-btn !py-2.5 shadow-md shadow-[var(--bronze)]/10 hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto justify-center disabled:opacity-70"
                >
                  {isSearching ? "Searching..." : "Show properties"}
                  {!isSearching && (
                    <span className="cta-btn-icon !w-7 !h-7 ml-3" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6" x2="10" y2="6" /><polyline points="6.5,2.5 10,6 6.5,9.5" /></svg>
                    </span>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </form>
    </section>
  );
}
