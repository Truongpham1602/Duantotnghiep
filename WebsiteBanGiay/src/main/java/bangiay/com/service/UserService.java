package bangiay.com.service;

import bangiay.com.entity.User;

public interface UserService {
	public User save(User user);
	
	public void delete(long id);
}
