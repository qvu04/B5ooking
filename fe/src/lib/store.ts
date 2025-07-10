import { configureStore } from '@reduxjs/toolkit'
import userSlice from "@/redux/features/userSlice"

export const store = configureStore({
    reducer: {
        userSlice: userSlice,
    },
})

// Kiểu TypeScript nếu cần
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
