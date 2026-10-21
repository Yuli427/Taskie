package net.javaguides.todo_management.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.AiTodoRequest;
import net.javaguides.todo_management.dto.TodoDto;
import net.javaguides.todo_management.service.AiService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping("/api/ai")
public class AiController {


    private final AiService aiService;



    @PostMapping("/generate-todo")
    public TodoDto generateTodo(@RequestBody AiTodoRequest request){
        return aiService.generateTodo(request);

    }


}
