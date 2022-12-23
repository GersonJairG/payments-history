import {
  AtTransactionStatus,
  AtPaymentMethod,
  AtPaymentAmount,
} from 'components/atoms'
import { PaymentType, PayProvider, PayType, StatusType } from 'types/payments'
import { getPaymentFormat } from 'utils/dateFormatter'
import { HeaderType } from './types'

interface OrPaymentsTableProps {
  className?: string
  data?: PaymentType[]
  headers: HeaderType[]
}

export const OrPaymentsTable = ({
  className = '',
  data = [],
  headers = [],
}: OrPaymentsTableProps) => {
  return (
    <div className={`${className}`}>
      <table className="bg-white w-full rounded-2xl">
        <thead>
          <tr className="font-semibold text-darkGray text-sm">
            {headers.map(({ label, id }) => (
              <th key={id} className="text-left first:pl-5">
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map(({ id, status, type, date, method, amount, deduction }) => {
            return (
              <tr
                key={id}
                className="border-t-2 border-t-gray-200 text-sm text-ligthGray"
              >
                <td
                  className={`text-primary font-semibold px-2 border-l-4 ${
                    status === StatusType.SUCCEEDED
                      ? 'border-l-primary'
                      : 'border-l-ligthGray'
                  } first:pl-5`}
                >
                  <AtTransactionStatus
                    status={status as StatusType}
                    type={type as PayType}
                  />
                </td>

                <td>{getPaymentFormat(date)}</td>

                <td>
                  <AtPaymentMethod
                    provider={method.provider as PayProvider}
                    numberCard={method.numberCard}
                  />
                </td>

                <td>{id}</td>
                <td>
                  <AtPaymentAmount amount={amount} deduction={deduction} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
