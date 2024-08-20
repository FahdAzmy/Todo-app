import TodoList from "./components/TodoList";
import "./App.css";
import { v4 as id } from "uuid";

import { todocContext } from "./components/contexts/TodoContexst";
import { React, useState } from "react";
const initailTodos = [
  {
    id: id(),
    title: "Finish Todo Project",
    detials: "Tarmiiz Academy",
    isCompleted: false,
  },
  {
    id: id(),
    title: "Finish Todo Add",
    detials: "Myself",
    isCompleted: false,
  },
  {
    id: id(),
    title: "Fininsh Social Media App",
    detials: "Youtube",
    isCompleted: false,
  },
  {
    id: id(),
    title: "Fininsh Social Media App",
    detials: "Youtube",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initailTodos);

  return (
    <todocContext.Provider value={{ todos: todos, setTodos: setTodos }}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
        }}
      >
        <TodoList />
      </div>
    </todocContext.Provider>
  );
}

export default App;
