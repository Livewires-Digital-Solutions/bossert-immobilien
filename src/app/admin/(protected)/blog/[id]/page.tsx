"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function BlogForm({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNew = id === "new";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    category: "Market Trends",
    titleEn: "",
    titleDe: "",
    excerptEn: "",
    excerptDe: "",
    contentEn: [] as string[],
    contentDe: [] as string[],
    image: "",
    date: "",
    readTime: "5 min read",
    author: "Elena Bossert",
    featured: false,
    published: true,
  });
  const [contentEnText, setContentEnText] = useState("");
  const [contentDeText, setContentDeText] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/blog/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...data });
          setContentEnText(data.contentEn?.join("\n\n") || "");
          setContentDeText(data.contentDe?.join("\n\n") || "");
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
    const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${id}`;

    const dataToSave = {
      ...formData,
      contentEn: contentEnText.split("\n\n").filter(Boolean),
      contentDe: contentDeText.split("\n\n").filter(Boolean),
    };

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSave),
    });

    router.push("/admin/blog");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    setSaving(true);
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    router.push("/admin/blog");
    router.refresh();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-display text-[var(--navy)] tracking-wide">{isNew ? "New Blog Post" : "Edit Blog Post"}</h1>
        <Link href="/admin/blog" className="text-[var(--navy)]/60 hover:text-[var(--navy)] text-sm font-medium uppercase tracking-widest font-body transition-colors">
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
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Category</label>
            <input type="text" name="category" required value={formData.category} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
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

        <div className="grid grid-cols-3 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Date</label>
            <input type="text" name="date" required value={formData.date} onChange={handleChange} placeholder="e.g. October 15, 2024" className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Read Time</label>
            <input type="text" name="readTime" required value={formData.readTime} onChange={handleChange} placeholder="e.g. 5 min read" className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Author</label>
            <input type="text" name="author" required value={formData.author} onChange={handleChange} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Excerpt (EN)</label>
            <textarea name="excerptEn" required value={formData.excerptEn} onChange={handleChange} rows={3} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Excerpt (DE)</label>
            <textarea name="excerptDe" required value={formData.excerptDe} onChange={handleChange} rows={3} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Content (EN) - Paragraphs separated by double newlines</label>
            <textarea value={contentEnText} onChange={(e) => setContentEnText(e.target.value)} rows={15} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors font-mono" />
          </div>
          <div>
            <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60">Content (DE) - Paragraphs separated by double newlines</label>
            <textarea value={contentDeText} onChange={(e) => setContentDeText(e.target.value)} rows={15} className="mt-2 block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent text-[var(--navy)] text-sm focus:outline-none focus:border-[var(--bronze)] focus:ring-0 transition-colors font-mono" />
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
          <label className="block text-xs font-body uppercase tracking-[0.1em] text-[var(--navy)]/60 mb-6">Cover Image</label>
          <ImageUpload
            multiple={false}
            value={formData.image}
            onChange={(val) => setFormData(prev => ({ ...prev, image: val as string }))}
          />
        </div>

        <div className="flex justify-between pt-8 border-t border-[var(--navy)]/10">
          {!isNew ? (
            <button type="button" onClick={handleDelete} disabled={saving} className="bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 uppercase tracking-widest text-xs font-body transition-colors disabled:opacity-50">
              Delete Post
            </button>
          ) : <div />}
          <button type="submit" disabled={saving} className="bg-[var(--navy)] hover:bg-[var(--bronze)] text-[var(--cream)] px-8 py-3 uppercase tracking-widest text-xs font-body transition-colors disabled:opacity-50">
            {saving ? "Saving..." : "Save Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
