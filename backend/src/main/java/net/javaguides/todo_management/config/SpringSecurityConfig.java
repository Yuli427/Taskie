package net.javaguides.todo_management.config;

import lombok.AllArgsConstructor;
import net.javaguides.todo_management.dto.JwtAuthResponse;
import net.javaguides.todo_management.security.JwtAuthenticationEntryPoint;
import net.javaguides.todo_management.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;

    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests((authorize)-> {
//                    authorize.requestMatchers(HttpMethod.POST,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.PUT,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.DELETE,"/api/**").hasRole("ADMIN");
//                    authorize.requestMatchers(HttpMethod.GET,"/api/**").permitAll();
//                    authorize.requestMatchers(HttpMethod.PATCH,"/api/**").hasAnyRole("ADMIN","USER");
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.requestMatchers("/api/ai/**").permitAll();
                    authorize.anyRequest().authenticated();}).httpBasic(Customizer.withDefaults());

        http.exceptionHandling(httpSecurityExceptionHandlingConfigurer ->
                httpSecurityExceptionHandlingConfigurer
                        .authenticationEntryPoint(authenticationEntryPoint));
        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        //Open the access control system
        http.cors(Customizer.withDefaults());

        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration){
        return configuration.getAuthenticationManager();

    }


    //Set visitor whitelist
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        //允许哪个前端地址访问后端
        configuration.setAllowedOrigins(
                List.of("http://localhost:3000")
        );
        //允许前端使用哪些 HTTP 方法
        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH")
        );
        //允许发送 Content-Type 和 JWT Authorization 请求头
        configuration.setAllowedHeaders(
                List.of("Authorization", "Content-Type")
        );
        //让所有后端路径使用这套 CORS 配置
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

//    @Bean
//    public UserDetailsService userDetailsService(){
//
//        UserDetails yultuz= User.builder()
//                .username("yultuz")
//                .password(passwordEncoder().encode("12345"))
//                .roles("USER")
//                .build();
//
//        UserDetails admin= User.builder()
//                .username("admin")
//                .password(passwordEncoder().encode("12345"))
//                .roles("ADMIN")
//                .build();
//
//        return new InMemoryUserDetailsManager(yultuz,admin);
//    }
}
