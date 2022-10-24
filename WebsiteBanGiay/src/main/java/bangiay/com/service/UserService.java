package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.UserDTO;
import bangiay.com.entity.User;

public interface UserService {
	
	public List<UserDTO> findAll();
	
	public UserDTO save(UserDTO userDTO);
	
	public UserDTO finById(Integer id);
	
	public void delete(Integer id);

}
