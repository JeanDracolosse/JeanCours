import { redirect } from "react-router";
import { weekChartsPath } from "~/utils/isoWeek";

export function loader() {
  throw redirect(weekChartsPath(new Date()));
}
