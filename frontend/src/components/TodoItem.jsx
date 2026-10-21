function TodoItem({
  todo,
  editingTodoId,
  editTitle,
  setEditTitle,
  editDescription,
  setEditDescription,
  editDueDateTime,
  setEditDueDateTime,
  handleDeleteTodo,
  handleSaveTodo,
  handleEdit,
  handleToggleTodo,

  setTodoToDelete,
  setShowDeleteModal
}) {
  
  const timeRemaining = getTimeRemaining(todo.dueDateTime)
  
  return (
      <li
        className={`y2k-todo-card ${
          todo.completed ? 'y2k-todo-completed' : ''
        }`}
      >
      <div className="y2k-todo-content">

{/*title edit*/}
        {editingTodoId === todo.id ? (
          <input
            className="edit-input"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />          
        ) : (
          <h5>{todo.title}</h5>
        )}

{/*description edit*/}
        {editingTodoId == todo.id ? (
          <input
            className="edit-input"
            value={editDescription}
            onChange={(event) => setEditDescription(event.target.value)}
          />  
        ):(  <p>{todo.description}</p>    
        )}
        
{/*date time edit*/}
         {editingTodoId == todo.id ? (
          <input
            className="edit-input"
            type="datetime-local"
            value={editDueDateTime}
            onChange={(event) => setEditDueDateTime(event.target.value)}
          />  
        ):( todo.dueDateTime&&(
          <div
          className={`y2k-deadline-badge ${
            timeRemaining === 'Overdue' ? 'y2k-overdue-badge' : ''
          }`}
        >
          {timeRemaining}
        </div>)
        )}

      </div>
         
        <div className="y2k-todo-actions">
        <button
          className="y2k-mini-button y2k-delete-button"
          onClick={() => {
            setTodoToDelete(todo.id)
            setShowDeleteModal(true)
          }}
        >
          Delete
        </button>

        {editingTodoId === todo.id ? (
           <button
            className="y2k-mini-button y2k-save-button"
            onClick={() => handleSaveTodo(todo)}
          >
            Save
          </button>
        ) : (
          <button
            className="y2k-mini-button y2k-edit-button"
            onClick={() => handleEdit(todo)}
          >
            Edit
          </button>
        )}
  
      <button
        className="y2k-mini-button y2k-complete-button"
        onClick={() => handleToggleTodo(todo)}
      >
        {todo.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      </div>
  </li>
)
}
function getTimeRemaining(dueDateTime) {
  if (!dueDateTime) {
    return ''
  }

  const now = new Date()
  const due = new Date(dueDateTime)
  const difference = due - now

  if (difference <= 0) {
    return "Overdue"
  }

  const totalMinutes = Math.floor(difference / 1000 / 60)

  const days = Math.floor(totalMinutes / 60 / 24)
  const hours = Math.floor((totalMinutes / 60) % 24)
  const minutes = totalMinutes % 60

  return `${days} days ${hours} hours ${minutes} minutes left`
}

export default TodoItem