import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./index.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import OverviewPage from "./OverviewPage";
import LogPage from "./LogPage";  // 先頭でインポートを忘れずに

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const PARAMS_INFO = [
  { key: "reload", name: "Reload Speed" },
  { key: "resist", name: "Damage Resist" },
  { key: "recoil", name: "Recoil Control" },
  { key: "move", name: "Move Speed" },
  { key: "accel", name: "Acceleration" },
];

const BASE_VALUE = 50;
const MAX_VALUE = 99;
const TOTAL_POINTS = 139;

function MainPage() {
  const [parameters, setParameters] = useState(
    PARAMS_INFO.map((p) => ({ ...p, value: BASE_VALUE }))
  );
  const [builds, setBuilds] = useState([]);
  const [newBuildName, setNewBuildName] = useState("");

  const totalAllocated = parameters.reduce(
    (sum, p) => sum + (p.value - BASE_VALUE),
    0
  );
  const remainingPoints = TOTAL_POINTS - totalAllocated;

  const updateParameter = (index, newValue) => {
    const updated = [...parameters];
    updated[index].value = newValue;
    setParameters(updated);
  };

  const saveBuild = () => {
    if (!newBuildName.trim()) return;
    const updatedBuilds = [...builds, { name: newBuildName, params: parameters }];
    setBuilds(updatedBuilds);
    localStorage.setItem("kompete-builds", JSON.stringify(updatedBuilds));
    setNewBuildName("");
  };

  const loadBuild = (build) => {
    setParameters(build.params);
  };

  const shareURL = () => {
    const query = parameters.map((p) => `${p.key}=${p.value}`).join("&");
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    navigator.clipboard.writeText(url);
    alert("Shareable link copied to clipboard!");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size > 0) {
      const loaded = PARAMS_INFO.map((p) => {
        const val = parseInt(params.get(p.key)) || BASE_VALUE;
        return {
          ...p,
          value: Math.min(Math.max(BASE_VALUE, val), MAX_VALUE),
        };
      });
      setParameters(loaded);
    }
    const savedBuilds = JSON.parse(localStorage.getItem("kompete-builds")) || [];
    setBuilds(savedBuilds);
  }, []);

  const data = {
    labels: parameters.map((p) => p.name),
    datasets: [
      {
        label: "Stat Allocation",
        data: parameters.map((p) => p.value),
        backgroundColor: "rgba(0, 255, 255, 0.2)",
        borderColor: "cyan",
        pointBackgroundColor: "white",
        pointBorderColor: "cyan",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 99,
        ticks: { stepSize: 20, color: "#fff" },
        pointLabels: {
          color: "#fff",
          font: { size: 14, family: "Roboto" },
        },
        grid: { color: "#444" },
        angleLines: { color: "#444" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#fff" },
      },
    },
  };

  return (
    <>
      <div className="bg-red-500 text-white p-2">Tailwind OK?</div>
      <div className="bg-red-500 text-white text-xl p-4">Tailwind Check</div>
      <h1 className="text-white text-center text-3xl font-bold mt-6 mb-4">
        KOMPETE stat allocater
      </h1>

      <div className="flex flex-col landscape:flex-row w-full max-w-screen-lg mx-auto p-4">
        <div className="w-full landscape:w-1/2 p-2">
          {parameters.map((p, index) => (
            <div key={p.key} className="flex items-center justify-center mb-2">
              <div className="w-32 text-right mr-2">{p.name}</div>
              <input
                type="range"
                min={BASE_VALUE}
                max={MAX_VALUE}
                value={p.value}
                onChange={(e) => updateParameter(index, parseInt(e.target.value))}
                className="flex-grow mx-2"
                style={{ maxWidth: "35%" }}
              />
              <div className="w-10 text-left">{p.value}</div>
            </div>
          ))}
          <p className="text-center mt-2">Remaining Points: {remainingPoints}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-4 gap-2">
            <input
              type="text"
              placeholder="Build Name"
              value={newBuildName}
              onChange={(e) => setNewBuildName(e.target.value)}
              className="text-black px-2 py-1 rounded"
            />
            <button
              onClick={saveBuild}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Save Build
            </button>
            <button
              onClick={shareURL}
              className="bg-green-500 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Share Build
            </button>
          </div>

          <div className="mt-4 text-center">
            <h2 className="text-xl mb-2">Saved Builds</h2>
            {builds.map((b, i) => (
              <button
                key={i}
                onClick={() => loadBuild(b)}
                className="bg-gray-600 px-3 py-1 rounded mb-1 text-left w-full"
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full landscape:w-1/2 p-2 flex justify-center items-center h-[400px]">
          <Radar data={data} options={options} />
        </div>
      </div>

      <footer className="mt-8 bg-gray-800 text-white p-4">
        <div className="flex flex-wrap justify-between items-center text-sm max-w-screen-md mx-auto">
          <div className="flex flex-col items-start gap-1">
            <Link to="/overview" className="hover:underline">overview</Link>
            <a href="/docs/old-data/backup.md" className="hover:underline">backup</a>
          </div>
          <div className="text-center w-full my-2">
            <a href="/index.html" className="text-lg font-bold underline">index</a>
          </div>
          <div className="flex flex-col items-end gap-1">
            <a href="/docs/guide.md" className="hover:underline">guide</a>
            <a href="/docs/notes.md" className="hover:underline">notes</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/log" element={<LogPage />} />  {/* ここに追加 */}
      </Routes>
    </Router>
  );
}
