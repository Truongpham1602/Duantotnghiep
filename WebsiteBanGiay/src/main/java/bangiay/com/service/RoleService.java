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
@Service
public class RoleService {
	@Autowired
	RoleDao roleDAO;
	public Role create(Role role) {
		return roleDAO.save(role);
	}
	public Role update(Role role,Long id) {
		Role r = roleDAO.findById(id).orElse(null);
		r.setRoleName(role.getRoleName());
		return roleDAO.save(r);
	}
	public void delete (Long  id) {
		roleDAO.delete(roleDAO.findById(id).get());
	}
	public Role findById(Long id)throws Exception {
		return roleDAO.findById(id).orElseThrow(()->new Exception("Role is not exists" + id));
	}
	public List<Role> findAll(){
		return roleDAO.findAll();
	}
	public Role findByName(String name) {
		for(Role r : roleDAO.findAll())
			if(r.getRoleName().equals(name))
				return r;
		return null;
	}
}
