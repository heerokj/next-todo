"use client";
import HeaderTap from "@/components/HeaderTap";
import TodoList from "@/components/TodoList";
import { useState } from "react";

const filters = ["전체", "완료"];

export default function Home() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <p className="text-2xl font-bold">투두리스트</p>
        <HeaderTap filters={filters} setFilter={setFilter} />
        <TodoList filter={filter} />
      </div>
    </div>
  );
}
