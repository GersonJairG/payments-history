import { useEffect, useState } from 'react'

import { MlSummaryCard } from 'components/molecules'
import { FrequencyType } from 'types'
import {
  getCurrentMonth,
  getCurrentMonthYear,
  getToday,
  getCurrentWeek,
} from 'utils/dateFormatter'
import { getFormatCOP } from 'utils/helpers'

interface OrPaymentsSummaryProps {
  frequency: FrequencyType
  totalAmount: number
  className?: string
}
export const OrPaymentsSummary = ({
  frequency,
  totalAmount,
  className = '',
}: OrPaymentsSummaryProps) => {
  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')

  useEffect(() => {
    switch (frequency) {
      case FrequencyType.TODAY:
        setTitle('Total de ventas de hoy')
        setSubtitle(getToday())
        break

      case FrequencyType.WEEK:
        setTitle('Total de ventas de esta semana')
        setSubtitle(getCurrentWeek())
        break

      case FrequencyType.MONTH:
        setTitle(`Total de ventas de ${getCurrentMonth()}`)
        setSubtitle(getCurrentMonthYear())
        break
    }
  }, [frequency])
  return (
    <MlSummaryCard
      className={className}
      value={getFormatCOP(totalAmount)}
      title={title}
      subtitle={subtitle}
    />
  )
}
