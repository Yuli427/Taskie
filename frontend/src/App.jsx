import { useEffect,useState } from 'react'
import './App.css'
import { login } from './api/authApi'
import { register } from './api/authApi'
import { getAllTodos ,createTodo, deleteTodo, markTodoComplete,markTodoIncomplete, updateTodo} from './api/todoApi'
import{generateTodo} from'./api/aiApi'
import { Routes, Route } from 'react-router-dom'
import ForgotPassword from './components/ForgotPassword'
import ResendVerification from './components/ResendVerification'
import Login from './components/Login'
import Register from './components/Register'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import DeleteModal from './components/DeleteModal'
import AiTodoAssistant from './components/AiTodoAssistant'

import ResetPassword from './components/ResetPassword'

function App() {
  const [todoText, setTodoText] = useState('')
  const [todos, setTodos] = useState([])
  const [description, setDescription] = useState('')
  const [dueDateTime, setDueDateTime] = useState('')

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const[name,setName]=useState('')
  const[username,setUsername]=useState('')
  const[email,setEmail]=useState('')
  const [registerPassword, setRegisterPassword] = useState('')


  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDueDateTime, setEditDueDateTime] = useState('')

  const[filter,setFilter]=useState('all')

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [todoToDelete, setTodoToDelete] = useState(null)

  const [showRegister, setShowRegister] = useState(false)
  const [registerSubmitted, setRegisterSubmitted] = useState(false)

  const [loginError, setLoginError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerError, setRegisterError] = useState('')

  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);


  


  let filteredTodos
  if (filter === 'all') {
    filteredTodos = todos
  } else if (filter === 'active') {
    filteredTodos  = todos.filter((todo)=>todo.completed===false)
  } else if (filter === 'completed') {
    filteredTodos = todos.filter((todo)=>todo.completed===true)
  }else if (filter === 'overdue'){
    filteredTodos = todos.filter((todo)=>todo.dueDateTime && new Date(todo.dueDateTime)< new Date())
  } else {
    filteredTodos = []
  }


  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem('accessToken') !== null
)



  //login
  async function handleLogin(event) {
  event.preventDefault()
  try {
    const response = await login({
      usernameOrEmail,
      password
    })
    localStorage.setItem('accessToken', response.data.accessToken)
    setIsLoggedIn(true)
    
  } catch (error) {
    console.error(error)

    setLoginError(
      error.response?.data?.message||
      error.response?.data||
      'Email or password is not correct'
    )
  }
}

function handleLogout() {
  localStorage.removeItem('accessToken')
  setIsLoggedIn(false)
  setTodos([])
}

//register
async function handleRegister(event) {
  event.preventDefault()
  setRegisterSubmitted(true)
  setRegisterSuccess('')
  setRegisterError('')
  if (
  name.trim() === '' ||
  username.trim() === '' ||
  email.trim() === '' ||
  registerPassword.trim() === ''
  ) {
    return
  }
  
  try {
    const response = await register({
      name: name,
      username: username,
      email: email,
      password: registerPassword
    })

    setRegisterSuccess(
      response.data?.message||
       'Registration successful. Please check your email to verify your account.'
    )
  } catch (error) {
    console.error(error)

    setRegisterError(
       error.response?.data?.message ||
      error.response?.data ||
      'Registration failed'
    )
  }
}
  
//Addtodo
  async function handleAddTodo() {
    if (todoText.trim() === '') {
      return
    }
      
    try {
    const response = await createTodo({
      title: todoText,
      description: description,
      completed: false,
      dueDateTime: dueDateTime
    })

    setTodos([...todos, response.data])
    setTodoText('')
    setDescription('')
    setDueDateTime('')

  }catch(error){
    console.error(error)
  }}

  //getalltodos
  async function handleLoadTodos() {
  try {
    const response = await getAllTodos()
    setTodos(response.data)
  } catch (error) {
    console.error(error)
  }

}

useEffect(() => {
  if (isLoggedIn) {
    handleLoadTodos()
  }
}, [isLoggedIn])


  async function handleDeleteTodo(id) {
  try {
    await deleteTodo(id)

    setTodos(
      todos.filter((todo) => todo.id !== id)
    )

    setShowDeleteModal(false)
    setTodoToDelete(null)

  } catch (error) {
    console.error(error)
  }
}//mark comolete or incomplete
async function handleToggleTodo(todo) {
  try {
    const response = todo.completed
      ? await markTodoIncomplete(todo.id)
      : await markTodoComplete(todo.id)

    setTodos(
      todos.map((item) =>
        item.id === todo.id ? response.data : item
      )
    )
  } catch (error) {
    console.error(error)
  }
}

//update todo
function handleEdit(todo) {
 
  setEditingTodoId(todo.id)
  setEditTitle(todo.title)
  setEditDescription(todo.description)
  setEditDueDateTime(todo.dueDateTime || '')
}

