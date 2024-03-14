/* eslint-disable react/prop-types */
import { Home } from '../components/home/Home'
export function HomePage ({ menus }) {
  const newMenu = menus.sort((a, b) => a.position - b.position)
  return (
    <Home menus={newMenu} />
  )
}
