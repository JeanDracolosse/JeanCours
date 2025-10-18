import { redirect } from 'react-router'

export function loader() {
    const date = new Date()
    const year = date.getFullYear()

    const startDate = new Date(year, 0, 1)
    const days = Math.floor(
        (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
    )
    const weekNumber = Math.ceil((days + 1) / 7)

    throw redirect(`/weekCharts/${year}/${weekNumber}`)
}
