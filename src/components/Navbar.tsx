import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FaCircle } from 'react-icons/fa'

const Navbar = () => {
  const { i18n } = useTranslation()

  const [language, setLanguage] = useState('en')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleOptionClick = (lng: string) => {
    changeLanguage(lng)
    setIsDropdownOpen(false)
  }

  return (
    <div className='flex h-16 w-full items-center justify-end text-stone-400'>
      <div className='mr-8 flex items-center'>
        <div className='relative'>
          <div
            onClick={toggleDropdown}
            className='cursor-pointer rounded-md bg-stone-100 p-1 text-xs font-semibold text-stone-400'
          >
            {language === 'en'
              ? 'English'
              : language === 'hi'
                ? 'हिंदी'
                : 'বাংলা'}
          </div>
          {isDropdownOpen && (
            <div className='absolute -left-1/2 z-10 mt-1 w-20 rounded-md bg-white shadow-lg'>
              <div
                onClick={() => handleOptionClick('en')}
                className='flex cursor-pointer items-center justify-center px-4 py-2 text-xs hover:bg-gray-200'
              >
                English
              </div>
              <div
                onClick={() => handleOptionClick('hi')}
                className='flex cursor-pointer items-center justify-center px-4 py-2 text-xs hover:bg-gray-200'
              >
                हिंदी
              </div>
              <div
                onClick={() => handleOptionClick('bn')}
                className='flex cursor-pointer items-center justify-center px-4 py-2 text-xs hover:bg-gray-200'
              >
                বাংলা
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
