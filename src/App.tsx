import { useMemo, useState } from 'react'

import { MlFilters, MlTabs } from 'components/molecules'
import { Layout } from 'components/templates'
import { OrPaymentsSummary, OrPaymentsTable } from 'components/organisms'
import { FrequencyOption, FrequencyType, PayTypeOption } from 'types'
import { getCurrentMonth } from 'utils/dateFormatter'
import payments from 'data/payments.json'
import { PaymentType } from 'types/payments'
import usePaymentsFilter from 'hooks/usePaymentsFilter'

const frequencyOptions: FrequencyOption[] = [
  { label: 'Hoy', value: FrequencyType.TODAY },
  { label: 'Esta semana', value: FrequencyType.WEEK },
  { label: `${getCurrentMonth()}`, value: FrequencyType.MONTH },
]

function App() {
  const [frequency, setFrequency] = useState<FrequencyType>(
    () =>
      (localStorage.getItem('frequency') ||
        FrequencyType.TODAY) as FrequencyType
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

  const { dataFiltered, totalAmount } = usePaymentsFilter(
    payments.data as PaymentType[],
    filters
  )

  return (
    <Layout>
      <main className="px-5 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-x-5 sm:space-y-0">
          <div className="sm:max-w-sm sm:min-w-[320px] h-full">
            <OrPaymentsSummary
              frequency={frequency}
              totalAmount={totalAmount}
            />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <MlTabs
              options={frequencyOptions}
              active={frequency}
              handleChange={changeFrequency}
              className="flex-col lg:flex-row"
            />
            <MlFilters
              activeOptions={paymentTypes}
              handleChange={changePaymentTypes}
            />
          </div>
        </div>
        <OrPaymentsTable
          className="my-5"
          headers={payments.headers}
          data={dataFiltered}
        />
      </main>
    </Layout>
  )
}

export default App
