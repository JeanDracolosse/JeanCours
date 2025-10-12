import type { AxisLabelsFormatterCallbackFunction, AxisLabelsFormatterContextObject, DataLabelsFormatterCallbackFunction, Point } from "highcharts"

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
