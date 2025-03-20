// lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function updateGameState(gameId: string, data: any) {
  const { error } = await supabase
    .from('games')
    .upsert({ 
      game_id: gameId,
      ...data,
      updated_at: new Date().toISOString()
    });
  
  if (error) console.error('Error updating game state:', error);
}

export async function recordPlayerScore(address: string, score: number) {
  // First get current player data
  const { data: player } = await supabase
    .from('players')
    .select('*')
    .eq('wallet_address', address)
    .single();
  
  const totalGames = (player?.total_games || 0) + 1;
  const totalScore = (player?.total_score || 0) + score;
  
  // Update player record
  const { error } = await supabase
    .from('players')
    .upsert({
      wallet_address: address,
      total_score: totalScore,
      total_games: totalGames,
      average_score: totalScore / totalGames,
      updated_at: new Date().toISOString()
    });
  
  if (error) console.error('Error recording player score:', error);
  
  // Check for achievements
  await checkAndUpdateAchievements(address, totalGames, totalScore);
}

async function checkAndUpdateAchievements(address: string, games: number, score: number) {
  const achievements = [];
  
  if (games >= 1) achievements.push('first_game');
  if (games >= 10) achievements.push('dedicated_player');
  if (score >= 100) achievements.push('century_scorer');
  
  if (achievements.length > 0) {
    const { error } = await supabase
      .from('achievements')
      .upsert(achievements.map(achievement => ({
        wallet_address: address,
        achievement_id: achievement,
        unlocked_at: new Date().toISOString()
      })));
    
    if (error) console.error('Error updating achievements:', error);
  }
}
