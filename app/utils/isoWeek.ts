// ISO 8601 weeks, as used by the backend. All dates are handled in UTC.

const DAY_MS = 24 * 60 * 60 * 1000;

export type IsoWeek = { year: number; week: number };

function toUtcDay(date: Date | string): Date {
  if (typeof date === "string") {
    const [year, month, day] = date.slice(0, 10).split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day));
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function toIsoWeek(date: Date | string): IsoWeek {
  const day = toUtcDay(date);
  const weekday = day.getUTCDay() || 7;
  // The Thursday of the same week decides the ISO year.
  const thursday = new Date(day.getTime() + (4 - weekday) * DAY_MS);
  const year = thursday.getUTCFullYear();
  const week = Math.ceil(((thursday.getTime() - Date.UTC(year, 0, 1)) / DAY_MS + 1) / 7);
  return { year, week };
}

export function isoWeekMonday(year: number, week: number): Date {
  // January 4th is always in ISO week 1.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const week1Monday = jan4.getTime() - ((jan4.getUTCDay() || 7) - 1) * DAY_MS;
  return new Date(week1Monday + (week - 1) * 7 * DAY_MS);
}

export function shiftIsoWeek(year: number, week: number, delta: number): IsoWeek {
  return toIsoWeek(new Date(isoWeekMonday(year, week).getTime() + delta * 7 * DAY_MS).toISOString());
}

export function weekChartsPath(date: Date | string): string {
  const { year, week } = toIsoWeek(date);
  return `/weekCharts/${year}/${week}`;
}
