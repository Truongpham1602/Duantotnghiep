package bangiay.com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;

@Service
public class AccountService implements UserDetailsService {
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userDao.findByFullName(username);
		if (user != null) {
			return org.springframework.security.core.userdetails.User.withUsername(username)
					.password(user.getPassword()).roles(user.getRoler().getRoleName()).build();
		}
		throw new UsernameNotFoundException("User not found with the name " + username);
	}
}
