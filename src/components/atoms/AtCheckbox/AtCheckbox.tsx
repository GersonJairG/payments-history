import { ChangeEvent } from 'react'

export interface OptionCheckbox {
  value: string
  isChecked: boolean
}

interface AtCheckboxProps {
  value: string
  label: string
  checked?: boolean
  onChange: (value: OptionCheckbox) => void
  className?: string
}

export const AtCheckbox = ({
  value,
  label,
  onChange,
  checked = false,
  className = '',
}: AtCheckboxProps) => {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange({
      value,
      isChecked: event.currentTarget.checked,
    })
  }
  return (
    <div className="flex space-x-4">
      <input
        type="checkbox"
        id={value}
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={value} className={className}>
        {label}
      </label>
    </div>
  )
}
