package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.UserDTO;
import bangiay.com.entity.User;

public interface UserService {
public List<UserDTO> findAll();
	
	public UserDTO create(UserDTO userDTO);
	
	public UserDTO update(UserDTO userDTO);
	
	public UserDTO finById(int id);
	
	public void delete(int id);
	User findByUsername(String username);


}
