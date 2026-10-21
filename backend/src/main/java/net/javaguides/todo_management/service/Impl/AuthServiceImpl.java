package net.javaguides.todo_management.service.Impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.*;
import net.javaguides.todo_management.entity.Role;
import net.javaguides.todo_management.entity.User;
import net.javaguides.todo_management.exception.EmailNotVerifiedException;
import net.javaguides.todo_management.exception.ResourceNotFoundException;
import net.javaguides.todo_management.exception.TodoAPIException;
import net.javaguides.todo_management.repository.RoleRepository;
import net.javaguides.todo_management.repository.UserRepository;
import net.javaguides.todo_management.security.JwtTokenProvider;
import net.javaguides.todo_management.service.AuthService;
import net.javaguides.todo_management.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository rolerepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider tokenProvider;
    private final EmailService emailService;
    @Override
    public String register(RegisterDto registerDto) {

        if (userRepository.existsByUsername(registerDto.getUsername())){
            throw  new TodoAPIException(HttpStatus.BAD_REQUEST,"User name already exists.");
        }

        if (userRepository.existsByEmail(registerDto.getEmail())){
            throw  new TodoAPIException(HttpStatus.BAD_REQUEST,"Email already exists.");
        }

        User user=new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        String verificationToken= UUID.randomUUID().toString();

        user.setEmailVerified(false);
        user.setVerificationToken(verificationToken);
        user.setVerificationTokenExpiry(LocalDateTime.now().plusHours(1));

        Set<Role> roles=new HashSet<>();
        Role userRole=rolerepository.findByName("ROLE_USER");
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        String verificationLink =
                "http://localhost:8080/api/auth/verify-email?token="
                        + verificationToken;

        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationLink);



        return "User register successfully.";

    }

    @Override
    public String login(LoginDto loginDto) {
        User user=userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),loginDto.getUsernameOrEmail())
                .orElseThrow(()->new RuntimeException("Invalid username or email"));

        if(!user.getEmailVerified()){
            throw new EmailNotVerifiedException("Please verify your email first.");
        }


       Authentication authentication =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
               loginDto.getUsernameOrEmail(),
               loginDto.getPassword()
       ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token=tokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String verifyEmail(String token) {
        User user=userRepository.findByVerificationToken(token)
                .orElseThrow(()->new TodoAPIException(HttpStatus.BAD_REQUEST,
                        "Invalid verification token"));


        if (user.getVerificationTokenExpiry().isBefore(LocalDateTime.now())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST,
                    "Verification token has expired."
            );
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);

        userRepository.save(user);
        return "Email verified successfully.";


    }

    @Override
    public void forgetPassword(ForgotPasswordDto forgotPasswordDto) {

        User user=userRepository.findByUsernameOrEmail(forgotPasswordDto.getEmail(),forgotPasswordDto.getEmail())
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));

        String token = UUID.randomUUID().toString();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(
                LocalDateTime.now().plusMinutes(30)
        );
        userRepository.save(user);
        emailService.sendPasswordResetEmail(user.getEmail(),token);
    }

    @Override
    public void resetPassword(ResetPasswordDto resetPasswordDto) {
        User user=userRepository.findByPasswordResetToken(resetPasswordDto.getToken())
                .orElseThrow(()-> new RuntimeException("Invalid password reset token"));
        if (user.getPasswordResetToken()==null || user.getPasswordResetTokenExpiry().isBefore(LocalDateTime.now())){
            throw new RuntimeException("Password reset token has expired");

        }
        user.setPassword(passwordEncoder.encode(resetPasswordDto.getNewPassword()));

        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);

        userRepository.save(user);

    }

    @Override
    public void resendVerificationEmail(ResendVerificationDto resendVerificationDto) {
        User user = userRepository
                .findByUsernameOrEmail(resendVerificationDto.getEmail(), resendVerificationDto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getEmailVerified()) {
            throw new RuntimeException("Email is already verified");
        }

        String newToken = UUID.randomUUID().toString();

        user.setVerificationToken(newToken);
        user.setVerificationTokenExpiry(
                LocalDateTime.now().plusMinutes(30)
        );

        userRepository.save(user);

        String verificationLink =
                "http://localhost:8080/api/auth/verify-email?token="
                        + newToken;

        emailService.sendVerificationEmail(
                user.getEmail(),
                verificationLink
        );
    }
}
