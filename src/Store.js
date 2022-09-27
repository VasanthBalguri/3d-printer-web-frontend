import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger' 
import loginReducer from './LoginSlice.js'
import machinesReducer from './MachinesSlice.js'
import tasksReducer from './TasksSlice.js'

const store = configureStore({
  reducer: {
    login: loginReducer,
    machines: machinesReducer,
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export default store;