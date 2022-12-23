import { ChangeEvent } from 'react'

export interface OptionCheckbox {
  value: string
  isChecked: boolean
}

interface AtCheckboxProps {
  value: string
  label: string
  group: string
  checked?: boolean
  onChange: (value: OptionCheckbox) => void
}

export const AtCheckbox = ({
  value,
  label,
  group,
  onChange,
  checked = false
}: AtCheckboxProps) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      value,
      isChecked: event.currentTarget.checked,
    })
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
