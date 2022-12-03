package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.UserDTO;
import bangiay.com.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

	Page<UserDTO> findAll(Pageable pageable);
	public UserDTO create(UserDTO userDTO);
	
	public UserDTO update(UserDTO userDTO);
	
	public UserDTO finById(int id);
	
	public void delete(int id);
	User findByUsername(String username);


}
