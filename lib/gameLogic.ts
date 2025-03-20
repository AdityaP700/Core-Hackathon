// lib/gameLogic.ts
export const COLORS = ["red", "blue", "green", "yellow", "purple", "orange"];

const TRANSITION_MATRIX = [
  [0.1, 0.3, 0.2, 0.2, 0.1, 0.1],  // From red
  [0.2, 0.1, 0.3, 0.2, 0.1, 0.1],  // From blue
  [0.2, 0.2, 0.1, 0.3, 0.1, 0.1],  // From green
  [0.1, 0.2, 0.2, 0.1, 0.3, 0.1],  // From yellow
  [0.1, 0.1, 0.2, 0.2, 0.1, 0.3],  // From purple
  [0.3, 0.1, 0.1, 0.2, 0.2, 0.1],  // From orange
];

export function getNextColor(currentColor: string): string {
  const currentIndex = COLORS.indexOf(currentColor);
  const probabilities = TRANSITION_MATRIX[currentIndex];
  
  const random = Math.random();
  let cumulativeProbability = 0;
  
  for (let i = 0; i < COLORS.length; i++) {
    cumulativeProbability += probabilities[i];
    if (random < cumulativeProbability) {
      return COLORS[i];
    }
  }
  
  return COLORS[0]; // Fallback
}
// lib/gameLogic.ts
export function calculateOdds(color: string, colorHistory: string[]): number {
    // Count occurrences of each color
    const colorCounts: Record<string, number> = {};
    COLORS.forEach(c => colorCounts[c] = 0);
    colorHistory.forEach(c => colorCounts[c]++);
    
    // Calculate probability based on historical data
    const totalGames = colorHistory.length;
    const colorProbability = totalGames > 0 ? colorCounts[color] / totalGames : 1/COLORS.length;
    
    // Convert probability to odds (lower probability = higher payout)
    return Math.max(1.5, Math.round((1 / colorProbability) * 10) / 10);
  }
  // lib/gameLogic.ts
export function getHotAndColdColors(colorHistory: string[]): { hot: string[], cold: string[] } {
    const colorCounts: Record<string, number> = {};
    COLORS.forEach(c => colorCounts[c] = 0);
    
    // Count recent occurrences (last 10 games)
    const recentHistory = colorHistory.slice(-10);
    recentHistory.forEach(c => colorCounts[c]++);
    
    // Sort colors by frequency
    const sortedColors = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1]);
    
    return {
      hot: [sortedColors[0][0], sortedColors[1][0]],
      cold: [sortedColors[sortedColors.length-1][0], sortedColors[sortedColors.length-2][0]]
    };
  }
  