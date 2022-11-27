package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.UserDTO;
import bangiay.com.DTO.VoucherDTO;

public interface UserService {
public List<UserDTO> findAll();
	
	public UserDTO create(UserDTO userDTO);
	
	public UserDTO update(UserDTO userDTO);
	
	public UserDTO setStatusUser(Integer id);
	
	public UserDTO finById(int id);
	
	public void delete(int id);
}
