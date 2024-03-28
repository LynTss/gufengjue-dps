import { configureStore } from '@reduxjs/toolkit'
import basic from './basicReducer'

const store = configureStore({
  reducer: {
    basic: basic,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
