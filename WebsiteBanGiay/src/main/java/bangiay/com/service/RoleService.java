package bangiay.com.service;

import java.util.List;

import bangiay.com.DTO.RoleDTO;
import bangiay.com.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleService {

	Role create(Role role);

	Role update(Role role, Integer id);

	void delete(Integer id);

	Role findById(Integer id) throws Exception;

	List<Role> findAll();
	Page<RoleDTO> findAll(Pageable pageable);

	Role findByName(String name);

	List<Role> createAll(List<Role> role);

}
