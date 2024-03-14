import { create } from 'zustand'
import { getRequest } from '../services/serviceAccess'

export const storePermission = create()((set, get) => {
  const baseURL = 'type_user_detail'
  return {
    loading: false,
    menus: [],

    getMenus: async (data) => {
      const { typeUserId, appId } = data
      const menus = await getRequest(`${baseURL}/menus/${typeUserId}/${appId}`)
      set({ menus })
    }
  }
},
{
  name: 'typeUserDetail'
})
