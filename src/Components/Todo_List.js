import axios from "axios";
import todoStyle from "./Todo_List.module.css";
import { useEffect, useState } from "react";

function TodoList() {

    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            // console.log("await", await response.json());
            setTodos(await response.json());
        } catch (error) {
            console.log("Error in fetching data from api", error);
        }
    }

    const handleAddTodo = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title: newTodo,
                    userId: 1,
                    completed: false,
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const newTodoData = await response.json();

            setTodos((prevTodos) => [...prevTodos, newTodoData]);
            setNewTodo('');

            console.log("res", newTodoData);

            // setTodos((prevTodos) => [...prevTodos, res.data]);
            // setNewTodo('');
        } catch (error) {
            console.log("Error in posting data into api", error);
        }
    }

    const handleUpdateTodo = async (id, compeleted) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    // id: 1,
                    // title: 'foo',
                    completed: false,
                    // userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === id ? { ...todo, compeleted } : todo))
            );

            console.log("res", response.data);
            return response.json();
        } catch (error) {
            console.log("Error in posting data into api", error);
        }
    }

    const handleDeleteTodo = async (id) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'delete',
            });

            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.log("Error in posting data into api", error);
        }
    }

    return (
        <>
            <div className={todoStyle.todoCntnr}>
                <h1>Todo List</h1>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id} className={todo.compeleted ? todoStyle.compeleted : ''}>
                            {todo.title} - Compeleted: {todo.compeleted ? 'Yes' : 'No'}
                            <div className={todoStyle.options}>
                                <button onClick={() => handleUpdateTodo(todo.id, !todo.compeleted)}>
                                    Toggle Compeleted
                                </button>
                                <button onClick={() => handleDeleteTodo(todo.id)} className={todoStyle.delete}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Enter new todo"
                    />
                    <button onClick={handleAddTodo}>
                        Add Todo
                    </button>
                </div>
            </div>
        </>
    )
}

export default TodoList;