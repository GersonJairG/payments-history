import { MdOutlineHelpOutline } from 'react-icons/md'

import { AtLogo } from 'components/atoms'

export const OrHeader = () => {
  return (
    <header className="flex bg-gradient-bold text-white py-3 px-5 sm:py-5 sm:px-10 justify-between items-center">
      <AtLogo />
      <ul className="flex text-sm space-x-3 sm:text-base sm:space-x-6">
        <li>Mi negocio</li>
        <li className="flex items-center">
          <span>Ayuda</span>
          <MdOutlineHelpOutline className="w-5 h-5 ml-1" />
        </li>
      </ul>
    </header>
  )
}
