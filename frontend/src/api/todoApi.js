import axios from 'axios'


const TODO_API_URL = 'https://stake-meeting-enemies-purple.trycloudflare.com/api/todos'

export function getAllTodos() {
  const token = localStorage.getItem('accessToken')

  return axios.get(TODO_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function createTodo(todoData) {
  const token = localStorage.getItem('accessToken')

  return axios.post(TODO_API_URL, todoData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function deleteTodo(id) {
  const token = localStorage.getItem('accessToken')

  return axios.delete(`${TODO_API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function markTodoComplete(id) {
  const token = localStorage.getItem('accessToken')

  return axios.patch(
    `${TODO_API_URL}/${id}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export function markTodoIncomplete(id) {
  const token = localStorage.getItem('accessToken')

  return axios.patch(
    `${TODO_API_URL}/${id}/in-complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}

export function updateTodo(id, todoData) {
  const token = localStorage.getItem('accessToken')

  return axios.put(
    `${TODO_API_URL}/${id}`,
    todoData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
}