
import { useLoaderData } from "react-router";
import DistanceChart from "~/components/distanceChart";
import HrTImeInZoneChart from "~/components/hrTImeInZoneChart";
import { DistanceType, HrInTimeZoneType } from "~/interfaces";
import { getDistance, getHrTimeInZone, getIndex } from "~/utils/mongo";


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
    <div>
      <HrTImeInZoneChart index={index} hrTimeInZone={hrTimeInZone} />
      <DistanceChart index={index} distance={distance} />
    </div>
  );
}
