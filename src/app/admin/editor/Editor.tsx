"use client";

import { Puck, type Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";
import { config } from "@/puck/config";
import { savePage } from "./actions";

export function Editor({ initialData }: { initialData: Data }) {
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="h-screen">
      {msg && (
        <div className="fixed left-1/2 top-3 z-[9999] -translate-x-1/2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {msg}
        </div>
      )}
      <Puck
        config={config}
        data={initialData}
        onPublish={async (data) => {
          const res = await savePage("home", data);
          setMsg(res.error ? `Error: ${res.error}` : "¡Página publicada!");
          setTimeout(() => setMsg(null), 2500);
        }}
      />
    </div>
  );
}
