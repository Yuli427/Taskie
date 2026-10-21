import TodoItem from "./TodoItem"

function TodoList({
  todos,
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
}){
    return(<ul className="list-group mt-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
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
      ))}
    </ul>)
}
export default TodoList