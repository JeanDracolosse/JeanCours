import { type AxisLabelsFormatterCallbackFunction, type AxisLabelsFormatterContextObject, type DataLabelsFormatterCallbackFunction, type Point } from "highcharts"

export const dateFormatter: AxisLabelsFormatterCallbackFunction = function (this: AxisLabelsFormatterContextObject): string {
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }).format(Date.parse(this.value.toString()));
}

export const meterFormatter: AxisLabelsFormatterCallbackFunction = function (this: AxisLabelsFormatterContextObject): string {
  return this.value + "m"
}

export const kilometerFormatter: AxisLabelsFormatterCallbackFunction = function (this: AxisLabelsFormatterContextObject): string {
  return ((typeof this.value === "number" ? this.value : 0) / 1000) + "km"
}

export const meterDataLabelFormatter: DataLabelsFormatterCallbackFunction = function (this: Point): string {
  if (!this.index) {
    if (this.index === 0 && this.series.data[0].y) {
      return Math.round(this.series.data[0].y) + "m"
    }
    return ''
  }
  const previousValue = this.series.data[this.index - 1].y;
  const currentValue = this.series.data[this.index].y;
  if (!currentValue || !previousValue) {
    if (currentValue) {
      return Math.round(currentValue) + "m"
    }
    return ''
  }
  return Math.round(currentValue) + "m (" + (currentValue - previousValue > 0 ? "+" : "") + Math.round(100 * (currentValue - previousValue) / previousValue) + "%)"
}

export const kilometerDataLabelFormatter: DataLabelsFormatterCallbackFunction = function (this: Point): string {
  if (!this.index) {
    if (this.index === 0 && this.series.data[0].y) {
      return Math.round(this.series.data[0].y / 1000) + "km"
    }
    return ''
  }
  const previousValue = this.series.data[this.index - 1].y;
  const currentValue = this.series.data[this.index].y;
  if (!currentValue || !previousValue) {
    if (currentValue) {
      return Math.round(currentValue / 1000) + "km"
    }
    return ''
  }
  return Math.round(currentValue / 1000) + "km (" + (currentValue - previousValue > 0 ? "+" : "") + Math.round(100 * (currentValue - previousValue) / previousValue) + "%)"

}


export const defaultDataLabelFormatter: DataLabelsFormatterCallbackFunction = function (this: Point): string {
  if (this.index !== undefined && this.series.data[this.index].y !== undefined) {
    return Math.round(this.series.data[this.index].y || 0)?.toString() || ''
  }
  return ''
}



export function getSerieFormatterByType(serieType?: string): DataLabelsFormatterCallbackFunction {
  switch (serieType) {
    case "km":
      return kilometerDataLabelFormatter
    case "m":
      return meterDataLabelFormatter
    default:
      return defaultDataLabelFormatter;
  }
}