import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

// Định nghĩa giao diện TodoType
interface TodoType {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
}

// Định nghĩa kiểu dữ liệu cho state ban đầu
interface TodosState {
  status: "idle" | "loading";
  todos: TodoType[];
}

// State ban đầu
const initialState: TodosState = {
  status: "idle",
  todos: [],
};

// Tạo slice
const todosSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<"idle" | "loading">) => {
      state.status = action.payload;
    },
    setData: (state, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    },
  },
});

// Mutation cập nhật todo
export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedTodo: TodoType) => {
      return axios.put(
        `http://localhost:3001/todos/${updatedTodo.id}`,
        updatedTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
};

// Fetch todos
const fetchTodos = async (): Promise<TodoType[]> => {
  const { data } = await axios.get("http://localhost:3001/todos");
  return data;
};

export const useTodos = () => {
  return useQuery<TodoType[]>("todos", fetchTodos);
};

// Mutation thêm todo
export const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (newTodo: Omit<TodoType, "id">) => {
      return axios.post("http://localhost:3001/todos", newTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
};

// Mutation xóa todo
export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => {
      return axios.delete(`http://localhost:3001/todos/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );
};
export const { setStatus, setData } = todosSlice.actions;
export default todosSlice;
