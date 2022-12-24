import { useMemo, useState } from 'react'

import { MlFilters, MlSummaryCard, MlTabs } from 'components/molecules'
import { OrPaymentsTable } from 'components/organisms'
import { Layout } from 'components/templates'
import payments from 'data/payments.json'
import usePaymentsFilter from 'hooks/usePaymentsFilter'
import { FrequencyOption, FrequencyType, PayTypeOption } from 'types'
import { PaymentType } from 'types/payments'
import { getCurrentMonth } from 'utils/dateFormatter'
import { getFormatCOP } from 'utils/helpers'

const frequencyOptions: FrequencyOption[] = [
  { label: 'Hoy', value: FrequencyType.TODAY },
  { label: 'Esta semana', value: FrequencyType.WEEK },
  { label: `${getCurrentMonth()}`, value: FrequencyType.MONTH },
]

function App() {
  const [frequency, setFrequency] = useState<FrequencyType>(
    () =>
      (localStorage.getItem('frequency') ||
        FrequencyType.MONTH) as FrequencyType
  )

  const [paymentTypes, setPaymentTypes] = useState<PayTypeOption>(() =>
    JSON.parse(localStorage.getItem('paymentTypes') || '{}')
  )

  function changeFrequency(option: string) {
    setFrequency(option as FrequencyType)
    localStorage.setItem('frequency', option)
  }

  function changePaymentTypes(options: PayTypeOption) {
    setPaymentTypes((current) => ({
      ...current,
      ...options,
    }))
    localStorage.setItem('paymentTypes', JSON.stringify(options))
  }

  const filters = useMemo(
    () => ({
      frequency,
      paymentTypes,
    }),
    [frequency, paymentTypes]
  )

  const {
    dataFiltered,
    totalAmount,
    summaryTitle,
    summarySubtitle,
    tableTitle,
  } = usePaymentsFilter(payments.data as PaymentType[], filters)

  return (
    <Layout>
      <main className="px-5 sm:px-10 py-10">
        <div className="grid grid-col-1 sm:grid-cols-4 md:grid-cols-3 sm:grid-rows-1 gap-4">
          <MlSummaryCard
            value={getFormatCOP(totalAmount)}
            title={summaryTitle}
            subtitle={summarySubtitle}
            className="sm:col-span-2  md:col-span-1 sm:row-span-1 lg:row-span-3"
          />
          <MlTabs
            options={frequencyOptions}
            active={frequency}
            handleChange={changeFrequency}
            className="flex-col h-fit self-center lg:flex-row sm:col-span-2 sm:row-span-1"
          />
          <MlFilters
            activeOptions={paymentTypes}
            handleChange={changePaymentTypes}
            className="sm:col-start-3 sm:col-span-2 sm:self-baseline"
          />
        </div>
        <OrPaymentsTable
          headers={payments.headers}
          data={dataFiltered}
          title={tableTitle}
          className="mt-5"
        />
      </main>
    </Layout>
  )
}

export default App
