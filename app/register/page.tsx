"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

const RED = "#C8102E";
const DARK = "#0a0a0a";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const supabase = createClient();

  const handleRegister = async () => {
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({
      email, password: pass,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/account` }
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
  };

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/account` } });
  };

  if (done) return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "40px 28px", maxWidth: "420px", width: "100%", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", background: "#f0fdf4", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px" }}>✓</div>
        <h2 style={{ fontWeight: 900, fontSize: "22px", margin: "0 0 8px", color: DARK }}>Check je e-mail!</h2>
        <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
          We hebben een bevestigingslink gestuurd naar <strong>{email}</strong>. Klik op de link om je account te activeren.
        </p>
        <Link href="/login" style={{ background: DARK, color: "#fff", padding: "12px 24px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none", display: "inline-block" }}>
          Terug naar inloggen
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <p style={{ fontWeight: 900, fontSize: "26px", letterSpacing: "-1px", margin: 0, color: DARK }}>LUNAPO<span style={{ color: RED }}>.</span></p>
          </Link>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: "4px 0 0" }}>Premium Collectibles</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e5e7eb", padding: "32px 28px" }}>
          <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "10px", padding: "4px", marginBottom: "28px" }}>
            <Link href="/login" style={{ flex: 1, padding: "8px", textAlign: "center", fontSize: "13px", fontWeight: 700, color: "#6b7280", textDecoration: "none" }}>Inloggen</Link>
            <div style={{ flex: 1, padding: "8px", borderRadius: "7px", background: "#fff", textAlign: "center", fontSize: "13px", fontWeight: 700, color: DARK, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>Registreren</div>
          </div>
          <h2 style={{ fontWeight: 900, fontSize: "22px", letterSpacing: "-0.5px", margin: "0 0 4px", color: DARK }}>Account aanmaken</h2>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 24px" }}>Word lid van de Lunapo community</p>
          {error && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#dc2626", marginBottom: "16px" }}>{error}</div>}
          {[["Volledige naam", "text", name, setName, "Jan de Vries"],
            ["E-mailadres", "email", email, setEmail, "jij@email.com"],
            ["Wachtwoord", "password", pass, setPass, "Minimaal 6 tekens"]].map(([label, type, val, setter, ph]) => (
            <div key={label} style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>{label}</label>
              <input type={type} value={val} onChange={e => setter(e.target.value)} placeholder={ph}
                style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb", borderRadius: "10px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
          <button onClick={handleRegister} disabled={loading}
            style={{ width: "100%", background: DARK, color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontWeight: 800, fontSize: "14px", cursor: "pointer", marginBottom: "16px", marginTop: "6px" }}>
            {loading ? "Account aanmaken…" : "Account aanmaken"}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af" }}>of</span>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          </div>
          <button onClick={handleGoogle}
            style={{ width: "100%", background: "#fff", color: DARK, border: "1.5px solid #e5e7eb", padding: "11px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Doorgaan met Google
          </button>
        </div>
      </div>
    </div>
  );
}
