import {
  AtTransactionStatus,
  AtPaymentMethod,
  AtPaymentAmount,
} from 'components/atoms'
import { MOBILE_SM } from 'constants/devicesSizes'
import useWindowSize from 'hooks/useWindowSize'
import { HeadersType } from 'types'
import { PaymentType, PayProvider, PayType, StatusType } from 'types/payments'
import { getPaymentFormat } from 'utils/dateFormatter'

interface OrPaymentsTableProps {
  className?: string
  data?: PaymentType[]
  headers: HeadersType[]
  title?: string
}

export const OrPaymentsTable = ({
  className = '',
  data = [],
  headers = [],
  title = 'Tus ventas',
}: OrPaymentsTableProps) => {
  const size = useWindowSize()

  const renderTable = (rows: PaymentType[], columns: HeadersType[]) => {
    return (
      <div className="hidden sm:flex bg-white overflow-x-auto overflow-y-auto max-h-96 rounded-b-2xl">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white shadow-md">
            <tr className="font-semibold text-darkGray text-sm">
              {columns.map(({ label, id }) => (
                <th key={id} className="text-left first:pl-5">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map(
              ({ id, status, type, date, method, amount, deduction }) => {
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
                      <AtPaymentAmount
                        amount={amount}
                        deduction={deduction}
                        successful={status === StatusType.SUCCEEDED}
                      />
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </div>
    )
  }

  const renderCards = (rows: PaymentType[], columns: HeadersType[]) => {
    return (
      <div className="flex-col bg-white w-full overflow-x-auto overflow-y-auto max-h-96 rounded-b-2xl sm:hidden py-3 px-5 text-sm divide-y-2">
        {rows.map(({ id, status, type, date, method, amount, deduction }) => {
          return (
            <div key={id} className="py-3 divide-y">
              {columns.map((header) => {
                return (
                  <div
                    key={header.id}
                    className={`flex justify-between py-2 pl-2 border-l-4 ${
                      status === StatusType.SUCCEEDED
                        ? 'border-l-primary'
                        : 'border-l-ligthGray'
                    }`}
                  >
                    <div className="font-semibold flex items-center">
                      {header.label}
                    </div>
                    <div className="flex text-ligthGray items-center justify-center">
                      {header.id === 'transaction' && (
                        <AtTransactionStatus
                          status={status as StatusType}
                          type={type as PayType}
                          className="text-primary font-semibold text-right items-center"
                        />
                      )}
                      {header.id === 'date' && (
                        <span className="text-right">
                          {getPaymentFormat(date)}
                        </span>
                      )}
                      {header.id === 'paymentMethod' && (
                        <AtPaymentMethod
                          provider={method.provider as PayProvider}
                          numberCard={method.numberCard}
                        />
                      )}
                      {header.id === 'id' && id}
                      {header.id === 'amount' && (
                        <AtPaymentAmount
                          amount={amount}
                          deduction={deduction}
                          successful={status === StatusType.SUCCEEDED}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <div className="w-full bg-gradient-bold text-white sm:text-lg pl-5 py-2 rounded-t-2xl text-center sm:text-left">
        {title}
      </div>
      {!data.length ? (
        <div className="bg-white w-full rounded-b-2xl text-center font-medium text-sm md:text-base py-5 px-5">
          No se encontraron ventas
        </div>
      ) : (
        <>
          {(size.width || 0) < MOBILE_SM
            ? renderCards(data, headers)
            : renderTable(data, headers)}
        </>
      )}
    </div>
  )
}
