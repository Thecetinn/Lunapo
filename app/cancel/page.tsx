import Link from "next/link";
export const metadata = { title: "Betaling geannuleerd" };
export default function CancelPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center container-px">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-3xl mb-6">✕</div>
      <h1 className="font-black text-3xl tracking-tighter mb-2">Betaling geannuleerd</h1>
      <p className="text-neutral-500 text-sm max-w-sm mb-6">Geen zorgen — je winkelmand is bewaard.</p>
      <div className="flex gap-3">
        <Link href="/cart" className="bg-neutral-900 hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">Terug naar winkelmand</Link>
        <Link href="/" className="border border-neutral-200 font-bold text-sm px-6 py-3 rounded-xl hover:border-neutral-400 transition-colors">Verder winkelen</Link>
      </div>
    </div>
  );
}
