import { ChangeEvent } from 'react'
import { PayType } from 'types/payments'

// export interface OptionCheckbox {
//   value: string
//   isChecked: boolean
// }

interface AtCheckboxProps {
  value: string
  label: string
  group: string

  checked?: boolean
  onChange: (value: PayType | 'all' | '') => void
}

export const AtCheckbox2 = ({
  value,
  label,
  group,
  onChange,
  checked = false,
}: AtCheckboxProps) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.currentTarget.checked ? (value as PayType) : '')
  }
  return (
    <div className="flex">
      <input
        type="checkbox"
        id={value}
        name={group}
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}
