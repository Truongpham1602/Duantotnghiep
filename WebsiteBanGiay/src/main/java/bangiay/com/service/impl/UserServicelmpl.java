package bangiay.com.service.impl;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;
import bangiay.com.service.UserService;


@Service
public class UserServicelmpl implements UserService{
	@Autowired
	private UserDao userDao;

	@Override
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	public void delete(long id) {
		userDao.deleteById(id);
	}
	


}
