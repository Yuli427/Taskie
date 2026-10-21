package net.javaguides.todo_management.service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender =mailSender;
    }
//    public void sendTestEmail(String to){
//
//        CreateEmailOptions email= CreateEmailOptions.builder()
//                .from("Todo App <onboarding@resend.dev>")
//                .to(to)
//                .subject("Todo App Test Email")
//                .html("<h2>Email works!</h2><p>Your Todo App can now send emails.</p>")
//                .build();
//        try {
//            CreateEmailResponse response = resend.emails().send(email);
//            System.out.println("Email ID: " + response.getId());
//        }catch (ResendException e){
//            System.out.println("Failed to send email: " + e.getMessage());
//        }
//
//    }

    public void sendVerificationEmail(String to, String verificationLink) {
    SimpleMailMessage message=new SimpleMailMessage();

    message.setFrom("smalltools933@gmail.com");
    message.setTo(to);
    message.setSubject("Verify your Todo App email");
    message.setText(
            "Please click the link below to verify your email:\n\n"
            + verificationLink
            + "\n\nThis link will expire in 1 hour.");

    mailSender.send(message);
    }

    public void sendPasswordResetEmail(String email, String token) {

        String resetLink =
                " http://localhost:3000/reset-password?token=" + token;

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Reset your password");
        message.setText(
                "Click the link below to reset your password:\n\n"
                        + resetLink
        );

        mailSender.send(message);
    }

}
