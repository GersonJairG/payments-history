import { renderHook } from '@testing-library/react'
import dayjs from 'dayjs'

import { FilterOptions, FrequencyType } from 'types'
import { PaymentType, PayProvider, PayType, StatusType } from 'types/payments'
import { getCurrentMonth, getCurrentMonthYear, getToday, getCurrentWeek } from 'utils/dateFormatter'
import usePaymentsFilter from './usePaymentsFilter'

describe('Payments Filter Custom Hook', () => {
  let currentMonth: string
  let currentMonthYear: string
  let data: PaymentType[]
  let total: number;

  beforeEach(() => {
    currentMonth = getCurrentMonth()
    currentMonthYear = getCurrentMonthYear()
  })

  test('calculate without data with month frequency', async () => {
    data = []
    const filters: FilterOptions = {
      frequency: FrequencyType.MONTH,
      paymentTypes: {},
    }

    const { result: { current } } = renderHook(() => usePaymentsFilter(data, filters))
    const { summaryTitle , summarySubtitle, tableTitle, totalAmount } = current;

    expect(summaryTitle).toBe(
      `Total de ventas de ${currentMonth}`
    )
    expect(summarySubtitle).toBe(`${currentMonthYear}`)
    expect(tableTitle).toBe(`Tus ventas de ${currentMonth}`)
    expect(totalAmount).toBe(0);
  })

  test('calculate with data with month frequency', async () => {
    const filters: FilterOptions = {
      frequency: FrequencyType.MONTH,
      paymentTypes: {},
    }

    data = [
      {
        status: StatusType.SUCCEEDED,
        type: PayType.DATAPHONE,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 7711,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV1',
        amount: 25000,
        deduction: 1500,
      },
      {
        status: StatusType.FAILED,
        type: PayType.DATAPHONE,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.VISA,
        },
        id: 'GZEN23784UBV2',
        amount: 15000,
        deduction: 0,
      },
      {
        status: StatusType.SUCCEEDED,
        type: PayType.LINK,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV3',
        amount: 25000,
        deduction: 1500,
      }
    ]
    total = data.reduce((prev, current) => {
      return prev += current.amount
    }, 0)

    const { result: { current } } = renderHook(() => usePaymentsFilter(data, filters))
    const { summaryTitle , summarySubtitle, tableTitle, totalAmount } = current;

    expect(summaryTitle).toBe(
      `Total de ventas de ${currentMonth}`
    )
    expect(summarySubtitle).toBe(`${currentMonthYear}`)
    expect(tableTitle).toBe(`Tus ventas de ${currentMonth}`)
    expect(totalAmount).toBe(total)
  })

  test('calculate with data with today frequency', async () => {
    const filters: FilterOptions = {
      frequency: FrequencyType.TODAY,
      paymentTypes: {},
    }

    data = [
      {
        status: StatusType.SUCCEEDED,
        type: PayType.DATAPHONE,
        date: "2021-12-22 23:45:28",
        method: {
          type: 'card',
          numberCard: 7711,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV1',
        amount: 25000,
        deduction: 1500,
      },
      {
        status: StatusType.FAILED,
        type: PayType.DATAPHONE,
        date: "2021-12-23 00:00:14",
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.VISA,
        },
        id: 'GZEN23784UBV2',
        amount: 15000,
        deduction: 0,
      },
      {
        status: StatusType.SUCCEEDED,
        type: PayType.LINK,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV3',
        amount: 25000,
        deduction: 1500,
      }
    ]
    total = 25000;

    const { result: { current } } = renderHook(() => usePaymentsFilter(data, filters))
    const { summaryTitle , summarySubtitle, tableTitle, totalAmount, dataFiltered } = current;

    expect(summaryTitle).toBe('Total de ventas de hoy')
    expect(summarySubtitle).toBe(getToday())
    expect(tableTitle).toBe('Tus ventas de hoy')
    expect(totalAmount).toBe(total)
    expect(dataFiltered).toHaveLength(1);

  })

  test('calculate with data with week frequency', async () => {
    const filters: FilterOptions = {
      frequency: FrequencyType.WEEK,
      paymentTypes: {},
    }

    data = [
      {
        status: StatusType.SUCCEEDED,
        type: PayType.DATAPHONE,
        date: "2021-12-22 23:45:28",
        method: {
          type: 'card',
          numberCard: 7711,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV1',
        amount: 25000,
        deduction: 1500,
      },
      {
        status: StatusType.FAILED,
        type: PayType.DATAPHONE,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.VISA,
        },
        id: 'GZEN23784UBV2',
        amount: 15000,
        deduction: 0,
      },
      {
        status: StatusType.SUCCEEDED,
        type: PayType.LINK,
        date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        method: {
          type: 'card',
          numberCard: 1234,
          provider: PayProvider.MASTERCARD,
        },
        id: 'GZEN23784UBV3',
        amount: 25000,
        deduction: 1500,
      }
    ]
    total = 40000;

    const { result: { current } } = renderHook(() => usePaymentsFilter(data, filters))
    const { summaryTitle , summarySubtitle, tableTitle, totalAmount, dataFiltered } = current;

    expect(summaryTitle).toBe('Total de ventas de esta semana')
    expect(summarySubtitle).toBe(getCurrentWeek())
    expect(tableTitle).toBe('Tus ventas de esta semana')
    expect(totalAmount).toBe(total)
    expect(dataFiltered).toHaveLength(2);

  })
})
