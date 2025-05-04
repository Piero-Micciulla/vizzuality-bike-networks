"use client";

import { Suspense } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { NetworkDetailPageContent } from "@/features/network-detail/network-detail-page-content";
import Loader from "@/components/ui/loader";

const NetworkDetailPage = () => {
  return (
    <main className="bg-torea-800 text-white min-h-screen">
      <PageContainer className="pb-8 lg:pb-0">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-64 gap-2">
              <Loader className="border-white border-t-grenadier-400" />
              <p className="text-sm text-white/80">Loading network details...</p>
            </div>
          }
        >
          <NetworkDetailPageContent />
        </Suspense>
      </PageContainer>
    </main>
  );
};

export default NetworkDetailPage;