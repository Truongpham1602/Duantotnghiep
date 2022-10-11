package bangiay.com;


import java.util.ArrayList;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import bangiay.com.DTO.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig{

	@Bean
    public SecurityFilterChain filterChains(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests().antMatchers("/admin/**").hasRole("ADMIN")
        .antMatchers("/staff/**").hasAnyRole("ADMIN", "STAFF")
        .antMatchers("/**").permitAll()
        .and().formLogin().and().csrf().disable();
        return http.build();
    }
	
	@Bean
	public InMemoryUserDetailsManager configureAuthentication() {
		List<UserDTO> userdto = new ArrayList<UserDTO>();
		List<UserDetails> userDetails = new ArrayList<UserDetails>();
		userdto.add(new UserDTO(1, 2, "123", "AAA", "123456789", null, null, null, null, null, null, null, null));
		userdto.add(new UserDTO(1, 2, "123", "AAA", "987654321", null, null, null, null, null, null, null, null));
		for (UserDTO u : userdto) {
			userDetails.add(User.withUsername(u.getTelephone()).
	        		password("{noop}"+u.getPassword()).roles("zxc").build());
		}
        return new InMemoryUserDetailsManager(userDetails);
	}
	
}
