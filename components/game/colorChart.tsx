// components/game/ColorChart.tsx
import { Line } from "react-chartjs-2";
import { COLORS, calculateOdds, calculateVolatility } from "@/lib/gameLogic";

export function ColorChart({ colorHistory }: { colorHistory: string[] }) {
  // Process price movement data
  const labels = Array.from({ length: colorHistory.length }, (_, i) => i + 1);
  const datasets = COLORS.map(color => {
    const data = colorHistory.map((_, index) => {
      const historySlice = colorHistory.slice(0, index + 1);
      const odds = calculateOdds(color, historySlice);
      const volatility = calculateVolatility(historySlice);
      return odds * (1 + volatility);
    });

    return {
      label: color,
      data,
      borderColor: color,
      backgroundColor: `${color}33`,
      tension: 0.4,
      pointRadius: 2,
      borderWidth: 2,
    };
  });
  
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price Multiplier'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Game Round'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}x`;
          }
        }
      }
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Real-time Market Analysis</h3>
      <Line data={{ labels, datasets }} options={options} />
    </div>
  );
}
