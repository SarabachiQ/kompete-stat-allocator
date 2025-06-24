import React, { useState, useEffect } from "react";

const PARAMS = [
  "Reload Speed",
  "Recoil Reduction",
  "Damage Reduction",
  "Acceleration",
  "Speed",
];
const MAX_VALUE = 99;
const MEMORY_STEP = 10;
const POINTS_TOTAL = 139;

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function RadarChart({ values }) {
  const centerX = 150;
  const centerY = 150;
  const radius = 120;
  const angleStep = (2 * Math.PI) / PARAMS.length;

  // 軸のポイント計算
  const points = PARAMS.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const val = clamp(values[i], 0, MAX_VALUE);
    const r = (val / MAX_VALUE) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // メモリライン
  const memoryLines = [];
  for (let v = MEMORY_STEP; v <= MAX_VALUE; v += MEMORY_STEP) {
    const r = (v / MAX_VALUE) * radius;
    const linePoints = PARAMS.map((_, i) => {
      const angle = -Math.PI / 2 + i * angleStep;
      return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle),
      };
    });
    const path = linePoints
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
      .join(" ") + " Z";
    memoryLines.push(
      <path
        key={`memory-line-${v}`}
        d={path}
        stroke="#444"
        strokeWidth="1"
        fill="none"
      />
    );
  }

  // ラベル表示 (20, 40, 60, 80, 99)
  const labels = [20, 40, 60, 80, 99];
  const labelElements = labels.map((val) => {
    const r = (val / MAX_VALUE) * radius;
    const labelX = centerX + r * Math.cos(-Math.PI / 2) - 10;
    const labelY = centerY + r * Math.sin(-Math.PI / 2) - 5;
    return (
      <text
        key={`label-${val}`}
        x={labelX}
        y={labelY}
        fill="#888"
        fontSize="10"
        fontWeight="bold"
      >
        {val}
      </text>
    );
  });

  return (
    <svg
      width={300}
      height={300}
      viewBox="0 0 300 300"
      className="mx-auto"
      aria-label="Radar Chart"
    >
      {/* メモリの五角形 */}
      {memoryLines}

      {/* 軸線 */}
      {PARAMS.map((_, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return (
          <line
            key={`axis-line-${i}`}
            x1={centerX}
            y1={centerY}
            x2={x}
            y2={y}
            stroke="#666"
            strokeWidth="1"
          />
        );
      })}

      {/* パラメーターポイントの線 */}
      <polygon
        points={polygonPoints}
        fill="rgba(16, 185, 129, 0.5)" // emerald-500半透明
        stroke="rgb(5, 150, 105)" // emerald-700
        strokeWidth="2"
      />

      {/* パラメーターポイントの丸 */}
      {points.map((p, i) => (
        <circle
          key={`point-${i}`}
          cx={p.x}
          cy={p.y}
          r={6}
          fill="rgb(5, 150, 105)" // emerald-700
          stroke="#fff"
          strokeWidth="1"
        />
      ))}

      {/* パラメータ名ラベル */}
      {PARAMS.map((label, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const x = centerX + (radius + 20) * Math.cos(angle);
        const y = centerY + (radius + 20) * Math.sin(angle);
        return (
          <text
            key={`param-label-${i}`}
            x={x}
            y={y}
            fill="white"
            fontSize="12"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {label}
          </text>
        );
      })}

      {/* メモリ値ラベル（中央上部にまとめて表示） */}
      {labels.map((val, i) => {
        const spacing = 20;
        return (
          <text
            key={`top-label-${val}`}
            x={centerX - 100 + i * spacing}
            y={20}
            fill="#888"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {val}
          </text>
        );
      })}
    </svg>
  );
}

export default function StatAllocator({ isLandscape }) {
  const [values, setValues] = useState(new Array(PARAMS.length).fill(50));
  const [savedSets, setSavedSets] = useState(() => {
    const saved = localStorage.getItem("savedSets");
    return saved ? JSON.parse(saved) : [];
  });

  const totalPoints = values.reduce((a, b) => a + b, 0);
  const remaining = POINTS_TOTAL - totalPoints;

  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    localStorage.setItem("savedSets", JSON.stringify(savedSets));
  }, [savedSets]);

  function updateValue(index, val) {
    const newValues = [...values];
    newValues[index] = clamp(val, 0, MAX_VALUE);
    setValues(newValues);
  }

  function saveCurrentSet() {
    if (!saveName.trim()) return;
    setSavedSets([...savedSets, { name: saveName.trim(), values }]);
    setSaveName("");
  }

  function loadSet(valuesToLoad) {
    setValues(valuesToLoad);
  }

  return (
    <div
      className={`flex flex-col ${
        isLandscape ? "flex-row" : "flex-col"
      } items-center gap-4 max-w-5xl w-full`}
    >
      {/* スライダー群 */}
      <div
        className={`flex flex-col gap-6 ${
          isLandscape ? "w-1/4" : "w-2/5"
        }`}
      >
        {PARAMS.map((param, i) => (
          <div key={param}>
            <label
              htmlFor={`slider-${i}`}
              className="block mb-1 font-semibold text-white"
            >
              {param}: {values[i]}
            </label>
            <input
              id={`slider-${i}`}
              type="range"
              min="0"
              max={MAX_VALUE}
              step="1"
              value={values[i]}
              onChange={(e) => updateValue(i, Number(e.target.value))}
              className="w-full accent-emerald-500 rounded-lg"
              style={{
                width: isLandscape ? "25vw" : "40vw",
              }}
            />
          </div>
        ))}

        {/* 残りポイント表示 */}
        <div
          className={`mt-4 font-bold ${
            remaining < 0 ? "text-red-500" : "text-emerald-400"
          }`}
        >
          {remaining >= 0
            ? `139 points available`
            : `Over allocated by ${-remaining} points`}
        </div>

        {/* 保存機能 */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Save name"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            className="px-2 py-1 rounded text-black w-full"
          />
          <button
            onClick={saveCurrentSet}
            disabled={!saveName.trim()}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded disabled:opacity-50"
          >
            Save Build
          </button>
        </div>

        {/* 保存セットの一覧 */}
        <div className="mt-6 space-y-2 max-h-48 overflow-y-auto">
          {savedSets.map((set, idx) => (
            <button
              key={idx}
              onClick={() => loadSet(set.values)}
              className="w-full text-left bg-emerald-800 hover:bg-emerald-700 text-white py-2 px-3 rounded"
            >
              {set.name}
            </button>
          ))}
        </div>
      </div>

      {/* グラフ */}
      <div className={`${isLandscape ? "w-3/4" : "w-full"} flex justify-center`}>
        <RadarChart values={values} />
      </div>
    </div>
  );
}
