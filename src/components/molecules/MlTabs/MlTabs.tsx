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
    <div className={`flex w-full bg-white py-1 px-1 rounded-2xl ${className}`}>
      {options.map(({ label, value }) => {
        const isActive = active === value
        return (
          <button
            key={label}
            className={`flex py-2 text-primary justify-center items-center w-full ${
              isActive ? 'bg-gray-200 font-bold' : 'font-semibold'
            } rounded-full transition duration-150`}
            onClick={() => handleChange(value)}
          >
            <span className="first-letter:uppercase">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
