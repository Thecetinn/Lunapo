"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DARK = "#0a0a0a";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(profile);

      const { data: orders } = await supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
      setOrders(orders || []);

      setLoading(false);
    };
    load();
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
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 20px", fontFamily: "system-ui, sans-serif" }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: "28px", letterSpacing: "-0.8px", margin: "0 0 4px", color: DARK }}>Mijn account</h1>
          <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>Welkom terug, {profile?.full_name || user?.email}</p>
        </div>
        <Link href="/profile" style={{ background: DARK, color: "#fff", padding: "10px 18px", borderRadius: "10px", fontWeight: 700, fontSize: "12px", textDecoration: "none" }}>
          ✏️ Profiel bewerken
        </Link>
      </div>

      {/* Accountgegevens */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>Accountgegevens</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>E-mail</span>
            <span style={{ fontWeight: 600 }}>{user?.email}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>Naam</span>
            <span style={{ fontWeight: 600 }}>{profile?.full_name || "—"}</span>
          </div>
          {profile?.username && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#6b7280" }}>Gebruikersnaam</span>
              <span style={{ fontWeight: 600 }}>@{profile.username}</span>
            </div>
          )}
          {profile?.country && (
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#6b7280" }}>Land</span>
              <span style={{ fontWeight: 600 }}>{profile.country}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
            <span style={{ color: "#6b7280" }}>Lid sinds</span>
            <span style={{ fontWeight: 600 }}>{new Date(user?.created_at).toLocaleDateString("nl-NL")}</span>
          </div>
        </div>
      </div>

      {/* Bestellingen */}
      <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", padding: "24px", marginBottom: "24px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 16px" }}>
          Bestellingen ({orders.length})
        </p>
        {orders.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#9ca3af", textAlign: "center", padding: "20px 0" }}>Nog geen bestellingen</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {orders.map((order) => (
              <div key={order.id} style={{ border: "1px solid #f3f4f6", borderRadius: "10px", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, margin: "0 0 4px", color: DARK }}>
                    {order.type === "break" ? "🎴 Digitale Break" : "🛒 Bestelling"}
                  </p>
                  <p style={{ fontSize: "11px", color: "#9ca3af", margin: 0 }}>
                    {new Date(order.created_at).toLocaleDateString("nl-NL")}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, margin: "0 0 4px", color: DARK }}>€{Number(order.total).toFixed(2)}</p>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#16a34a", background: "#f0fdf4", padding: "2px 8px", borderRadius: "999px" }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
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
