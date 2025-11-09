import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

type CardGraficoProps = {
  title: string;
  chartData: number[][];
  color?: string;
  unit?: string;
};

function formatBRL(value: number, unit = "R$"): string {
  return `${unit} ${value
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace("R$", "")
    .trim()}`;
}

export function CardGrafico({
  title,
  chartData,
  color = "rgba(59,130,246,1)",
  unit = "R$",
}: CardGraficoProps) {
  if (!chartData || !chartData[0] || !chartData[1]) return null;
  const labels = chartData[0];
  const data = chartData[1].map((v) => Number(v)); // Garante tipo number!

  return (
    <div className='rounded-2xl shadow-lg bg-white/60 dark:bg-slate-900/50 backdrop-blur-2xl p-4 mb-6'>
      {title && (
        <div className='font-semibold text-slate-700 mb-3'>{title}</div>
      )}
      <div className='lg:w-3xl w-full aspect-video'>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
                borderColor: color,
                backgroundColor: color.replace("1)", "0.12)"),
                fill: true,
                tension: 0.36,
                pointRadius: 2,
                borderWidth: 2,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                callbacks: {
                  label: (ctx) => formatBRL(Number(ctx.raw)),
                },
              },
            },
            responsive: true,
            scales: {
              x: {
                ticks: {
                  color: "#334155", // slate-700
                  font: { size: 12, weight: 600 },
                },
                grid: { color: "rgba(100,116,139,0.1)" },
              },
              y: {
                ticks: {
                  color: "#64748b", // slate-400
                  font: { size: 12, weight: 500 },
                  callback: (value) => formatBRL(Number(value)),
                },
                grid: { color: "rgba(100,116,139,0.09)" },
              },
            },
            animation: { duration: 700 },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export function CardGraficoArea({
  title,
  chartData,
  color = "rgba(0,149,255,1)",
  unit = "R$",
}: CardGraficoProps) {
  if (!chartData || !chartData[0] || !chartData[1]) return null;
  const labels = chartData[0];
  const data = chartData[1].map((v) => Number(v)); // garante ser número
  return (
    <div className='rounded-2xl shadow-xl bg-white/60 dark:bg-slate-900/50 p-4 mb-8 overflow-hidden'>
      <div className='font-semibold text-slate-700 mb-3'>{title}</div>
      <div className='lg:w-3xl w-full aspect-video'>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: title,
                data,
                fill: true,
                backgroundColor: color.replace("1)", "0.1)"),
                borderColor: color,
                pointRadius: 3,
                borderWidth: 3,
                tension: 0.5,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => formatBRL(Number(ctx.raw)),
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => formatBRL(Number(value)),
                  color: "#52525b", // slate-600
                  font: { size: 13, weight: 500 },
                },
                grid: { color: "rgba(100,116,139,0.13)" },
              },
            },
            responsive: true,
            animation: { duration: 800 },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}

export function CardGraficoMinimal({
  title,
  chartData,
  color = "rgba(2,132,199,1)",
  unit = "R$",
}: CardGraficoProps) {
  if (!chartData || !chartData[0] || !chartData[1]) return null;
  const labels = chartData[0];
  const data = chartData[1].map((v) => Number(v));
  return (
    <div className='rounded-xl shadow border border-slate-200/30 px-3 py-2 mb-3 bg-white/45 dark:bg-slate-900/40'>
      <div className='font-semibold text-slate-700 mb-3'>{title}</div>
      <div className='lg:w-3xl w-full aspect-video'>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: "",
                data,
                borderColor: color,
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                tension: 0.18,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => formatBRL(Number(ctx.raw), unit),
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => formatBRL(Number(value), unit),
                  color: "#475569", // slate-500
                  font: { size: 12 },
                },
                grid: { color: "rgba(100,116,139,0.14)" },
              },
            },
            responsive: true,
            animation: { duration: 650 },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}
