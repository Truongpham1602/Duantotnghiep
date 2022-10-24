package bangiay.com.service.impl;


import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public User save(User user) {
		return userDao.save(user);
	}

	@Override
	public void delete(Integer id) {
		userDao.deleteById(id);
	}

	public List<User> findAll() {
		List<User> lstuser = this.userDao.findAll();
		List<User> result = lstuser.stream().map(d -> modelMapper.map(d, User.class)).collect(Collectors.toList());
		return result;
	}
	


}
