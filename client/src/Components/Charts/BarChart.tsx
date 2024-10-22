import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Interface for dataset
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    backgroundColor: string;
    data: number[];
  }[];
}

// Initial Data (for drill-down functionality)
const initialData: ChartData = {
  labels: ["Category 1", "Category 2", "Category 3"],
  datasets: [
    {
      label: "Main Categories",
      backgroundColor: "#3B82F6", // Tailwind color
      data: [15, 20, 30],
    },
  ],
};

// Drill-down Data
const drilldownData: ChartData = {
  labels: ["Sub-Category 1", "Sub-Category 2", "Sub-Category 3"],
  datasets: [
    {
      label: "Sub-categories",
      backgroundColor: "#34D399", // Tailwind color
      data: [5, 10, 15],
    },
  ],
};

const BarChartWithDrilldown: React.FC = () => {
  const [data, setData] = useState<ChartData>(initialData);
  const [isDrilledDown, setIsDrilledDown] = useState(false);

  // Handle bar click event
  const handleBarClick = (elements: any) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;

      // Drill down on the first category
      if (!isDrilledDown && clickedIndex === 0) {
        setData(drilldownData);
        setIsDrilledDown(true);
      } else {
        // Reset the chart when clicked again
        setData(initialData);
        setIsDrilledDown(false);
      }
    }
  };

  const options = {
    responsive: true,
    onClick: (_: any, elements: any) => handleBarClick(elements),
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bar Chart with Drilldown",
      },
    },
    maintainAspectRatio: false, // This will help the chart to fill the given container
  };

  return (
    <div className="w-full mx-auto"> {/* Max width has been increased */}
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <div className="relative h-[500px]"> {/* Adjust the height to make the chart bigger */}
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default BarChartWithDrilldown;
