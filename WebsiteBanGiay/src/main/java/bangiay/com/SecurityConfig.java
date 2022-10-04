package bangiay.com;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig{

	@Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.formLogin();
        return http.build();
    }
	
	@Bean
	public InMemoryUserDetailsManager configureAuthentication() {
		return new InMemoryUserDetailsManager();
	}
}
