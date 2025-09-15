import React from "react";
import { LineChart } from "lucide-react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CWPPDashboardWidget = ({ title, data, onRemove }) => {
  const hasData = data && data.length > 0;

  return (
    <div className="relative p-4 border rounded bg-white shadow-sm flex flex-col">
      {/* Title & Remove button */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-sm text-gray-700">{title}</h3>
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 text-lg"
        >
          ×
        </button>
      </div>

      {/* Card body */}
      <div className="flex flex-col items-center justify-center flex-1 mt-6">
        {hasData ? (
          <ResponsiveContainer width="100%" height={200}>
            <ReLineChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={false}
              />
            </ReLineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <LineChart size={36} strokeWidth={2} />
            <span className="mt-2 text-sm">No Graph Data Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CWPPDashboardWidget;
