"use client";

import Link from "next/link";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { formatCompaniesDisplay } from "@/lib/utils";
import { Network } from "@/types/network";

type Props = {
  network: Network;
};

const NetworkCard = ({ network }: Props) => {
  const { displayed, remainingCount } = formatCompaniesDisplay(network.company);

  return (
    <li className="network-container group">
      <Link href={`/network/${network.id}`}>
        <div className="network-inner-container">
          <div className="network-inner-top">
            <h2 className="network-heading">{network.name}</h2>

            <div className="network-data">
              <div className="network-icon-container">
                <MapPin className="size-4" />
              </div>

              <p>
                {network.location.city}, {network.location.country}
              </p>
            </div>
            <div className="network-data">
              <div className="network-icon-container">
                <Briefcase className="size-4" />
              </div>

              <p className="network-companies-display">
                {displayed.join(", ")}
              </p>
              {remainingCount > 0 && (
                <span className="network-count-container">
                  +{remainingCount}
                </span>
              )}
            </div>
          </div>

          <div className="network-inner-bottom">
            <button className="network-details-button">
              <span className="network-details-text">Details</span>
              <ArrowRight className="size-4 min-w-4" />
            </button>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NetworkCard;
