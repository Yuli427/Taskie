package net.javaguides.todo_management.service.Impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.AiTodoRequest;
import net.javaguides.todo_management.dto.AiTodoResponse;
import net.javaguides.todo_management.dto.TodoDto;
import net.javaguides.todo_management.entity.Todo;
import net.javaguides.todo_management.entity.User;
import net.javaguides.todo_management.exception.ResourceNotFoundException;
import net.javaguides.todo_management.repository.TodoRepository;
import net.javaguides.todo_management.repository.UserRepository;
import net.javaguides.todo_management.service.AiService;
import net.javaguides.todo_management.service.TodoService;
import org.modelmapper.ModelMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;


@Service
public class AiServiceImpl implements AiService {

    private final ChatClient chatClient;
    private final TodoRepository todoRepository;
    private final ModelMapper modelMapper;
    private final PromptTemplate promptTemplate;
    private final UserRepository userRepository;


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


    public AiServiceImpl(ChatClient.Builder chatClientBuilder,
                         TodoRepository todoRepository,
                         ModelMapper modelMapper,UserRepository userRepository) {

        this.chatClient = chatClientBuilder.build();
        this.todoRepository = todoRepository;
        this.modelMapper = modelMapper;
        this.userRepository=userRepository;

        this.promptTemplate =
                new PromptTemplate(
                        new ClassPathResource("prompts/generate-todo.st")
                );
    }


    @Override
    public TodoDto generateTodo(AiTodoRequest request) {
        AiTodoResponse response= chatClient
                .prompt(
                        promptTemplate.create(
                                Map.of(
                                        "prompt",request.getPrompt(),
                                        "currentTime", LocalDateTime.now()
                                )
                        )
                )
                .call()
                .entity(AiTodoResponse.class);

        Todo todo= new Todo();
        todo.setTitle(response.getTitle());
        todo.setDescription(response.getDescription());
        todo.setDueDateTime(response.getDueDateTime());
        todo.setCompleted(false);
        todo.setUser(getCurrentUser());
        Todo savedTodo= todoRepository.save(todo);
        return modelMapper.map(savedTodo,TodoDto.class);
    }
}
