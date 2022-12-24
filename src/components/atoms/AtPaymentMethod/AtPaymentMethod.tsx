import { PayProvider } from 'types/payments'
import { VisaIcon, MasterCardIcon, AmericanExpressIcon } from 'components/atoms'

interface AtPaymentMethodProps {
  type?: string
  numberCard: number
  provider: PayProvider
  className?: string
}
export const AtPaymentMethod = ({
  type,
  numberCard,
  provider,
  className = '',
}: AtPaymentMethodProps) => {
  function renderProvider(provider: PayProvider) {
    switch (provider) {
      case PayProvider.MASTERCARD:
        return <MasterCardIcon className="w-6 h-6" />
      case PayProvider.VISA:
        return <VisaIcon className="w-6 h-6" />
      case PayProvider.AMERICANEXPRESS:
        return <AmericanExpressIcon className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className={`flex ${className}`}>
      {renderProvider(provider)}
      <span className="ml-2">**** **** **** {numberCard}</span>
    </div>
  )
}
