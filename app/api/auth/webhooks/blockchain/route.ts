// app/api/webhooks/blockchain/route.ts
import { NextResponse } from 'next/server';
import { updateGameState, recordPlayerScore } from '@/lib/db';

export async function POST(request: Request) {
  const payload = await request.json();
  
  // Handle different event types
  switch (payload.eventName) {
    case 'GameCreated':
      await updateGameState(payload.gameId, {
        status: 'created',
        startTime: payload.startTime,
        entryFee: payload.entryFee
      });
      break;
    
    case 'PlayerJoined':
      await updateGameState(payload.gameId, {
        players: payload.players
      });
      break;
    
    case 'GameFinalized':
      await updateGameState(payload.gameId, {
        status: 'completed',
        winningColor: payload.winningColor
      });
      
      // Update player scores
      for (const player of payload.winners) {
        await recordPlayerScore(player.address, player.score);
      }
      break;
  }
  
  return NextResponse.json({ success: true });
}
