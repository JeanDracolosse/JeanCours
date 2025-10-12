
import { useLoaderData } from "react-router";

import { ClientOnly } from 'remix-utils/client-only';
import HrTimeInZoneChart from "~/components/hrTImeInZoneChart";
import DistanceChart from "~/components/distanceChart";
import type { HrInTimeZoneType, DistanceType } from "~/interfaces";
import { getHrTimeInZone, getDistance, getIndex } from "~/utils/mongo";

export async function loader() {
  const hrTimeInZone = await getHrTimeInZone();
  const distance = await getDistance()
  const index = await getIndex()

  return { hrTimeInZone, distance, index };
}

export default function Home() {
  const { hrTimeInZone, distance, index } = useLoaderData() as {
    hrTimeInZone: HrInTimeZoneType;
    distance: DistanceType;
    index: string[];
  }

  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => (
        <div>
          <HrTimeInZoneChart index={index} hrTimeInZone={hrTimeInZone} />
          <DistanceChart index={index} distance={distance} />
        </div>
      )}
    </ClientOnly>

  );
}
