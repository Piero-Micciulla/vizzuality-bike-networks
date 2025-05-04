"use client";

import { Suspense } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { NetworkDetailPageContent } from "@/features/network-detail/network-detail-page-content";

const NetworkDetailPage = () => {
  return (
    <main className="bg-torea-800 text-white min-h-screen">
      <PageContainer className="pb-8 lg:pb-0">
        <Suspense fallback={<div>Loading...</div>}>
          <NetworkDetailPageContent />
        </Suspense>
      </PageContainer>
    </main>
  );
};

export default NetworkDetailPage;