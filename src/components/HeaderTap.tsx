import React from "react";

type Prop = {
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};
export default function HeaderTap({ filters, setFilter }: Prop) {
  return (
    <ul className="flex border-b-2">
      {filters.map((value: string, index: number) => (
        <li key={index}>
          <button
            onClick={() => setFilter(value)}
            className={`border-1 border-b-0 border-gray-400 p-1 px-3 mr-2 text-white ${
              value === "전체"
                ? ` bg-green-800 hover:bg-green-700`
                : `bg-gray-800 hover:bg-gray-700`
            }`}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}
