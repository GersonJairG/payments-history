import { OptionType } from 'types'

interface MlTabsProps {
  className?: string
  options: OptionType[]
  active?: string
  handleChange: (value: string) => void
}

export const MlTabs = ({
  className = '',
  options,
  active,
  handleChange,
}: MlTabsProps) => {
  return (
    <div className={`flex w-full bg-white py-1 px-1 ${className}`}>
      {options.map(({ label, value }) => {
        const isActive = active === value
        return (
          <button
            key={label}
            className={`flex py-2 text-primary justify-center items-center w-full rounded-full capitalize ${
              isActive ? 'bg-gray-300 transition font-bold duration-150' : ''
            }`}
            onClick={() => handleChange(value)}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
