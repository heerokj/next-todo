"use client";
import HeaderTap from "@/components/HeaderTap";
import TodoList from "@/components/TodoList";
import { useState } from "react";

const filters = ["전체", "완료"];

export default function Home() {
  const [filter, setFilter] = useState(filters[0]);
  return (
    <div>
      <HeaderTap filters={filters} setFilter={setFilter} />
      <TodoList filter={filter} />
    </div>
  );
}
