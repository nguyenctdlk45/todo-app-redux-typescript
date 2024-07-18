// import { createSelector } from "@reduxjs/toolkit";

// export const searchTextSelector = (state) => state.filters.search;
// export const filterStatusSelector = (state) => state.filters.status;
// export const filterPrioritiesSelector = (state) => state.filters.priorities;
// export const todoListSelector = (state) => state.todoList.todos;

// export const todosRemainingSelector = createSelector(
//   todoListSelector,
//   filterStatusSelector,
//   searchTextSelector,
//   filterPrioritiesSelector,
//   (todoList, status, searchText, priorities) => {
//     return todoList?.filter((todo) => {
//       if (status === "All") {
//         return priorities.length
//           ? todo.name.includes(searchText) && priorities.includes(todo.priority)
//           : todo.name.includes(searchText);
//       }

//       return (
//         todo.name.includes(searchText) &&
//         (status === "Completed" ? todo.completed : !todo.completed) &&
//         (priorities.length ? priorities.includes(todo.priority) : true)
//       );
//     });
//   }
// );
// // export const getTodos = createSelector(
// //   (state) => state.todoList.todos,
// //   (todos) => todos
// // );
import { createSelector } from "@reduxjs/toolkit";
// import { RootState } from "../../redux/store"; // Adjust the path based on your project structure

// Define the shape of your filter state
interface FiltersState {
  search: string;
  status: "All" | "Completed" | "Active";
  priorities: Array<"High" | "Medium" | "Low">;
}

// Define the shape of your todo item
interface TodoType {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

// Define the shape of your todo list state
interface TodoListState {
  todos: TodoType[];
}

// Define the shape of your overall application state
interface RootState {
  filters: FiltersState;
  todoList: TodoListState;
}

export const searchTextSelector = (state: RootState) => state.filters.search;
export const filterStatusSelector = (state: RootState) => state.filters.status;
export const filterPrioritiesSelector = (state: RootState) =>
  state.filters.priorities;
export const todoListSelector = (state: RootState) => state.todoList.todos;

export const todosRemainingSelector = createSelector(
  todoListSelector,
  filterStatusSelector,
  searchTextSelector,
  filterPrioritiesSelector,
  (
    todoList: TodoType[],
    status: string,
    searchText: string,
    priorities: string[]
  ) => {
    return todoList.filter((todo) => {
      const matchesSearch = todo.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesStatus =
        status === "All" ||
        (status === "Completed" ? todo.completed : !todo.completed);
      const matchesPriority = priorities.length
        ? priorities.includes(todo.priority)
        : true;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }
);
