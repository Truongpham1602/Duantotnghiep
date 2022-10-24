package bangiay.com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.dao.RoleDao;
import bangiay.com.entity.Role;

@Service
public class RoleService {
	@Autowired
	RoleDao roleDAO;
	public Role create(Role role) {
		return roleDAO.save(role);
	}
	public Role update(Role role,Long id) {
		Role r = roleDAO.findById(id).orElseThrow();
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
