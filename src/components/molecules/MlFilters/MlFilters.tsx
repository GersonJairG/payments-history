import { useRef, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { VscSettings } from 'react-icons/vsc'

import { AtButton, AtCheckbox, OptionCheckbox } from 'components/atoms'
import useOutsideClick from 'hooks/useOutsideClick'
import { PayTypeOption } from 'types'
import { PayType } from 'types/payments'
import { getCountSelected, getSelectionClean, isAllCheck } from 'utils/helpers'

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
  }>({ ...activeOptions, all: isAllCheck(activeOptions) })

  const filtersRef = useRef<HTMLDivElement>(null)
  const [showFilters, setShowFilters] = useState<boolean>(false)
  const numberFilterSelected = getCountSelected(selectedOptions)

  useOutsideClick(filtersRef, closeFilters)

  function onChange(option: OptionCheckbox) {
    if (option.value === 'all') {
      setSelectedOptions((currentValue) => ({
        ...currentValue,
        [PayType.DATAPHONE]: option.isChecked,
        [PayType.LINK]: option.isChecked,
        [option.value]: option.isChecked,
      }))
    } else {
      const currentSelection = {
        ...selectedOptions,
        [option.value]: option.isChecked,
      }

      setSelectedOptions({
        ...currentSelection,
        all: isAllCheck(currentSelection),
      })
    }
  }

  function applyFilters() {
    const result: PayTypeOption = getSelectionClean(selectedOptions)
    handleChange?.(result)
    setShowFilters(false)
  }

  function undoFilters() {
    setSelectedOptions((currentValue) => ({
      ...currentValue,
      ...activeOptions,
      all: isAllCheck(activeOptions),
    }))
  }

  function closeFilters() {
    undoFilters()
    setShowFilters(false)
  }

  if (!showFilters) {
    return (
      <button
        className={`flex bg-white w-full items-center rounded-2xl justify-center space-x-4 py-3 hover:shadow-md hover:font-semibold ${className}`}
        onClick={() => setShowFilters(true)}
      >
        {numberFilterSelected > 0 && (
          <span className="text-secondary font-semibold text-xs">
            ({numberFilterSelected})
          </span>
        )}
        <span className="text-primary uppercase text-sm font-medium">
          Filtrar
        </span>
        <VscSettings className="w-6 h-6 text-primary" />
      </button>
    )
  }

  return (
    <div className={`relative ${className} h-12 z-50`} ref={filtersRef}>
      <div
        className={`absolute bg-white w-full rounded-2xl py-3 px-5 shadow-md`}
      >
        <div className="flex items-center w-full justify-between">
          <span className="ml-5 uppercase w-full text-center text-sm text-primary font-semibold">
            Filtrar
          </span>
          <MdClose
            className="h-6 w-6 cursor-pointer hover:text-secondary font-bold"
            onClick={closeFilters}
          />
        </div>

        <div className="flex flex-col w-full py-5 text-sm md:text-base">
          <AtCheckbox
            label="Cobro con datáfono"
            value={PayType.DATAPHONE}
            onChange={onChange}
            checked={selectedOptions?.[PayType.DATAPHONE]}
            className="text-primary font-medium"
          />
          <AtCheckbox
            label="Cobro con link de pago"
            value={PayType.LINK}
            onChange={onChange}
            checked={selectedOptions?.[PayType.LINK]}
            className="text-primary font-medium"
          />
          <AtCheckbox
            label="Ver todos"
            value="all"
            onChange={onChange}
            checked={selectedOptions?.all}
            className="text-primary font-medium"
          />
        </div>
        <div className="w-full flex justify-center">
          <AtButton primary onClick={applyFilters} className="w-2/3">
            Aplicar
          </AtButton>
        </div>
      </div>
    </div>
  )
}
