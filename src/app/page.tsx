import MainPage from "@/components/main/MainPage";
import React, {Suspense} from "react";

export default function Home() {
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-full w-[100%]">
      <MainPage />

      </div>
    </Suspense>
  )
}
