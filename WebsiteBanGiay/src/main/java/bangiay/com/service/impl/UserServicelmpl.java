package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import bangiay.com.utils.ObjectMapperUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import bangiay.com.DTO.UserDTO;
import bangiay.com.dao.RoleDao;
import bangiay.com.dao.UserDao;
import bangiay.com.entity.User;
import bangiay.com.service.UserService;

@Service
public class UserServicelmpl implements UserService {
	@Autowired
	private UserDao userDao;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private RoleDao roleDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<UserDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(userDao.findAll(pageable), UserDTO.class);
	}
	//		List<User> user = userDao.findAll();
//
//		List<UserDTO> result = user.stream().map(d -> modelMapper.map(d,UserDTO.class)).collect(Collectors.toList());
//		for (int i = 0; i < user.size(); i++) {
//			result.get(i).setNameRole(user.get(i).getRole().getRoleName());
//		}
//
//		return result;
	@Override
	public UserDTO create(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);

		user.setRole(this.roleDao.findById(1).get());
		user.setCreated(Timestamp.from(Instant.now()));
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
		userDTO.setNameRole(user.getRole().getRoleName());
		return userDTO;
	}

	@Override
	public UserDTO update(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		user.setRole(this.roleDao.findById(1).get());
		user.setCreated(user.getCreated());
		user.setModified(Timestamp.from(Instant.now()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
		userDTO.setNameRole(user.getRole().getRoleName());
		return userDTO;
	}

	@Override
	public UserDTO finById(int id) {
		User user = userDao.findById(id).get();
		UserDTO userDTO = modelMapper.map(user, UserDTO.class);
		return userDTO;
	}

	@Override
	public void delete(int id) {
		userDao.deleteById(id);
	}

	@Override
	public User findByUsername(String username) {
		return null;
//		return userDao.findByUsername(username);
	}

}
