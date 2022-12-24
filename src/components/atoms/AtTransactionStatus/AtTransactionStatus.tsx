import { HiOutlineLink } from 'react-icons/hi'

import { DataphoneIcon } from 'assets/icons'
import { PayType, StatusType } from 'types/payments'


interface AtTransactionStatusProps {
  type: PayType
  status: StatusType
  className?: string
}

export const AtTransactionStatus = ({
  type,
  status,
  className = '',
}: AtTransactionStatusProps) => {
  function renderType(type: PayType) {
    if (type === PayType.DATAPHONE) {
      return <DataphoneIcon className="h-5 w-5 min-w-fit" />
    }
    if (type === PayType.LINK) {
      return <HiOutlineLink className="h-5 w-5" />
    }
    return null
  }

  function renderDetail(status: StatusType) {
    switch (status) {
      case StatusType.PROCESSING:
        return 'Cobro en proceso'
      case StatusType.SUCCEEDED:
        return 'Cobro exitoso'
      default:
        return 'Cobro no realizado'
    }
  }
  return (
    <div className={`flex ${className}`}>
      {renderType(type)}
      <span className="ml-2">{renderDetail(status)}</span>
    </div>
  )
}
