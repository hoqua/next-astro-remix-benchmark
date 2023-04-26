'use client'

import { FC, useState } from 'react'
import { getTranslationSafe } from '../../common/utils'
import { Link } from "@remix-run/react";

interface IProps {
  menuName: string
  itemsList: string[]
  getNavigationPath: (itemKeyName: string) => string
}

export const DesktopSubmenu: FC<IProps> = (props) => {
  const { menuName, itemsList, getNavigationPath } = props
  const [activeClasses, setClasses] = useState('opacity-0 -z-10')

  const handleMouseEnter = () => {
    setClasses('opacity-100 z-10')
  }

  const handleMouseLeave = () => {
    setClasses('opacity-0 -z-10')
  }

  return (
    <span
      className="relative cursor-pointer whitespace-nowrap text-xs uppercase text-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="okkino-text-hover text-xs uppercase text-black">{menuName}</span>

      <div
        className={
          'transition-{opacity} absolute  h-0 w-full duration-300 ease-in-out' + ' ' + activeClasses
        }
      >
        <ul>
          {itemsList.map((itemKeyName) => (
            <li
              key={itemKeyName}
              className="transition-color okkino-text-hover relative  mb-4 mt-4 text-xs uppercase tracking-wide"
            >
              <Link to={getNavigationPath(itemKeyName)}>
                {getTranslationSafe({}, itemKeyName)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </span>
  )
}
