"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function PropertyForm({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    titleEn: "",
    titleDe: "",
    type: "Villa",
    location: "",
    city: "",
    sqm: 0,
    plotSqm: 0,
    rooms: 0,
    bathrooms: 0,
    yearBuilt: 2000,
    energyClass: "A",
    price: "",
    status: "ForSale",
    descriptionEn: "",
    descriptionDe: "",
    agent: "",
    featured: false,
    published: true,
    images: [] as string[],
  });

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/properties/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({ 
            ...data,
            images: data.images?.map((img: any) => img.url) || [],
          });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/admin/properties" : `/api/admin/properties/${id}`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    router.push("/admin/properties");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) return;
    setSaving(true);
    await fetch(`/api/admin/properties/${id}`, { method: "DELETE" });
    router.push("/admin/properties");
    router.refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? Number(value) : value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-display text-[var(--navy)] tracking-wide">{isNew ? "New Property" : "Edit Property"}</h1>
        <Link href="/admin/properties" className="text-[var(--navy)]/60 hover:text-[var(--navy)] text-sm font-medium uppercase tracking-widest font-body transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-xl border border-[var(--navy)]/5 rounded-none p-10 space-y-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Slug</label>
            <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Price String</label>
            <input type="text" name="price" required value={formData.price} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Title (EN)</label>
            <input type="text" name="titleEn" required value={formData.titleEn} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Title (DE)</label>
            <input type="text" name="titleDe" required value={formData.titleDe} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors">
              <option>Villa</option>
              <option>Penthouse</option>
              <option>Apartment</option>
              <option>House</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors">
              <option>ForSale</option>
              <option>Reserved</option>
              <option>Sold</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">City</label>
            <input type="text" name="city" required value={formData.city} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Location</label>
            <input type="text" name="location" required value={formData.location} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Sqm</label>
            <input type="number" name="sqm" required value={formData.sqm} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Plot Sqm</label>
            <input type="number" name="plotSqm" value={formData.plotSqm} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Rooms</label>
            <input type="number" name="rooms" required value={formData.rooms} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Bathrooms</label>
            <input type="number" name="bathrooms" required value={formData.bathrooms} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Year Built</label>
            <input type="number" name="yearBuilt" required value={formData.yearBuilt} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Description (EN)</label>
            <textarea name="descriptionEn" required value={formData.descriptionEn} onChange={handleChange} rows={5} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Description (DE)</label>
            <textarea name="descriptionDe" required value={formData.descriptionDe} onChange={handleChange} rows={5} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4 text-[var(--bronze)] focus:ring-[var(--bronze)] border-[var(--navy)]/20 rounded-sm" />
            <span className="ml-2 text-sm text-[var(--navy)]/80 uppercase tracking-widest font-body">Featured</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="h-4 w-4 text-[var(--bronze)] focus:ring-[var(--bronze)] border-[var(--navy)]/20 rounded-sm" />
            <span className="ml-2 text-sm text-[var(--navy)]/80 uppercase tracking-widest font-body">Published</span>
          </label>
        </div>

        <div className="pt-8 border-t border-[var(--navy)]/10">
          <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60 mb-6">Property Images</label>
          <ImageUpload
            multiple
            value={formData.images}
            onChange={(val) => setFormData(prev => ({ ...prev, images: val as string[] }))}
          />
        </div>

        <div className="flex justify-between pt-8 border-t border-[var(--navy)]/10">
          {!isNew ? (
            <button type="button" onClick={handleDelete} disabled={saving} className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 uppercase tracking-widest text-xs font-body transition-colors disabled:opacity-50">
              Delete Property
            </button>
          ) : <div />}
          <button type="submit" disabled={saving} className="bg-[var(--navy)] hover:bg-[var(--bronze)] text-[var(--cream)] px-8 py-3 uppercase tracking-widest text-xs font-body transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
