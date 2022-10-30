package bangiay.com.service;

import java.util.List;

import bangiay.com.entity.Role;

public interface RoleService {
Role create(Role role);
Role update(Role role,Long id);
void delete(Long id);
Role findById(Long id)throws Exception;
List<Role> findAll();
Role findByName(String name);
}
