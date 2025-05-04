"use client";

import { Suspense } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { HomePageContent } from "@/features/networks/home-page-content";

const HomePage = () => {
  return (
    <main className="bg-white text-zinc-500 min-h-screen">
      <PageContainer className="py-8 lg:py-0">
        <Suspense fallback={<div>Loading...</div>}>
          <HomePageContent />
        </Suspense>
      </PageContainer>
    </main>
  );
};

export default HomePage;