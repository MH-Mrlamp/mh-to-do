import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const LOCAL_STORAGE_KEY = "react-todo-list-todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageTodos) {
      setTodos(storageTodos);
    };
  }, []);


    useEffect(() => {
    // fires when todos array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

    function addTodo(todo) {
    // adds new todo to beginning of todos array
    setTodos([todo, ...todos]);
  }

  function toggleComplete(id) {
    setTodos(
     todos.map(todo => {
      if (todo.id === id) {
        return {
         ...todo,
          completed: !todo.completed
         };
        }
      return todo;
    })
   );
  }

  function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
        console.log(todos)
  }

  return (
    <Container maxWidth="sm">
      <Typography style={{ padding: 16 }} variant="h2">React Todo</Typography>
      <Container>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          toggleComplete={toggleComplete}
        />
      </Container>
    </Container>
  )
}


export default App;