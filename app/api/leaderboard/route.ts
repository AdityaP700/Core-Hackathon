// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function GET() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .order('total_score', { ascending: false })
    .limit(10);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // Add rank to each player
  const playersWithRank = data.map((player, index) => ({
    ...player,
    rank: index + 1
  }));
  
  return NextResponse.json({ players: playersWithRank });
}
