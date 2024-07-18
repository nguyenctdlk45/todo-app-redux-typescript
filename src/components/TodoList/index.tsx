import { Input, Button, Select, Tag, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState, RefObject } from "react";
import { useAddTodoMutation, useTodos, setStatus, setData } from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import { todosRemainingSelector } from "../../redux/selectors";
import Todo from "../Todo";
// import { TodoComment } from "typescript";

export interface TodoType {
  id: string;
  name: string;
  priority: "High" | "Medium" | "Low"; // Adjust the type if necessary
  completed: boolean;
}

export default function TodoList() {
  const [todoName, setTodoName] = useState<string>("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  const { data: todos, isLoading } = useTodos();

  const addTodoMutation = useAddTodoMutation();

  const dispatch = useDispatch();
  const todoList = useSelector(todosRemainingSelector);
  const todosListRef: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isLoading) {
      dispatch(setStatus("loading"));
    } else {
      dispatch(setStatus("idle"));
    }
    if (todos) {
      dispatch(setData(todos));
    }
  }, [isLoading, dispatch, todos]);
  console.log(todos);
  const handleAddButtonClick = () => {
    const newTodo: TodoType = {
      id: uuidv4(),
      name: todoName,
      priority: priority,
      completed: false,
    };

    addTodoMutation.mutate(newTodo);

    setTodoName("");
    setPriority("Medium");

    setTimeout(() => {
      if (todosListRef.current) {
        todosListRef.current.scrollTo({
          top: todosListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value);
  };

  const handlePriorityChange = (value: "High" | "Medium" | "Low") => {
    setPriority(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddButtonClick();
    }
  };

  return (
    <div className="container" style={{ position: "relative" }}>
      <div
        style={{
          overflowY: "auto",
          marginBottom: "5px",
          minHeight: "300px",
          maxHeight: "300px",
        }}
        ref={todosListRef}
      >
        {todoList?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo as TodoType} />
        ))}
      </div>
      <div
        style={{
          bottom: 0,
          marginBottom: "5px",
        }}
      >
        <Space.Compact style={{ display: "flex" }}>
          <Input
            value={todoName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}
