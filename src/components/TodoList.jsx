import React, { useState, useEffect } from 'react';
import Header from './Header';
import Todos from './Todos';
import GpsInfo from './GpsInfo';

const TodoList = () => {
  const [loaded, setLoaded] = useState(false);
  const [todos, setTodos] = useState([]);
  const key = "gps-data";

  useEffect(() => {
    const loadGpsDataFromLocalStorage = () => {
      if (typeof Storage !== "undefined") {
        const data = JSON.parse(window.localStorage.getItem(key));
        if (data && data.todos !== undefined) {
          return data.todos;
        }
        return null;
      }
    };

    async function loadData() {
      const localTodos = loadGpsDataFromLocalStorage();

      if ((localTodos !== null)) {
        setTodos(localTodos);
      } else {
        setTodos([]);
      }
    }
    loadData();
    setLoaded(true);
  }, []);

  useEffect(() => {
    const saveGpsDataToLocalStorage = () => {
      if (typeof Storage !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify({ todos: todos }));
      }
    };

    if (loaded) {
      saveGpsDataToLocalStorage();
    }
  }, [loaded, todos]);

  const addTodo = (todo) => {
    // Limit the number of todos to 50
    if ((todos !== null) && (todos.length > 49)) {
      return;
    }
    const todosCopy = [...todos];
    todosCopy.push(todo);
    setTodos(todosCopy);
  }

  const renderTodos = () => {
    if (todos && loaded) {
      return <Todos todos={todos} setTodos={setTodos} />
    } else if (!loaded) {
      return <h2>Loading...</h2>
    } else {
      return;
    }
  }

  return (
    <>
      <Header text="GPS Points" />
      <GpsInfo add={addTodo} />
      {renderTodos()}
    </>
  );
}

export default TodoList;