"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Phase = "tiers" | "packs" | "opening" | "done";
type Card = { name: string; rarity: string; rarityColor: string; bg: string };

const TIERS = [
  {
    id: "15", price: 15, label: "Starter Break", emoji: "🎴",
    desc: "3 packs · basis parallel kaarten mogelijk", accent: "#6b7280",
    cards: [
      { name: "Arda Güler – Mosaic Base",    rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-700 to-slate-900" },
      { name: "Haaland – Topps Base",        rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-700 to-slate-900" },
      { name: "Bellingham – Topps Base",     rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-600 to-slate-800" },
      { name: "Mbappé – Panini Base",        rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-700 to-slate-900" },
      { name: "Vinicius Jr – Mosaic Base",   rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-600 to-slate-800" },
      { name: "Rodri – Topps Base",          rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-700 to-slate-900" },
      { name: "Pikachu V – Paldea",          rarity: "Common",   rarityColor: "#6b7280", bg: "from-yellow-900 to-yellow-950" },
      { name: "Charizard Base – Scarlet",    rarity: "Common",   rarityColor: "#6b7280", bg: "from-red-900 to-red-950" },
      { name: "Mewtwo – Base Holo",          rarity: "Uncommon", rarityColor: "#9ca3af", bg: "from-purple-900 to-purple-950" },
      { name: "Lamine Yamal – Topps Base",   rarity: "Base",     rarityColor: "#6b7280", bg: "from-slate-700 to-slate-900" },
    ],
  },
  {
    id: "45", price: 45, label: "Premium Break", emoji: "✨",
    desc: "3 packs · refractors & foils gegarandeerd", accent: "#3b82f6",
    cards: [
      { name: "Mbappé – Prizm Silver Refractor",  rarity: "Refractor",     rarityColor: "#3b82f6", bg: "from-blue-700 to-blue-900" },
      { name: "Haaland – Chrome Gold Refractor",  rarity: "Gold Refractor", rarityColor: "#f59e0b", bg: "from-yellow-700 to-yellow-900" },
      { name: "Bellingham – Topps Gold Label",    rarity: "Gold Label",     rarityColor: "#f59e0b", bg: "from-amber-700 to-amber-900" },
      { name: "Arda Güler – Mosaic Blue Prizm",   rarity: "Blue Prizm",     rarityColor: "#60a5fa", bg: "from-blue-800 to-blue-950" },
      { name: "Vinicius – Prizm Red Refractor",   rarity: "Red Refractor",  rarityColor: "#ef4444", bg: "from-red-700 to-red-900" },
      { name: "Pikachu ex – Full Art",            rarity: "Full Art",       rarityColor: "#8b5cf6", bg: "from-violet-700 to-violet-900" },
      { name: "Charizard ex – Holo Rare",         rarity: "Holo Rare",      rarityColor: "#8b5cf6", bg: "from-purple-700 to-purple-900" },
      { name: "Mewtwo ex – Holo Rare",            rarity: "Holo Rare",      rarityColor: "#8b5cf6", bg: "from-indigo-700 to-indigo-900" },
      { name: "Luffy – OP-01 Super Rare",         rarity: "Super Rare",     rarityColor: "#f97316", bg: "from-orange-700 to-orange-900" },
      { name: "Zoro – OP-02 Foil Parallel",       rarity: "Foil Parallel",  rarityColor: "#22c55e", bg: "from-green-700 to-green-900" },
    ],
  },
  {
    id: "90", price: 90, label: "Elite Break", emoji: "💎",
    desc: "3 packs · ultra rares & special illustrations", accent: "#f59e0b",
    cards: [
      { name: "Charizard ex – Obsidian Flames UR",       rarity: "Ultra Rare",           rarityColor: "#f59e0b", bg: "from-orange-500 to-red-700" },
      { name: "Mbappé – Prizm Gold /10",                 rarity: "Gold /10",             rarityColor: "#fbbf24", bg: "from-yellow-500 to-amber-700" },
      { name: "Haaland – Chrome 1st Edition /25",        rarity: "1st Ed /25",           rarityColor: "#f59e0b", bg: "from-amber-600 to-orange-800" },
      { name: "Mewtwo ex – Special Illustration",        rarity: "Special Illustration", rarityColor: "#a78bfa", bg: "from-violet-500 to-purple-800" },
      { name: "Pikachu – Special Illustration Rare",     rarity: "Special Illustration", rarityColor: "#a78bfa", bg: "from-yellow-500 to-violet-700" },
      { name: "Arda Güler – Prizm Autograph /99",        rarity: "Auto /99",             rarityColor: "#f43f5e", bg: "from-rose-500 to-red-800" },
      { name: "Bellingham – Topps 1st Chrome RC",        rarity: "1st Chrome RC",        rarityColor: "#fbbf24", bg: "from-amber-500 to-yellow-800" },
      { name: "Luffy – Leader Secret Rare",              rarity: "Secret Rare",          rarityColor: "#f59e0b", bg: "from-orange-600 to-red-900" },
      { name: "Vinicius – Panini Prizm /5",              rarity: "Gold /5",              rarityColor: "#ffd700", bg: "from-yellow-400 to-amber-700" },
      { name: "Charizard – 1st Edition Base Holo",       rarity: "1st Ed Holo",          rarityColor: "#ef4444", bg: "from-red-500 to-red-900" },
    ],
  },
];

const PACK_COUNT = 20;
const PICKS = 3;
const CARDS_PER_PACK = 5;

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }
function getPackCards(tier: typeof TIERS[0]): Card[] {
  return Array.from({ length: CARDS_PER_PACK }, () => shuffle(tier.cards)[Math.floor(Math.random() * tier.cards.length)]);
}

function BreaksContent() {
  const searchParams = useSearchParams();
  const [phase, setPhase] = useState<Phase>("tiers");
  const [tier, setTier] = useState<typeof TIERS[0] | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [openedPacks, setOpenedPacks] = useState<Card[][]>([]);
  const [openingIdx, setOpeningIdx] = useState(0);
  const [flipped, setFlipped] = useState<boolean[]>([]);
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [paying, setPaying] = useState(false);

  // Stripe'dan dönen session_id'yi verify et
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;
    fetch("/api/breaks-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(r => r.json())
      .then(({ valid, tierId }) => {
        if (valid) {
          const t = TIERS.find(t => t.id === tierId);
          if (t) { setTier(t); setPhase("packs"); }
        } else {
          alert("Betaling niet bevestigd. Probeer opnieuw.");
        }
      });
  }, [searchParams]);

  const handlePay = async (t: typeof TIERS[0]) => {
    setPaying(true);
    const res = await fetch("/api/breaks-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tierId: t.id }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  const togglePack = (i: number) => {
    if (selected.includes(i)) setSelected(selected.filter(s => s !== i));
    else if (selected.length < PICKS) setSelected([...selected, i]);
  };

  const openPacks = () => {
    if (!tier || selected.length < PICKS) return;
    const packs = selected.map(() => getPackCards(tier));
    setOpenedPacks(packs);
    setOpeningIdx(0);
    setFlipped(Array(CARDS_PER_PACK).fill(false));
    setAllCards([]);
    setPhase("opening");
  };

  const flipCard = (i: number) => {
    const next = [...flipped]; next[i] = true; setFlipped(next);
    if (next.every(Boolean)) setAllCards(prev => [...prev, ...openedPacks[openingIdx]]);
  };

  // Tüm kartları tek seferde aç
  const flipAll = () => {
    const allFlippedState = Array(CARDS_PER_PACK).fill(true);
    setFlipped(allFlippedState);
    setAllCards(prev => [...prev, ...openedPacks[openingIdx]]);
  };

  const nextPack = () => {
    if (openingIdx + 1 >= openedPacks.length) { setPhase("done"); }
    else { setOpeningIdx(i => i + 1); setFlipped(Array(CARDS_PER_PACK).fill(false)); }
  };

  const reset = () => { setPhase("tiers"); setTier(null); setSelected([]); setOpenedPacks([]); setAllCards([]); };

  const currentPack = openedPacks[openingIdx] ?? [];
  const allFlipped = flipped.every(Boolean);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "system-ui, sans-serif", color: "#fff" }}>
      <div style={{ borderBottom: "1px solid #1f1f1f", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#fff", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.5px" }}>
          LUNAPO<span style={{ color: "#C8102E" }}>.</span>
        </Link>
        <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Digitale Breaks</span>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px" }}>

        {/* TIER SELECTION */}
        {phase === "tiers" && (
          <>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Kies je break</p>
              <h1 style={{ fontSize: "40px", fontWeight: 900, letterSpacing: "-1px", margin: "0 0 12px" }}>Digitale Breaks</h1>
              <p style={{ color: "#6b7280", fontSize: "14px", maxWidth: "400px", margin: "0 auto" }}>
                Betaal, selecteer 3 packs uit 20 en open ze direct op je scherm.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
              {TIERS.map(t => (
                <div key={t.id} style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: "16px", padding: "32px 24px" }}>
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>{t.emoji}</div>
                  <p style={{ fontSize: "11px", fontWeight: 700, color: t.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{t.label}</p>
                  <p style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-1px", marginBottom: "8px" }}>€{t.price}</p>
                  <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "24px" }}>{t.desc}</p>
                  <button onClick={() => handlePay(t)} disabled={paying}
                    style={{ background: t.accent, color: "#fff", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "12px", fontWeight: 800, cursor: paying ? "not-allowed" : "pointer", letterSpacing: "0.05em", textTransform: "uppercase", width: "100%", opacity: paying ? 0.7 : 1 }}>
                    {paying ? "Laden..." : `Betaal & Open →`}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PACK SELECTION */}
        {phase === "packs" && tier && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{tier.label} · €{tier.price}</p>
                <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px", margin: 0 }}>Kies 3 packs uit 20</h2>
              </div>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>{selected.length} / {PICKS} geselecteerd</span>
                <button onClick={openPacks} disabled={selected.length < PICKS}
                  style={{ background: selected.length >= PICKS ? tier.accent : "#1f1f1f", color: selected.length >= PICKS ? "#fff" : "#4b5563", border: "none", borderRadius: "8px", padding: "10px 24px", fontSize: "12px", fontWeight: 800, cursor: selected.length >= PICKS ? "pointer" : "not-allowed", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Open packs →
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
              {Array.from({ length: PACK_COUNT }).map((_, i) => {
                const isSel = selected.includes(i);
                return (
                  <button key={i} onClick={() => togglePack(i)}
                    style={{ aspectRatio: "2/3", borderRadius: "12px", border: `2px solid ${isSel ? tier.accent : "#1f1f1f"}`, background: isSel ? `${tier.accent}22` : "#111", cursor: selected.length >= PICKS && !isSel ? "not-allowed" : "pointer", transition: "all 0.15s", transform: isSel ? "scale(1.05)" : "scale(1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <div style={{ fontSize: "28px" }}>🃏</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: isSel ? tier.accent : "#4b5563" }}>
                      {isSel ? "✓ Geselecteerd" : `Pack ${i + 1}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* OPENING */}
        {phase === "opening" && tier && currentPack.length > 0 && (
          <>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Pack {openingIdx + 1} van {PICKS}
              </p>
              <h2 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px", margin: "0 0 8px" }}>
                {allFlipped ? "Pack geopend!" : "Open je kaarten"}
              </h2>
              <p style={{ color: "#6b7280", fontSize: "13px" }}>{flipped.filter(Boolean).length} / {CARDS_PER_PACK} geopend</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
              {currentPack.map((card, i) => (
                <div key={i} onClick={() => !flipped[i] && flipCard(i)}
                  style={{ aspectRatio: "2/3", borderRadius: "14px", cursor: flipped[i] ? "default" : "pointer" }}>
                  {!flipped[i] ? (
                    <div style={{ width: "100%", height: "100%", borderRadius: "14px", background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid #2d2d4e", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px" }}>
                      <div style={{ fontSize: "32px" }}>🎴</div>
                      <p style={{ fontSize: "11px", color: "#4b5563", fontWeight: 700 }}>Tik om te openen</p>
                    </div>
                  ) : (
                    <div className={`bg-gradient-to-br ${card.bg}`}
                      style={{ width: "100%", height: "100%", borderRadius: "14px", border: `1px solid ${card.rarityColor}44`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px", gap: "8px", animation: "fadeIn 0.3s ease" }}>
                      <div style={{ fontSize: "10px", fontWeight: 800, color: card.rarityColor, letterSpacing: "0.1em", textTransform: "uppercase", textAlign: "center", border: `1px solid ${card.rarityColor}55`, borderRadius: "4px", padding: "2px 6px" }}>
                        {card.rarity}
                      </div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "#fff", textAlign: "center", lineHeight: 1.3 }}>{card.name}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Open alles + volgende pack knoppen */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              {!allFlipped && (
                <button onClick={flipAll}
                  style={{ background: "#1f1f1f", color: "#9ca3af", border: "1px solid #333", borderRadius: "10px", padding: "12px 28px", fontSize: "12px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Open alle kaarten
                </button>
              )}
              {allFlipped && (
                <button onClick={nextPack}
                  style={{ background: tier.accent, color: "#fff", border: "none", borderRadius: "10px", padding: "14px 40px", fontSize: "13px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  {openingIdx + 1 >= PICKS ? "Bekijk alle kaarten →" : `Open pack ${openingIdx + 2} →`}
                </button>
              )}
            </div>
          </>
        )}

        {/* DONE */}
        {phase === "done" && (
          <>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h2 style={{ fontSize: "32px", fontWeight: 900, letterSpacing: "-0.5px", marginBottom: "8px" }}>Break voltooid!</h2>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>Je hebt {allCards.length} kaarten geopend</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px", marginBottom: "40px" }}>
              {allCards.map((card, i) => (
                <div key={i} style={{ borderRadius: "12px", border: `1px solid ${card.rarityColor}44`, padding: "16px 12px", background: "#111", display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: card.rarityColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>{card.rarity}</span>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: 0 }}>{card.name}</p>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button onClick={reset}
                style={{ background: "#C8102E", color: "#fff", border: "none", borderRadius: "10px", padding: "14px 32px", fontSize: "13px", fontWeight: 800, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Nieuwe break
              </button>
              <Link href="/"
                style={{ background: "#111", color: "#fff", border: "1px solid #333", borderRadius: "10px", padding: "14px 32px", fontSize: "13px", fontWeight: 800, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Terug naar shop
              </Link>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.9); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

export default function BreaksPage() {
  return (
    <Suspense>
      <BreaksContent />
    </Suspense>
  );
}
