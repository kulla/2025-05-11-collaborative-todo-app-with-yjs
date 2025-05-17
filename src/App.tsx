import { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim() === '') return
    setTodos([...todos, { id: Date.now(), text: input }])
    setInput('')
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <main className="prose p-10">
      <h1 className="text-center">Todo List</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo"
            className="input input-bordered w-full max-w-xs"
          />
          <button onClick={addTodo} className="btn btn-primary">
            Add
          </button>
        </div>
        <ul className="w-full max-w-xs">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 border-b border-gray-300"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-error btn-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
