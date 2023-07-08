import React, { useState, useEffect } from "react";

const TodoItem = ({ item, onDelete }) => {
  return (
    <li>
      <div className="todo">
        {item}
        <span className="hiddenX" onClick={onDelete}>
          <strong>X</strong>
        </span>
      </div>
    </li>
  );
};

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha"
      );
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

    const updatedTodos = [...todos, newTodo];

    try {
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodos),
        }
      );

      setTodos(updatedTodos);
      setInputValue("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (index) => {
    const updatedTodos = todos.filter((_, currentIndex) => currentIndex !== index);

    try {
      let response;
      if (updatedTodos.length) {
        response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTodos),
        });
      } else {
        response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error deleting todo");
        }

        // Create the user "jimmyhaha" with an empty todo list using POST
        response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        });

        if (!response.ok) {
          throw new Error("Error creating user");
        }
      }

      if (response.ok) {
        setTodos(updatedTodos);
      } else {
        console.error("Error deleting todo:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const deleteAllTodos = async () => {
    try {
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      // Create the user "jimmyhaha" with an empty todo list using POST
      await fetch(
        "https://assets.breatheco.de/apis/fake/todos/user/jimmyhaha",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]),
        }
      );
  
      setTodos([]); // Set todos to an empty array
    } catch (error) {
      console.error("Error deleting all todos:", error);
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
          />
        </li>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            item={todo.label}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </ul>
      <div>{todos.length ? `${todos.length} tasks to do` : "Add tasks!!"}</div>
      <button className="deleteAllButton" onClick={deleteAllTodos}>
        Delete All
      </button>
    </div>
  );
};

export default Home;
