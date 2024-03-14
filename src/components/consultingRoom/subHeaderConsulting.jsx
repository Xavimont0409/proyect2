import { AddUser, Export } from '../../assets/Icons'
import { Button } from '../utils/Button'

// eslint-disable-next-line react/prop-types
export function SubHeaderConsulting ({ showModal, setUpdateData }) {
  const handleOpenModal = () => {
    setUpdateData({ editMode: false })
    showModal()
  }

  const handleExport = () => {
    console.log('export')
  }

  return (
    <div className='flex justify-between w-full pb-5 pt-4'>
      <Button
        handleClick={handleOpenModal}
        icon={<AddUser />}
        className='btn-primary'
        type='button'
      />
      <Button
        handleClick={handleExport}
        icon={<Export />}
        className='btn-primary'
        type='button'
      />
    </div>
  )
}
