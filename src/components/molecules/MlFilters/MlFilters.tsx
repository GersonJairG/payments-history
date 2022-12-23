import { AtCheckbox, OptionCheckbox } from 'components/atoms'
import { useState } from 'react'
import { PayTypeOption } from 'types'
import { PayType } from 'types/payments'

interface MlFiltersProps {
  className?: string
  handleChange?: (options: PayTypeOption) => void
  activeOptions: PayTypeOption
}

export const MlFilters = ({
  className,
  handleChange,
  activeOptions,
}: MlFiltersProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: boolean
  }>(activeOptions)

  function onChange(option: OptionCheckbox) {
    if (option.value === 'all') {
      setSelectedOptions((currentValue) => ({
        ...currentValue,
        [PayType.DATAPHONE]: option.isChecked,
        [PayType.LINK]: option.isChecked,
        [option.value]: option.isChecked,
      }))
    } else {
      setSelectedOptions((currentValue) => ({
        ...currentValue,
        ...(!option.isChecked ? { all: false } : {}),
        [option.value]: option.isChecked,
      }))
    }
  }

  function applyFilters() {
    const result: PayTypeOption = Object.keys(selectedOptions)
      .filter((key) => key !== 'all')
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: selectedOptions[key],
        }
      }, {})
    console.log(result)
    handleChange?.(result)
  }

  return (
    <div className={`flex w-full bg-white ${className}`}>
      <form>
        <span>Options</span>
        <AtCheckbox
          label="Cobro con datáfono"
          value={PayType.DATAPHONE}
          group="payType"
          onChange={onChange}
          checked={selectedOptions?.[PayType.DATAPHONE]}
        />
        <AtCheckbox
          label="Cobro con link de pago"
          value={PayType.LINK}
          group="payType"
          onChange={onChange}
          checked={selectedOptions?.[PayType.LINK]}
        />
        <AtCheckbox
          label="Ver todos"
          value="all"
          group="payType"
          onChange={onChange}
          checked={selectedOptions?.all}
        />
        <button
          type="button"
          className="bg-secondary px-4 py-2 rounded-2xl text-white"
          onClick={applyFilters}
        >
          Testing
        </button>
      </form>
    </div>
  )
}
