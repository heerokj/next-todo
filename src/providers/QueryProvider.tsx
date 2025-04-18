"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function QueryProvider({ children }: ProvidersProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
