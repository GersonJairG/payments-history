export interface OptionType {
  label: string
  value: string
}

export interface FrequencyOption {
  label: string
  value: FrequencyType
}

export enum FrequencyType {
  TODAY = 'today',
  WEEK = 'week',
  MONTH = 'month',
}
