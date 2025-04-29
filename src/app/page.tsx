"use client";

import { Suspense } from "react";
import { HomePageContent } from "@/features/networks/home-page-content";

const HomePage = () => {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Bicycle Networks</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <HomePageContent />
      </Suspense>
    </main>
  );
};

export default HomePage;