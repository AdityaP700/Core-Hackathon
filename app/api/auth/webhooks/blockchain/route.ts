import { NextResponse } from 'next/server';
import { updateGameState, recordPlayerScore } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    if (!payload.eventName || !payload.gameId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Handle different event types
    switch (payload.eventName) {
      case 'GameCreated':
        await updateGameState(payload.gameId, {
          status: 'created',
          startTime: payload.startTime || Date.now(),
          entryFee: payload.entryFee || '0'
        });
        break;
      
      case 'PlayerJoined':
        await updateGameState(payload.gameId, {
          players: payload.players || 0
        });
        break;
      
      case 'GameFinalized':
        await updateGameState(payload.gameId, {
          status: 'completed',
          winningColor: payload.winningColor
        });
        
        // Update player scores
        if (Array.isArray(payload.winners)) {
          for (const player of payload.winners) {
            if (player.address && typeof player.score !== 'undefined') {
              await recordPlayerScore(player.address, player.score);
            }
          }
        }
        break;

      default:
        return NextResponse.json({ error: 'Unknown event type' }, { status: 400 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
