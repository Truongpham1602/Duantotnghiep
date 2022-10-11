package bangiay.com.service.impl;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;

@Service
@Transactional
public class CustomUserDetailsServiceimpl implements UserDetailsService{
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {
		User user = userDao.getUserByEmailOrTelePhone(account);
		if (user == null) {
			throw new UsernameNotFoundException("No User Found");
		}
		return new org.springframework.security.core.userdetails.User(
			user.getEmail(), user.getPassword(), false, false, false, false, null
				);
	}
}
