import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  if (!sessionId) return NextResponse.json({ valid: false });

  const { data } = await supabase
    .from("break_sessions")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .eq("status", "paid")
    .single();

  if (!data) return NextResponse.json({ valid: false });

  // Kullanıldı olarak işaretle
  await supabase.from("break_sessions")
    .update({ status: "used" })
    .eq("stripe_session_id", sessionId);

  return NextResponse.json({ valid: true, tierId: data.tier_id });
}
