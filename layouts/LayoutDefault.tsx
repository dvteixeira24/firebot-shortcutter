import { Toaster } from "@/components/ui/sonner";
import "./style.css";

import "./tailwind.css";

import React from "react";
import { clientOnly } from "vike-react/clientOnly";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className={"w-screen h-screen absolute overflow-x-hidden"}>
        {children}
        <Toaster />
      </main>
    </>
  );
}
