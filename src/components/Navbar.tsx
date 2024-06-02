import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='w-full h-12 flex items-center justify-end px-12'>
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value='en'>English</option>
        <option value='hi'>हिंदी</option>
        <option value='bn'>বাংলা</option>
      </select>
    </div>
  )
}

export default Navbar
