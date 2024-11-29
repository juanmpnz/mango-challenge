"use client";
// Hooks
import { useState } from "react";
// Providers
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Provider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
