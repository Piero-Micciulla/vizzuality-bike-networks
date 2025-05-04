"use client";

import { Suspense } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { HomePageContent } from "@/features/networks/home-page-content";
import Loader from "@/components/ui/loader";

const HomePage = () => {
  return (
    <main className="bg-white text-zinc-500 min-h-screen">
      <PageContainer className="py-8 lg:py-0">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-64 gap-2">
              <Loader className="border-white border-t-grenadier-400" />
              <p className="text-sm text-zinc-500">Loading home content...</p>
            </div>
          }
        >
          <HomePageContent />
        </Suspense>
      </PageContainer>
    </main>
  );
};

export default HomePage;