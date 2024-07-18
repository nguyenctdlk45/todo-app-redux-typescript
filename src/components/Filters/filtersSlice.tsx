import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface FiltersState {
  search: string;
  status: string;
  priorities: string[]; // Adjust the type if necessary
}

// Initial state
const initialState: FiltersState = {
  search: "",
  status: "All",
  priorities: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    searchFilterChange: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    prioritiesFilterChange: (state, action: PayloadAction<string[]>) => {
      state.priorities = action.payload;
    },
  },
});

export const {
  searchFilterChange,
  statusFilterChange,
  prioritiesFilterChange,
} = filtersSlice.actions;
export default filtersSlice;
