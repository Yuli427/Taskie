package net.javaguides.todo_management.service;

import net.javaguides.todo_management.dto.AiTodoRequest;
import net.javaguides.todo_management.dto.TodoDto;

public interface AiService {



    TodoDto generateTodo(AiTodoRequest request);



}
