import { useState } from 'react'

import { MlTabs } from 'components/molecules'
import { Layout } from 'components/templates'
import { OrPaymentsSummary } from 'components/organisms'
import { FrequencyOption, FrequencyType } from 'types'
import { getCurrentMonth } from 'utils/dateFormatter'

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

  function selectFrequency(option: string) {
    setFrequency(option as FrequencyType)
    localStorage.setItem('frequency', option)
  }

  return (
    <Layout>
      <main className="px-5 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between space-y-5 sm:space-x-5 sm:space-y-0">
          <div className="sm:max-w-sm sm:min-w-[320px] h-full">
            <OrPaymentsSummary frequency={frequency} totalAmount={2000000} />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <MlTabs
              options={frequencyOptions}
              active={frequency}
              className="flex-col lg:flex-row"
              handleChange={selectFrequency}
            />
            <div className='flex bg-white w-full justify-center rounded-2xl'>Filtros</div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default App
