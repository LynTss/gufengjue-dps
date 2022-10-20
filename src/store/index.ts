import { configureStore } from '@reduxjs/toolkit'
import basic from './basicReducer'
import zengyi from './zengyiReducer'

const store = configureStore({
  reducer: {
    basic: basic,
    zengyi: zengyi,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
