import TodoList from "./TodoList";
import {useState, useRef} from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {

    const [todos, setTodos] = useState([
    ]);

    const todoNameRef = useRef();

    const handleAddTodo = () => {
      // タスクを追加する
      const name = todoNameRef.current.value;
      if (name === "") return;
      setTodos((prevTodos) => {
        return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
      })
      todoNameRef.current.value = null;
    };

    const toggleTodo = (id) => {
      // タスクの完了状態を切り替える
      const newTodos = [...todos];
      const todo = newTodos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
      setTodos(newTodos);
    };

    const handleClear = () => {
      // 完了したタスクを削除する
      const newTodos = todos.filter((todo) => !todo.completed);
      setTodos(newTodos);
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input type="text" ref={todoNameRef} />
            <button onClick={handleAddTodo}>タスクを追加</button>
            <button onClick={handleClear}>完了したタスクの削除</button>
            <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
        </>
    );
}

export default App;
