package net.javaguides.todo_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AiTodoResponse {
    private String title;
    private String description;
    private LocalDateTime dueDateTime;
}
