"use client";

import dynamic from "next/dynamic";

const Main = dynamic(() => import("@/module/main/main").then(m => m.Main), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Main />
    </div>
  );
}
