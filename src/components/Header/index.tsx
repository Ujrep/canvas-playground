import IconPicker from 'src/icons/icon-picker.svg'

interface HeaderProps {
  selectedColor: string
  togglePickColor: Function
}

const Header = ({ selectedColor, togglePickColor }: HeaderProps) => {
  return (
    <header className="flex justify-between p-8">
      <button onClick={() => togglePickColor()}>
        <img src={IconPicker} alt="icon-picker" />
      </button>
      <p className="text-black">{selectedColor}</p>
    </header>
  )
}

export default Header
