import { AtButton, AtCheckbox, OptionCheckbox } from 'components/atoms'
import { useRef, useState } from 'react'
import { PayTypeOption } from 'types'
import { PayType } from 'types/payments'
import { MdClose } from 'react-icons/md'
import { VscSettings } from 'react-icons/vsc'
import {
  getCountSelected,
  getSelectionClean,
  isAllCheck,
  isSomeSelected,
} from 'utils/helpers'
import useOutsideClick from 'hooks/useOutsideClick'

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

  useOutsideClick(filtersRef, closeFilters)

  const [showFilters, setShowFilters] = useState<boolean>(false)

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
        <span className="text-secondary font-semibold text-xs">
          ({getCountSelected(selectedOptions)})
        </span>
        <span className="text-primary uppercase text-sm font-medium">
          Filtrar
        </span>
        <VscSettings className="w-6 h-6 text-primary" />
      </button>
    )
  }

  return (
    <div className={`relative ${className} h-11`} ref={filtersRef}>
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

        <div className="flex flex-col w-full py-3 text-sm md:text-base">
          <AtCheckbox
            label="Cobro con datáfono"
            value={PayType.DATAPHONE}
            group="payType"
            onChange={onChange}
            checked={selectedOptions?.[PayType.DATAPHONE]}
            className="text-primary font-medium"
          />
          <AtCheckbox
            label="Cobro con link de pago"
            value={PayType.LINK}
            group="payType"
            onChange={onChange}
            checked={selectedOptions?.[PayType.LINK]}
            className="text-primary font-medium"
          />
          <AtCheckbox
            label="Ver todos"
            value="all"
            group="payType"
            onChange={onChange}
            checked={selectedOptions?.all}
            className="text-primary font-medium"
          />
        </div>
        <div className="w-full flex justify-center">
          <AtButton
            primary
            disabled={!isSomeSelected(selectedOptions)}
            onClick={applyFilters}
            className="w-2/3"
          >
            Aplicar
          </AtButton>
        </div>
      </div>
    </div>
  )
}