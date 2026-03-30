import Link from "next/link";
export const metadata = { title: "Betaling geslaagd!" };
export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center container-px">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-6">✓</div>
      <h1 className="font-black text-3xl tracking-tighter mb-2">Betaling geslaagd!</h1>
      <p className="text-neutral-500 text-sm max-w-sm mb-6">Bedankt voor je bestelling bij Lunapo. Je ontvangt een bevestigingsmail.</p>
      <Link href="/" className="bg-neutral-900 hover:bg-brand text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">Terug naar shop</Link>
    </div>
  );
}
