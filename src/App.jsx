import { useEffect } from 'react'
import { HomePage } from './pages/HomePage'
// import { SessionExpired } from './components/utils/SessionExpired'
import { storePermission } from './store/storePermission'

function App () {
/*   const cookie = document.cookie.split(';').find(row => row.trim().startsWith('data='))
  const dataCookie = cookie ? JSON.parse(cookie.split('=')[1]) : null
  const { typeUserId } = dataCookie
  const { getMenus, menus } = storePermission(state => state)

  const getMenusForApps = async () => {
    await getMenus({ typeUserId, appId: 1 })
  }

  useEffect(() => {
    if (dataCookie === null) return
    getMenusForApps()
  }, [])
 */
  const { getMenus, menus } = storePermission(state => state)
  const getMenusForApps = async () => {
    await getMenus({ typeUserId: 1, appId: 1 })
  }
  useEffect(() => {
  /* if (dataCookie === null) return */
    getMenusForApps()
  }, [])
  return (
    <>
     {/*  {
        dataCookie === null
          ? <SessionExpired />
          : <HomePage menus={menus} />
      } */}
      <HomePage menus={menus} />
    </>
  )
}

export default App
