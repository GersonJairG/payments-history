import dayjs from 'dayjs'
import 'dayjs/locale/es'
import weekday from 'dayjs/plugin/weekday'

dayjs.locale('es')
dayjs.extend(weekday)

export const getCurrentMonth = () => dayjs().format('MMMM')
export const getCurrentMonthYear = () => dayjs().format('MMMM, YYYY')
export const getToday = () => dayjs().format('MMMM DD')
export const getCurrentWeek = () => {
  const firstDayWeek = dayjs().weekday(0)
  const lastDayWeek = dayjs().weekday(6)

  const formatByMonth =
    firstDayWeek.month() === lastDayWeek.month() ? 'DD' : 'MMMM DD'

  return `${firstDayWeek.format('MMMM DD')} - ${lastDayWeek.format(
    formatByMonth
  )}`
}
