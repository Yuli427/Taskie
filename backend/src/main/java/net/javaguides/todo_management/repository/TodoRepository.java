package net.javaguides.todo_management.repository;

import net.javaguides.todo_management.entity.Todo;
import net.javaguides.todo_management.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TodoRepository extends JpaRepository<Todo,Long> {

    List<Todo> findByUser(User user);

    Optional<Todo> findByIdAndUser(Long id, User user);
}
