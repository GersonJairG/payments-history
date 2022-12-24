import { MdInfoOutline } from 'react-icons/md'

interface MlSummaryCardProps {
  title: string
  value: string
  subtitle?: string
  className?: string
}

export const MlSummaryCard = ({
  value,
  title,
  subtitle,
  className = '',
}: MlSummaryCardProps) => {
  return (
    <div className={`flex-col w-full text-center rounded-2xl ${className}`}>
      <div className="flex bg-gradient-bold-solf text-white items-center py-3 rounded-t-2xl justify-between px-4 font-semibold">
        <span>{title}</span>
        <MdInfoOutline className="h-5 w-5 ml-1" />
      </div>
      <div className="flex-col py-6 bg-white rounded-b-2xl">
        <h1 className="font-bold text-2xl bg-gradient-bold-solf bg-clip-text text-transparent">
          {value}
        </h1>
        {subtitle && (
          <span className="text-sm text-primary capitalize">{subtitle}</span>
        )}
      </div>
    </div>
  )
}
