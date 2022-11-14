package bangiay.com.authConfig;


import bangiay.com.jwt.JwtEntrypoint;
import bangiay.com.jwt.JwtFilter;
import bangiay.com.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AuthConfig {
    @Autowired
    JwtEntrypoint jwtEntrypoint;
    @Autowired
    AccountService accountService;

    @Autowired
    JwtFilter jwtFilter;



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }




    @Bean
    public AuthenticationManager authenticationManagerBean(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(accountService)
                .passwordEncoder(passwordEncoder())
                .and().build();
    }

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception{
        http.csrf().disable().cors();

        http.authorizeHttpRequests().antMatchers("/auth/**").permitAll()
                .anyRequest().authenticated()
                .and().exceptionHandling().authenticationEntryPoint(jwtEntrypoint)
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);



        return http.build();
    }
}
