import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  loading?: boolean
  primary?: boolean
  onClick?: () => void
}

export const AtButton: FC<ButtonProps> = ({
  className = '',
  disabled = false,
  children,
  type,
  loading,
  primary = false,
  onClick,
  ...rest
}) => {
  const renderLoading = () => (
    <div className="mr-2 flex h-5 w-5 animate-spin rounded-full border-2 border-solid border-indigo-200 border-t-transparent " />
  )

  return (
    <button
      disabled={disabled || loading}
      className={`flex h-auto items-center justify-center rounded-full transition-colors disabled:bg-opacity-70 hover:shadow-md hover:font-semibold hover:disabled:shadow-none hover:disabled:font-medium font-medium px-8 py-2 ${
        primary ? 'bg-secondary text-white' : ''
      } ${className} `}
      onClick={() => onClick?.()}
      type={type}
      {...rest}
    >
      {loading && renderLoading()}
      {children || `This is a Button`}
    </button>
  )
}
