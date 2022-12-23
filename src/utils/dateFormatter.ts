import dayjs from 'dayjs'
import 'dayjs/locale/es'
import weekday from 'dayjs/plugin/weekday'
import { FrequencyType } from 'types'

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

export const getPaymentFormat = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY - HH:mm:ss')
}

export const validateDateRange = (date: string, frequency: FrequencyType) => {
  switch (frequency) {
    case FrequencyType.TODAY:
      return dayjs(date).isSame(dayjs(), 'day')

    case FrequencyType.WEEK:
      return dayjs(date).isSame(dayjs(), 'week')

    case FrequencyType.MONTH:
      return dayjs(date).isSame(dayjs(), 'month')

    default:
      return false
  }
}
