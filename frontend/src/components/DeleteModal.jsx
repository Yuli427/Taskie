function DeleteModal({
showDeleteModal,
setShowDeleteModal,
todoToDelete,
handleDeleteTodo
}){
return(
    showDeleteModal && (
    <div className="y2k-modal-overlay">
      <div className="y2k-modal-window">

            <div className="y2k-titlebar">
                <span>Warning</span>

                <div className="y2k-window-controls">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                </div>

            <div className="y2k-modal-body">
            <div className="y2k-warning-icon">!</div>

            <div>
                <h3>Delete Todo?</h3>
                <p>Are you sure you want to delete this todo?</p>
            </div>
            </div>

            <div className="y2k-modal-actions">
            <button
                className="y2k-mini-button y2k-edit-button"
                onClick={() => setShowDeleteModal(false)}
            >
                Cancel
            </button>

            <button
                className="y2k-mini-button y2k-delete-button"
                onClick={() => handleDeleteTodo(todoToDelete)}
            >
                Delete
            </button>
            </div>

          </div>
        </div>
      
    )
)
}

export default DeleteModal