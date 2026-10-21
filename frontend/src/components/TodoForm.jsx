function TodoForm({
  todoText,
  setTodoText,
  description,
  setDescription,
  dueDateTime,
  setDueDateTime,
  handleAddTodo,
}) { return(
      
      <div className="y2k-todo-form">
       <div className="y2k-field">
        <label>Task Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a todo"
          value={todoText}
          onChange={(event) => setTodoText(event.target.value)}
        />
      </div>
        
      <div className="y2k-field">
        <label>Due Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={dueDateTime}
          onChange={(event) => setDueDateTime(event.target.value)}
        />
      </div>

      <div className="y2k-field">
        <label>Description</label>
        <textarea
          rows={4}
          className="form-control"
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <button
        type="button"
        className="y2k-button y2k-button-primary y2k-add-button"
        onClick={handleAddTodo}
      >
        Add Task
      </button>
      </div>
)}
export default TodoForm