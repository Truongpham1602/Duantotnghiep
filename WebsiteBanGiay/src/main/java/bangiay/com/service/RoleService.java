package bangiay.com.service;

import java.util.List;

import bangiay.com.entity.Role;

public interface RoleService {

	Role create(Role role);

	Role update(Role role, Integer id);

	void delete(Integer id);

	Role findById(Integer id) throws Exception;

	List<Role> findAll();

	Role findByName(String name);

	List<Role> createAll(List<Role> role);

}
