// lib/websocket/gameWebSocket.ts
import { ethers } from 'ethers';
import { getCoreProvider } from '../coreBlockchain';
import { getColorTradingContract } from '../contracts/colorTrading';

export class GameWebSocketService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private subscribers: Map<string, Set<(data: any) => void>>;

  constructor() {
    this.provider = getCoreProvider();
    this.contract = getColorTradingContract();
    this.subscribers = new Map();
    this.initializeEventListeners();
  }

  private initializeEventListeners() {
    // Listen for game creation events
    this.contract.on('GameCreated', (gameId: number, startTime: number) => {
      this.notifySubscribers('gameCreated', { gameId, startTime });
    });

    // Listen for player join events
    this.contract.on('PlayerJoined', (gameId: number, player: string, color: string) => {
      this.notifySubscribers('playerJoined', { gameId, player, color });
    });

    // Listen for game finalization events
    this.contract.on('GameFinalized', (gameId: number, winningColor: string) => {
      this.notifySubscribers('gameFinalized', { gameId, winningColor });
    });
  }

  public subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)?.add(callback);
  }

  public unsubscribe(event: string, callback: (data: any) => void) {
    this.subscribers.get(event)?.delete(callback);
  }

  private notifySubscribers(event: string, data: any) {
    this.subscribers.get(event)?.forEach(callback => callback(data));
  }

  public async getGameState(gameId: number) {
    try {
      const game = await this.contract.games(gameId);
      return {
        id: game.id.toString(),
        startTime: game.startTime.toNumber(),
        entryFee: ethers.utils.formatEther(game.entryFee),
        isFinalized: game.isFinalized,
        winningColor: game.winningColor
      };
    } catch (error) {
      console.error('Error fetching game state:', error);
      throw error;
    }
  }

  public async getActiveGames() {
    try {
      const gameCounter = await this.contract.gameCounter();
      const activeGames = [];

      for (let i = gameCounter.toNumber(); i > 0; i--) {
        const game = await this.getGameState(i);
        if (!game.isFinalized && game.startTime > Date.now() / 1000) {
          activeGames.push(game);
        }
        if (activeGames.length >= 5) break; // Limit to 5 active games
      }

      return activeGames;
    } catch (error) {
      console.error('Error fetching active games:', error);
      throw error;
    }
  }
}

export const gameWebSocketService = new GameWebSocketService();