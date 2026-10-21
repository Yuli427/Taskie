package net.javaguides.todo_management.service;

import net.javaguides.todo_management.dto.TodoDto;

import java.util.List;

public interface TodoService {
    public TodoDto addTodo(TodoDto  todoDto);

    public TodoDto getTodo(Long id);

    public List<TodoDto>getAllTodo();

    public TodoDto updateTodo(TodoDto todoDto,Long id);

    public void deleteTodo(Long id);

    public TodoDto markComplete(Long id);

    public TodoDto markIncomplete(Long id);
}
