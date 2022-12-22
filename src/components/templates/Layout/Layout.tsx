import { ReactNode } from 'react'

import { OrHeader } from 'components/organisms'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <OrHeader />
      {children}
    </>
  )
}
