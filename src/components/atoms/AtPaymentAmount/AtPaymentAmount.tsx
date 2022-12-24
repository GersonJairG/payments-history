import { getFormatCOP } from 'utils/helpers'

interface AtPaymentAmountProps {
  amount: number
  deduction: number
  className?: string
  successful?: boolean
}

export const AtPaymentAmount = ({
  amount,
  deduction,
  className = '',
  successful = false,
}: AtPaymentAmountProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-primary font-semibold">{getFormatCOP(amount)}</span>
      {successful && deduction > 0 && (
        <>
          <span className="font-semibold text-xs">Deducción Bold</span>
          <span className="text-secondary text-xs">
            - {getFormatCOP(deduction)}
          </span>
        </>
      )}
    </div>
  )
}
