"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}

export default function ImageUpload({ value, onChange, multiple = false }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const images = Array.isArray(value) ? value : value ? [value] : [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);

    const uploadedUrls: string[] = [];
    
    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    if (multiple) {
      onChange([...images, ...uploadedUrls]);
    } else {
      onChange(uploadedUrls[0] || "");
    }

    setUploading(false);
  };

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = [...images];
      newImages.splice(index, 1);
      onChange(newImages);
    } else {
      onChange("");
    }
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    if (!multiple) return;
    if (direction === 'up' && index > 0) {
      const newImages = [...images];
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
      onChange(newImages);
    } else if (direction === 'down' && index < images.length - 1) {
      const newImages = [...images];
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
      onChange(newImages);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer border border-[var(--navy)]/20 hover:border-[var(--bronze)] text-[var(--navy)] hover:text-[var(--bronze)] px-6 py-3 uppercase tracking-widest text-xs font-body transition-colors rounded-none bg-transparent">
          {uploading ? "Uploading..." : multiple ? "Upload Images" : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {images.length > 0 && (
        <div className={`grid gap-4 ${multiple ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-1 max-w-xs'}`}>
          {images.map((url, idx) => (
            <div key={`${url}-${idx}`} className="relative aspect-video bg-white rounded-none overflow-hidden border border-[var(--navy)]/10 shadow-sm group">
              <Image src={url} alt={`Upload ${idx}`} fill className="object-cover" sizes="300px" />
              
              <div className="absolute inset-0 bg-[var(--navy)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {multiple && (
                  <>
                    <button type="button" onClick={() => moveImage(idx, 'up')} disabled={idx === 0} className="p-2 bg-white rounded-none text-[var(--navy)] disabled:opacity-50 hover:bg-[var(--bronze)] hover:text-white transition-colors">
                      ←
                    </button>
                    <button type="button" onClick={() => moveImage(idx, 'down')} disabled={idx === images.length - 1} className="p-2 bg-white rounded-none text-[var(--navy)] disabled:opacity-50 hover:bg-[var(--bronze)] hover:text-white transition-colors">
                      →
                    </button>
                  </>
                )}
                <button type="button" onClick={() => removeImage(idx)} className="p-2 bg-red-600 text-white rounded-none hover:bg-red-700 transition-colors">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
