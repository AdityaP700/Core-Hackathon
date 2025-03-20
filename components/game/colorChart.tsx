// components/game/ColorChart.tsx
import { Line } from "react-chartjs-2";

export function ColorChart({ colorHistory }: { colorHistory: string[] }) {
  // Process data for chart
  const labels = Array.from({ length: colorHistory.length }, (_, i) => i + 1);
  const datasets = COLORS.map(color => {
    const data = colorHistory.map(c => c === color ? 1 : 0);
    return {
      label: color,
      data,
      borderColor: color,
      backgroundColor: `${color}33`,
    };
  });
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Color Performance</h3>
      <Line data={{ labels, datasets }} />
    </div>
  );
}
