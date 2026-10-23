"use client"

import React, { useEffect, useState } from 'react';
import { CountryOfOrigin, useDashboardStore } from '@/app/(utils)/useMetricsStore';
import { data } from 'motion/react-client';

interface Props {
  title?: string;
  data?: CountryOfOrigin[];
}

export default function DemographicMap({ title, data }: Props) {
let demographicMapAggregate = useDashboardStore((state) => state.demographic);
console.log("Demograph Map data to hit UI: ", demographicMapAggregate);


  return (
    <div className="p-4 text-white">
      <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="text-2xl font-bold mt-2">
        <h2>Demographic Map</h2>
        {(demographicMapAggregate ?? []).map((value) => {

        return(
          <p key={value.origin ?? "NaN"}>{value.origin ?? "NaN"}: {value.count ?? 0}</p>
        )})}
      </div>
    </div>
  );
}