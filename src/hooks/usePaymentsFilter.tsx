import { useEffect, useState } from 'react'
import { FilterOptions } from 'types'
import { PaymentType, PayType } from 'types/payments'
import { validateDateRange } from 'utils/dateFormatter'

const usePaymentsFilter = (data: PaymentType[], filters?: FilterOptions) => {
  const [dataFiltered, setDataFiltered] = useState<PaymentType[]>([])
  const [totalAmount, setTotalAmount] = useState<number>(0)

  useEffect(() => {
    filter(data, filters)
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

  return {
    dataFiltered,
    totalAmount,
  }
}

export default usePaymentsFilter
