"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RED = "#C8102E";
const DARK = "#0a0a0a";

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push("/login"); return; }
      setUser(user);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#9ca3af" }}>Laden…</p>
    </div>
  );

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontWeight: 900, fontSize: "28px", letterSpacing: "-0.8px", margin: "0 0 4px", color: DARK }}>Mijn account</h1>
      <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 32px" }}>Welkom terug, {user?.user_metadata?.full_name || user?.email}</p>

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 14px" }}>Accountgegevens</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>E-mail</span>
            <span style={{ fontWeight: 600 }}>{user?.email}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>Naam</span>
            <span style={{ fontWeight: 600 }}>{user?.user_metadata?.full_name || "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>Lid sinds</span>
            <span style={{ fontWeight: 600 }}>{new Date(user?.created_at).toLocaleDateString("nl-NL")}</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 14px" }}>Bestellingen</p>
        <p style={{ fontSize: "13px", color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Nog geen bestellingen</p>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link href="/" style={{ flex: 1, background: DARK, color: "#fff", padding: "12px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", textDecoration: "none", textAlign: "center" }}>
          Naar de shop
        </Link>
        <button onClick={handleLogout}
          style={{ flex: 1, background: "#fff", color: "#dc2626", border: "1px solid #fecaca", padding: "12px", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
          Uitloggen
        </button>
      </div>
    </div>
  );
}
