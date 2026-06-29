"use client";

import { useState } from "react";

/** Campo de subida de imagen (a Supabase Storage vía /api/upload). */
export function ImageField({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Error al subir");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {value ? (
        <img src={value} alt="" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, border: "1px solid #e4ebf0" }} />
      ) : (
        <div style={{ height: 80, borderRadius: 8, border: "1px dashed #cbd5e1", display: "grid", placeItems: "center", color: "#94a3b8", fontSize: 12 }}>
          Sin imagen
        </div>
      )}
      <label style={{ display: "inline-block", cursor: "pointer", background: "#2db84c", color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>
        {loading ? "Subiendo…" : value ? "Cambiar imagen" : "Subir imagen"}
        <input type="file" accept="image/*" hidden onChange={handleFile} />
      </label>
      {value && (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="o pega una URL"
          style={{ fontSize: 12, padding: "6px 8px", border: "1px solid #e4ebf0", borderRadius: 6 }}
        />
      )}
      {error && <span style={{ color: "#dc2626", fontSize: 12 }}>{error}</span>}
    </div>
  );
}
