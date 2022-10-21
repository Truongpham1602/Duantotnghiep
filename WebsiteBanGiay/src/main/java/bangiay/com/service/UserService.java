package bangiay.com.service;

import java.util.List;

import bangiay.com.entity.User;

public interface UserService {
	
	public List<User> findAll();
	
	public User save(User user);
	
	public void delete(long id);
}
