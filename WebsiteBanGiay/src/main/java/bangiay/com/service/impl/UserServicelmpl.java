package bangiay.com.service.impl;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
	private RoleDao roleDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<UserDTO> findAll() {
		List<User> user = userDao.findAll();
		List<UserDTO> result = user.stream().map(d -> modelMapper.map(d,UserDTO.class)).collect(Collectors.toList());
		for (int i = 0; i < user.size(); i++) {
			result.get(i).setNameRole(user.get(i).getRoler().getRoleName());
		}
		return result;
	}

	@Override
	public UserDTO create(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		user.setRoler(this.roleDao.findById(1).get());
		user.setCreated(Timestamp.from(Instant.now()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
		userDTO.setNameRole(user.getRoler().getRoleName());
		return userDTO;
	}

	@Override
	public UserDTO update(UserDTO userDTO) {
		User user = modelMapper.map(userDTO, User.class);
		user.setRoler(this.roleDao.findById(1).get());
		user.setCreated(user.getCreated());
		user.setModified(Timestamp.from(Instant.now()));
		this.userDao.save(user);
		userDTO.setId(user.getId());
		userDTO.setNameRole(user.getRoler().getRoleName());
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

	
}
