function TodoFilters({
 setFilter
}){
    return (
     <div className="y2k-filters">
      <button onClick={() => setFilter('all')}>
        All
      </button>

      <button onClick={() => setFilter('active')}>
        Active
      </button>

      <button onClick={() => setFilter('completed')}>
        Completed
      </button>

      <button onClick={() => setFilter('overdue')}>
        Overdue
      </button>
    </div>
    )

}
export default TodoFilters