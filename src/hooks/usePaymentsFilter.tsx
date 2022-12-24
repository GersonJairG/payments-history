import { useEffect, useState } from 'react'
import { FilterOptions, FrequencyType } from 'types'
import { PaymentType, PayType } from 'types/payments'
import {
  getCurrentMonth,
  getCurrentMonthYear,
  getCurrentWeek,
  getToday,
  validateDateRange,
} from 'utils/dateFormatter'

const usePaymentsFilter = (data: PaymentType[], filters?: FilterOptions) => {
  const [dataFiltered, setDataFiltered] = useState<PaymentType[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  const [summaryTitle, setSummaryTitle] = useState<string>('')
  const [tableTitle, setTableTitle] = useState<string>('')
  const [summarySubtitle, setSummarySubtitle] = useState<string>('')

  useEffect(() => {
    filter(data, filters)
    getTitles(filters)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  function filter(payments: PaymentType[], selectedFilters?: FilterOptions) {
    if (!selectedFilters) {
      return payments
    }
    const { frequency, paymentTypes } = selectedFilters

    const filteredByFrequency = payments.filter((item) => {
      return validateDateRange(item.date, frequency)
    })

    // Si no existe al menos un true, todos los type seran validos,
    // Si hay algun true, se validará si es el type del item
    const totallyFiltered = filteredByFrequency.filter((item) => {
      return (
        !Object.values(paymentTypes).some((value) => value) ||
        Object.keys(paymentTypes)
          .filter((option) => paymentTypes[option as PayType])
          .includes(item.type)
      )
    })

    const totalAmountResult = getTotalAmount(filteredByFrequency)

    setTotalAmount(totalAmountResult)
    setDataFiltered(totallyFiltered)
  }

  function getTotalAmount(data: PaymentType[]) {
    return data.reduce((acc, current) => (acc += current.amount), 0)
  }

  function getTitles(selectedFilters?: FilterOptions) {
    const currentMonth = getCurrentMonth()

    switch (selectedFilters?.frequency) {
      case FrequencyType.TODAY:
        setSummaryTitle('Total de ventas de hoy')
        setTableTitle('Tus ventas de hoy')
        setSummarySubtitle(getToday())
        break

      case FrequencyType.WEEK:
        setSummaryTitle('Total de ventas de esta semana')
        setTableTitle('Tus ventas de esta semana')
        setSummarySubtitle(getCurrentWeek())
        break

      case FrequencyType.MONTH:
        setSummaryTitle(`Total de ventas de ${currentMonth}`)
        setTableTitle(`Tus ventas de ${currentMonth}`)
        setSummarySubtitle(getCurrentMonthYear())
        break
    }
  }

  return {
    dataFiltered,
    totalAmount,
    summaryTitle,
    summarySubtitle,
    tableTitle,
  }
}

export default usePaymentsFilter
