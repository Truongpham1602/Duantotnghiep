package bangiay.com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bangiay.com.dao.UserDao;

@Service
public class AccountService implements UserDetailsService {
	@Autowired
	private UserDao userDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user = userDao.findUserByEmailOrTelePhone(username , username);
//		if (user != null) {
//
//			return org.springframework.security.core.userdetails.User.withUsername(username)
//					.password(user.getPassword()).roles(user.getRole().getRoleName()).build();
//		}
//		throw new UsernameNotFoundException("User not found with the name " + username);
		return null;
	}

}
