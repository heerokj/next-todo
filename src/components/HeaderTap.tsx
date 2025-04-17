import React from "react";

type Prop = {
  filters: string[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};
export default function HeaderTap({ filters, setFilter }: Prop) {
  return (
    <ul className="flex">
      {filters.map((value: string, index: number) => (
        <li key={index}>
          <button onClick={() => setFilter(value)}>{value}</button>
        </li>
      ))}
    </ul>
  );
}
