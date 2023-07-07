import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (inputValue === "") return;

    const newTodo = {
      label: inputValue,
      done: false,
    };

    try {
      const updatedTodos = [...todos, newTodo];

      const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodos),
      });

      if (response.ok) {
        setTodos(updatedTodos);
        setInputValue("");
      } else {
        console.error("Error adding todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (index) => {
    const updatedTodos =  todos.filter((todo, currentIndex) => currentIndex !== index);
  
    try {
      const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodos),
      });
  
      if (response.ok) {
        setTodos(updatedTodos);
      } else {
        console.error("Error deleting todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="container">
      <h1>To Do</h1>
      <ul>
        <li key="search">
          <input
            type="text"
            placeholder="What to do today?"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={inputValue}
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            <div className="todo">
              {item.label}
              <span className="hiddenX" onClick={() => deleteTodo(index)}>
                <strong>X</strong>
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div>{todos.length ? `${todos.length} tasks to do` : "Add tasks!!"}</div>
    </div>
  );
};

export default Home;
