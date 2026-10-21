package net.javaguides.todo_management.service.Impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.TodoDto;
import net.javaguides.todo_management.entity.Todo;
import net.javaguides.todo_management.entity.User;
import net.javaguides.todo_management.exception.ResourceNotFoundException;
import net.javaguides.todo_management.repository.TodoRepository;
import net.javaguides.todo_management.repository.UserRepository;
import net.javaguides.todo_management.service.TodoService;

import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;
    private ModelMapper modelMapper;
    private UserRepository userRepository;




    private User getCurrentUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String usernameOrEmail = authentication.getName();

        return userRepository
                .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Current user not found")
                );
    }

    @Override
    public TodoDto addTodo(TodoDto todoDto) {
//       Todo todo=new Todo();
//       todo.setTitle(todoDto.getTitle());
//       todo.setDescription(todoDto.getDescription());
//       todo.setCompleted((todoDto.isCompleted()));


        Todo todo=modelMapper.map(todoDto,Todo.class);
        todo.setUser(getCurrentUser());

        Todo savedTodo=todoRepository.save(todo);

        TodoDto savedTodoDto=modelMapper.map(savedTodo,TodoDto.class);

//        savedTodoDto.setId(savedTodo.getId());
//        savedTodoDto.setDescription(savedTodo.getDescription());
//        savedTodoDto.setTitle(savedTodo.getTitle());
//        savedTodoDto.setCompleted(savedTodo.isCompleted());

        return savedTodoDto;



    }

    @Override
    public TodoDto getTodo(Long id) {

        Todo todo=todoRepository.findByIdAndUser(id,getCurrentUser()).
                orElseThrow(()-> new ResourceNotFoundException("Todo not found"));

        return modelMapper.map(todo,TodoDto.class);


    }

    @Override
    public List<TodoDto> getAllTodo() {
        User currentUser = getCurrentUser();
        List<Todo>todos=todoRepository.findByUser(currentUser);

        return todos.stream().map((todo)->modelMapper
                .map(todo,TodoDto.class)).collect(Collectors.toList());


    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo=todoRepository.findByIdAndUser(id, getCurrentUser()).orElseThrow(()-> new ResourceNotFoundException("Resource not found with id"+id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        todoRepository.save(todo);

        return modelMapper.map(todo,TodoDto.class);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo=todoRepository.findByIdAndUser(id, getCurrentUser()).orElseThrow(()-> new ResourceNotFoundException("Resource not found with id"+id));
        todoRepository.delete(todo);
    }

    @Override
    public TodoDto markComplete(Long id) {
        Todo todo=todoRepository.findByIdAndUser(id, getCurrentUser()).orElseThrow(()-> new ResourceNotFoundException("Resource not found with id"+id));
        todo.setCompleted(true);

        Todo updatedTodo=todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);
    }

    @Override
    public TodoDto markIncomplete(Long id) {
        Todo todo=todoRepository.findByIdAndUser(id, getCurrentUser()).orElseThrow(()-> new ResourceNotFoundException("Resource not found with id"+id));

        todo.setCompleted(false);
        Todo updatedTodo=todoRepository.save(todo);
        return modelMapper.map(updatedTodo,TodoDto.class);

    }


}
