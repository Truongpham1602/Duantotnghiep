package bangiay.com.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.ProductDTO;
import bangiay.com.DTO.UserDTO;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.Product;
import bangiay.com.entity.User;
import bangiay.com.service.UserService;

@Service
public class UserServicelmpl implements UserService {
	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<UserDTO> findAll() {
		List<User> user = userDao.findAll();
		List<UserDTO> result = user.stream().map(d -> modelMapper.map(d, UserDTO.class)).collect(Collectors.toList());
		return result;
	}

	@Override
	public UserDTO save(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		this.userDao.save(user);
		return userDTO;
	}

	@Override
	public UserDTO finById(Integer id) {
		User user = userDao.findById(id).get();
		UserDTO userDTO = modelMapper.map(user, UserDTO.class);
		return userDTO;
	}

	@Override
	public void delete(Integer id) {
		userDao.deleteById(id);
	}
}
