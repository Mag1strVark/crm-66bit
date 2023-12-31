import { combineReducers, configureStore } from '@reduxjs/toolkit'
import registrationSlice from './reducers/registration/RegistarationSlice.ts'
import authSlice from './reducers/auth/AuthSlice.ts'
import eventReducer from './reducers/Events/EventSlice.ts'
import departmentReducer from './reducers/Departaments/DepartmentSlice.ts'
import accountReducer from './reducers/Account/AccountSlice.ts'
import categoryReducer from './reducers/Category/CategorySlice.ts'
import serviceReducer from './reducers/Service/ServiceSlice.ts'

const rootReducer = combineReducers({
  registrationSlice,
  authSlice,
  eventReducer,
  departmentReducer,
  accountReducer,
  categoryReducer,
  serviceReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
