"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DARK = "#0a0a0a";
const RED = "#C8102E";

const COUNTRIES = ["NL", "DE", "BE", "FR", "UK", "TR", "US", "Other"];

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("NL");
  const [avatarUrl, setAvatarUrl] = useState("");

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (profile) {
        setFullName(profile.full_name || "");
        setUsername(profile.username || "");
        setBio(profile.bio || "");
        setCountry(profile.country || "NL");
        setAvatarUrl(profile.avatar_url || "");
      }
      setLoading(false);
    };
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      username: username || null,
      bio,
      country,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    if (error) { setError(error.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#9ca3af" }}>Laden…</p>
    </div>
  );

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
        <Link href="/account" style={{ color: "#9ca3af", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>← Account</Link>
        <h1 style={{ fontWeight: 900, fontSize: "26px", letterSpacing: "-0.8px", margin: 0, color: DARK }}>Profiel bewerken</h1>
      </div>

      {/* Avatar */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>Profielfoto</p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: avatarUrl ? "transparent" : "#f3f4f6", border: "2px solid #e5e7eb", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
            {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "👤"}
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Avatar URL</label>
            <input type="url" value={avatarUrl} onChange={e => setAvatarUrl(e.target.value)} placeholder="https://..."
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
      </div>

      {/* Gegevens */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 20px" }}>Persoonlijke gegevens</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Volledige naam</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Jan de Vries"
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Gebruikersnaam <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optioneel)</span>
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: "13px" }}>@</span>
              <input type="text" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="jandevries"
                style={{ width: "100%", padding: "10px 12px 10px 28px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
              Bio <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optioneel)</span>
            </label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Vertel iets over jezelf…" rows={3}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "system-ui, sans-serif" }} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Land</label>
            <select value={country} onChange={e => setCountry(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e5e7eb", borderRadius: "8px", fontSize: "13px", outline: "none", background: "#fff", boxSizing: "border-box" }}>
              {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* E-mail (readonly) */}
      <div style={{ background: "#f9fafb", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "16px 24px", marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", alignItems: "center" }}>
          <span style={{ color: "#6b7280", fontWeight: 600 }}>E-mail</span>
          <span style={{ fontWeight: 700, color: DARK }}>{user?.email}</span>
        </div>
        <p style={{ fontSize: "11px", color: "#9ca3af", margin: "4px 0 0" }}>E-mailadres kan niet worden gewijzigd</p>
      </div>

      {error && <p style={{ color: "#dc2626", fontSize: "13px", marginBottom: "12px" }}>{error}</p>}

      <button onClick={handleSave} disabled={saving}
        style={{ width: "100%", background: saved ? "#16a34a" : DARK, color: "#fff", border: "none", padding: "14px", borderRadius: "10px", fontWeight: 800, fontSize: "14px", cursor: saving ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
        {saved ? "✓ Opgeslagen!" : saving ? "Opslaan…" : "Profiel opslaan"}
      </button>
    </div>
  );
}
