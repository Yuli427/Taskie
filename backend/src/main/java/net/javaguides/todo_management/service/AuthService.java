package net.javaguides.todo_management.service;

import net.javaguides.todo_management.dto.*;

public interface AuthService {
    String register(RegisterDto registerDto);
    String login(LoginDto loginDto);
    String verifyEmail(String token);
    void forgetPassword(ForgotPasswordDto forgotPasswordDto);
    void resetPassword(ResetPasswordDto resetPasswordDto);
    void resendVerificationEmail(ResendVerificationDto resendVerificationDto);
}
