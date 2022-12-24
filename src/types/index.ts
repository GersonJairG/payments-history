import { PayType } from './payments'

export interface OptionType {
  label: string
  value: string
}

export interface HeadersType {
  label: string
  id: string
}

export interface FrequencyOption {
  label: string
  value: FrequencyType
}

export type PayTypeOption = {
  [key in PayType]?: boolean
}

export enum FrequencyType {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
}

export interface FilterOptions {
  frequency: FrequencyType
  paymentTypes: PayTypeOption
}
