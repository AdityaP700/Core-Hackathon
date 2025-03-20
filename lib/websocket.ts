// lib/websocket.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function subscribeToLeaderboard(callback: (data: any) => void) {
  const channel = supabase
    .channel('leaderboard-updates')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'players' 
    }, (payload) => {
      callback(payload.new);
    })
    .subscribe();
  
  return () => {
    supabase.removeChannel(channel);
  };
}
