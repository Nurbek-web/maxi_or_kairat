import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface BarChartProps {
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let chartInstance: Chart | null = null;

    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext("2d");

      if (ctx) {
        // Destroy previous chart instance if exists
        if (chartInstance) {
          chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Cat", "Dog"],
            datasets: [
              {
                label: "Prediction Probability",
                data: data,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)", // Red for Cat
                  "rgba(54, 162, 235, 0.5)", // Blue for Dog
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)", // Red for Cat
                  "rgba(54, 162, 235, 1)", // Blue for Dog
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Prediction Probability (%)",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Class",
                },
              },
            },
          },
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartContainer} className="w-full h-64" />;
};

export default BarChart;
