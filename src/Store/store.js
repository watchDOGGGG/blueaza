import { configureStore } from '@reduxjs/toolkit'
import NavReducer from '../Slices/Navslice'
import SearchReducer from '../Slices/SearchSlice'
import AuthReducer from '../Slices/LoginSlice'
import ChatReducer from '../Slices/chatSlice'
import ThreadReducer from '../Slices/ThreadSlice'
import SettingReducer from '../Slices/settings_update'
import ChannelReducer from '../Slices/ChannelSlice'

export const store = configureStore({
  reducer: {
      nav:NavReducer,
      search:SearchReducer,
      auth:AuthReducer,
      chat:ChatReducer,
      thread:ThreadReducer,
      setting:SettingReducer,
      channel:ChannelReducer
  },
})