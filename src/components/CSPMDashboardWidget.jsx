import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CSPMDashboardWidget = ({ title, data, colors, onRemove }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative p-4 border rounded bg-white shadow-sm flex flex-col">
      {/* Cross button */}
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        ×
      </button>

      <h3 className="font-semibold mb-4">{title}</h3>

      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="w-28 h-28 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={55}
                dataKey="value"
                startAngle={180}
                endAngle={-180}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold">{total}</span>
            <span className="text-xs text-gray-500">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col space-y-2 ml-6">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: colors[idx] }}
              />
              <span className="text-sm">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSPMDashboardWidget;
