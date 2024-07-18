import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "../components/Filters/filtersSlice";
import todosSlice from "../components/TodoList/todosSlice";

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todosSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
