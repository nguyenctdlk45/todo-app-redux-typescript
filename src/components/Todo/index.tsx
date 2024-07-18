import { Row, Tag, Checkbox } from "antd";
import { useState } from "react";
import {
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../TodoList/todosSlice";
import { DeleteOutlined } from "@ant-design/icons";
import "../../App.css";
// import { UseMutationResult } from "react-query";

interface TodoType {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low"; // Use string literal types for priorities
  completed: boolean;
}

const priorityColorMapping: Record<TodoType["priority"], string> = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

interface TodoProps {
  todo: TodoType;
}

export default function Todo({ todo }: TodoProps) {
  const updateTodoMutation = useUpdateTodoMutation();
  const deleteTodoMutation = useDeleteTodoMutation();

  const [checked, setChecked] = useState<boolean>(todo.completed);

  const toggleCheckbox = () => {
    setChecked(!checked);
    const updatedTodo: TodoType = {
      ...todo,
      completed: !checked,
    };
    updateTodoMutation.mutate(updatedTodo);
  };

  const deleteTodo = () => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <Row justify="space-between" style={{ marginBottom: 3 }}>
      <Checkbox
        checked={checked}
        onChange={toggleCheckbox}
        style={checked ? { opacity: 0.5, textDecoration: "line-through" } : {}}
      >
        {todo.name}
      </Checkbox>
      <div>
        <Tag
          color={priorityColorMapping[todo.priority]}
          style={{
            margin: 0,
            ...(checked
              ? { opacity: 0.5, textDecoration: "line-through" }
              : {}),
          }}
        >
          {todo.priority}
        </Tag>
        <DeleteOutlined className="delete-icon" onClick={deleteTodo} />
      </div>
    </Row>
  );
}
