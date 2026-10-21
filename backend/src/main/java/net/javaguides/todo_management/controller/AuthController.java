package net.javaguides.todo_management.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.*;
import net.javaguides.todo_management.service.AuthService;
import net.javaguides.todo_management.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;
    private final EmailService emailService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response= authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        String token= authService.login(loginDto);
        JwtAuthResponse jwtAuthResponse =new JwtAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }
    @GetMapping("/verify-email")
    public ResponseEntity<String>verifyEmail(@RequestParam String token){

        return ResponseEntity.ok(authService.verifyEmail(token));


    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        authService.forgetPassword(forgotPasswordDto);

        return ResponseEntity.ok(
                "If this email exists, a password reset link has been sent."
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordDto resetPasswordDto) {
        authService.resetPassword(resetPasswordDto);

        return ResponseEntity.ok(
                "Password reset successfully."
        );
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationEmail(
            @RequestBody ResendVerificationDto dto
    ) {
        authService.resendVerificationEmail(dto);

        return ResponseEntity.ok(
                "Verification email sent successfully."
        );
    }


}
