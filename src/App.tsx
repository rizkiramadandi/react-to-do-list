import { useState } from 'react'
import "./styles.css"

class Todo {
  text: string
  isDone: boolean

  constructor(text: string) {
    this.text = text
    this.isDone = false
  }

  getText() {
    return this.text
  }
}

function App() {
  const [todos, setTodos] = useState([new Todo("Learn React.js")])
  const [todo, setTodo] = useState("")

  const addTodo = () => {
    if(todo) {
      setTodos([...todos, new Todo(todo)])
      setTodo("")
    }
  }

  const deleteTodo = (delIdx: number) => {
    const newTodos = todos.filter((todo, idx)=> idx != delIdx)
    setTodos(newTodos)
  }

  const goUp = (moveIdx: number) => {
    const movedTodo = todos.splice(moveIdx, 1)[0]
    todos.splice(moveIdx - 1, 0, movedTodo)
    const newTodos = [...todos]
    setTodos(newTodos)
  }

  const goDown = (moveIdx: number) => {
    const movedTodo = todos.splice(moveIdx, 1)[0]
    todos.splice(moveIdx + 1, 0, movedTodo)
    const newTodos = [...todos]
    setTodos(newTodos)
  }

  const updateDone = (isChecked: boolean, updateIdx: number) => {
    todos[updateIdx].isDone = isChecked
    const newTodos = [...todos]
    setTodos(newTodos)
  }

  return (
    <div className="App">
      <h1>React To-Do List App</h1>
      
      <div className="new-todo-container">
        <input className="new-todo" type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder="New todo here" />
        <button className="add-todo" onClick={addTodo} title="Add">Add</button>
      </div>

      {todos?.length > 0 ? (
      <ul className="list">
        {todos.map((todo, idx)=>(
          <div className={`todo-container ${todo.isDone ? "active":""}`}>
            <div className="order-container">
              {idx > 0 ? (
              <span className="go-up" role="button" onClick={()=>goUp(idx)} title="Move up">↑</span>
              ) : null}
              {idx < todos.length-1 ? (
              <span className="go-down" role="button" onClick={()=>goDown(idx)} title="Move down">↓</span>
              ) : null}
            </div>
            <li className="todo" key={idx}>{todo.text}</li>
            <div className="action">
              <input className="mark-todo" role="button" type="checkbox" defaultChecked={todo.isDone} onChange={(e)=>updateDone(e.target.checked, idx)} checked={todo.isDone} />
              <span className="delete-todo" onClick={()=>deleteTodo(idx)} title="Delete">Delete</span>
            </div>
          </div>
        ))}
      </ul>
      ) : (
        <div className="not-found">No To-Do Found</div>
      )}
    </div>
  )
}

export default App
