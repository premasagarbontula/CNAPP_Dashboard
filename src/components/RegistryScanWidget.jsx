import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const RegistryScanWidget = ({
  title,
  totalLabel,
  totalValue,
  states,
  onRemove,
}) => {
  const total = states.reduce((sum, s) => sum + s.value, 0);
  const data = [
    states.reduce((acc, s) => ({ ...acc, [s.name]: s.value, row: "all" }), {}),
  ];

  return (
    <div className="relative p-4 border rounded bg-white shadow-sm flex flex-col">
      {/* Title & Total */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">
            {totalValue}{" "}
            <span className="text-sm text-gray-500">{totalLabel}</span>
          </span>
          <button
            onClick={onRemove}
            className="text-gray-400 hover:text-red-500 text-lg"
          >
            ×
          </button>
        </div>
      </div>

      {/* Horizontal bar */}
      <div className="w-full h-6 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barSize={20}
          >
            <XAxis type="number" hide domain={[0, total]} />
            <YAxis type="category" dataKey="row" hide />
            {states.map((s, idx) => (
              <Bar
                key={s.name}
                dataKey={s.name}
                stackId="a"
                fill={s.color}
                radius={
                  idx === 0
                    ? [10, 0, 0, 10]
                    : idx === states.length - 1
                    ? [0, 10, 10, 0]
                    : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-1 flex flex-wrap gap-x-8 gap-y-2">
        {states.map((s) => (
          <div key={s.name} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-sm">
              {s.name} ({s.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistryScanWidget;
