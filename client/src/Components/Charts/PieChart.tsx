import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Interface for the customizable chart data
interface PieChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor?: string[];
  }[];
}

// Initial data and colors for the Pie chart
const initialPieData: PieChartData = {
  labels: ["Category 1", "Category 2", "Category 3"],
  datasets: [
    {
      label: "Categories",
      data: [30, 40, 30],
      backgroundColor: ["#34D399", "#3B82F6", "#F87171"], // Tailwind CSS colors
      hoverBackgroundColor: ["#10B981", "#2563EB", "#EF4444"], // Different colors on hover
    },
  ],
};

// PieChart component
const PieChart: React.FC = () => {
  const [data, setData] = useState<PieChartData>(initialPieData);

  // Method to dynamically update the Pie chart data (you can modify this as per your needs)
  const updateData = () => {
    const newData = {
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: [Math.random() * 100, Math.random() * 100, Math.random() * 100], // Generate random data
        },
      ],
    };
    setData(newData);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill its container
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Customizable Pie Chart",
      },
    },
  };

  return (
    <div className="max-w-3xl mx-auto p-8 ">
      <div className="relative h-[400px]"> {/* Chart size */}
        <Pie data={data} options={options} />
      </div>
      {/* Button to update data */}
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg"
          onClick={updateData}
        >
          Update Data
        </button>
      </div>
    </div>
  );
};

export default PieChart;
