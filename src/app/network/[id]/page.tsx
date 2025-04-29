// src/app/network/[id]/page.tsx
"use client";

import { Suspense } from "react";
import Link from "next/link";
import { NetworkDetailPageContent } from "@/features/network-detail/network-detail-page-content";

const NetworkDetailPage = () => {
  return (
    <main className="container mx-auto py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Networks
      </Link>

      <Suspense fallback={<div>Loading...</div>}>
        <NetworkDetailPageContent />
      </Suspense>
    </main>
  );
};

export default NetworkDetailPage;