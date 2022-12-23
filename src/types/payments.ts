export enum StatusType {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  PROCESSING = 'processing',
}

export enum PayType {
  DATAPHONE = 'dataphone',
  LINK = 'link',
}

export enum PayProvider {
  MASTERCARD = 'mastercard',
  VISA = 'visa',
  AMERICANEXPRESS = 'americanexpress',
}

export interface PayMethodType {
  type: string
  numberCard: number
  provider: PayProvider
}

export interface PaymentType {
  status: StatusType
  type: PayType
  date: string
  method: PayMethodType
  id: string
  amount: number
  deduction: number
}
