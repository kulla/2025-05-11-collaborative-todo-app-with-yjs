import * as Y from 'yjs'
import { equals } from 'ramda'
import { useRef, useState, useSyncExternalStore } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
}

const ydoc = new Y.Doc()
const yTodos = ydoc.getArray<Todo>('todos')

export default function App() {
  const prevTodos = useRef<Todo[] | null>(null)

  const todos = useSyncExternalStore(
    (callback) => {
      yTodos.observeDeep(callback)

      return () => {
        yTodos.unobserveDeep(callback)
      }
    },
    () => {
      const todos = yTodos.toArray()

      if (prevTodos.current && equals(todos, prevTodos.current)) {
        return prevTodos.current
      }

      prevTodos.current = todos
      return todos
    },
  )
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim() === '') return
    yTodos.push([{ id: Date.now(), text: input }])
    setInput('')
  }

  const deleteTodo = (id: number) => {
    yTodos.delete(yTodos.toArray().findIndex((todo) => todo.id === id))
  }

  return (
    <main className="prose p-10">
      <h1>Todo List</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={addTodo} className="btn btn-primary" type="button">
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
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