//handle save
async function handleSaveTodo(todo) {
  if (editTitle.trim()===''|| editDescription.trim()===''){
    return
  } 
  try {
    const response = await updateTodo(todo.id, {
      title: editTitle,
      description: editDescription,
      dueDateTime:editDueDateTime,
      completed: todo.completed
    })

    setTodos(
    todos.map((item) =>
    item.id === todo.id ? response.data : item
      )
    )
    setEditingTodoId(null)
  } catch (error) {
    console.error(error)
  }
}
//ai generate
async function handleGenerateTodo() {
  if (aiPrompt.trim() === '') {
    return
  }

  setIsGenerating(true)

  try {
    const generatedTodo = await generateTodo(aiPrompt)

    setTodos((previousTodos) => [
      ...previousTodos,
      generatedTodo
    ])

    setAiPrompt('')
  } catch (error) {
    console.error(error)
  } finally {
    setIsGenerating(false)
  }
}



  return (
  <Routes>
      <Route
      path="/reset-password"
      element={<ResetPassword/>}
      />
      <Route
        path="/forgot-password"
       element={<ForgotPassword/>}
      />
      <Route
        path="/resend-verification"
        element={<ResendVerification
          setLoginError={setLoginError} 
          />}
      />
    <Route
    path="*"
    element={
    !isLoggedIn ? (
            <>
  {/* login */}
  {!showRegister?(<Login
    usernameOrEmail={usernameOrEmail}
    setUsernameOrEmail={setUsernameOrEmail}
    password={password}
    setPassword={setPassword}
    handleLogin={handleLogin}
    setShowRegister={setShowRegister}
    setRegisterSubmitted={setRegisterSubmitted}
    loginError={loginError}
    setLoginError={setLoginError}
    setRegisterSuccess={setRegisterSuccess}
    setRegisterError={setRegisterError}
    

  />):(
    <Register
    name={name}
    setName={setName}
    username={username}
    setUsername={setUsername}
    email={email}
    setEmail={setEmail}
    registerPassword={registerPassword}
    setRegisterPassword={setRegisterPassword}
    handleRegister={handleRegister}
    registerSuccess={registerSuccess}
    registerError={registerError}
    setShowRegister={setShowRegister}
    registerSubmitted={registerSubmitted}
    setRegisterSubmitted={setRegisterSubmitted}
    setLoginError={setLoginError}
    setRegisterSuccess={setRegisterSuccess}
    setRegisterError={setRegisterError}
  />
  )}

</>
):(


<div className="y2k-dashboard-page">
  <div className="y2k-dashboard-window">

    <div className="y2k-titlebar">

      <div className="y2k-window-controls">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div className="y2k-dashboard-body">


    <div className="y2k-dashboard-header">
    <div>
      <h1>Taskie</h1>
      <p>Organize your tasks and stay on track ✦</p>
    </div>

    <button
      className="y2k-button y2k-logout-button"
      onClick={() => {
        handleLogout()
        setLoginError('')
        setUsernameOrEmail('')
        setPassword('')
      }}
    >
      Logout
    </button>
    </div>
  <div className="y2k-main-grid">

  <AiTodoAssistant
    aiPrompt={aiPrompt}
    setAiPrompt={setAiPrompt}
    isGenerating={isGenerating}
    handleGenerateTodo={handleGenerateTodo}
  />

  <TodoForm
    todoText={todoText}
    setTodoText={setTodoText}
    description={description}
    setDescription={setDescription}
    dueDateTime={dueDateTime}
    setDueDateTime={setDueDateTime}
    handleAddTodo={handleAddTodo}
  />

  </div>


    {/* todo filter */}
    <TodoFilters
    setFilter={setFilter}
    />
         
     {/* todo list*/}
      <TodoList
        todos={filteredTodos}
        editingTodoId={editingTodoId}

        editTitle={editTitle}
        setEditTitle={setEditTitle}

        editDescription={editDescription}
        setEditDescription={setEditDescription}
        
        editDueDateTime={editDueDateTime}
        setEditDueDateTime={setEditDueDateTime}
       
   
        handleDeleteTodo={handleDeleteTodo}
        handleSaveTodo={handleSaveTodo}
        handleEdit={handleEdit}
        handleToggleTodo={handleToggleTodo}

        setTodoToDelete={setTodoToDelete}
        setShowDeleteModal={setShowDeleteModal}
    />

    {/* deleteModal */}

    <DeleteModal
    showDeleteModal={showDeleteModal}
    setShowDeleteModal={setShowDeleteModal}
    todoToDelete={todoToDelete}
    handleDeleteTodo={handleDeleteTodo}
    />





      </div> 
    </div>    
  </div>     
)
}
/>
</Routes>
)
}

export default App
