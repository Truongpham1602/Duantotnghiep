package bangiay.com.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bangiay.com.dao.RoleDao;
import bangiay.com.entity.Role;
import bangiay.com.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService{
	@Autowired
	RoleDao roleDAO;
	@Override
	public Role create(Role role) {
		return roleDAO.save(role);
	}
	@Override
	public Role update(Role role,Long id) {
		Role r = roleDAO.findById(id).orElseThrow();
		r.setRoleName(role.getRoleName());
		return roleDAO.save(r);
	}
	@Override
	public void delete (Long  id) {
		roleDAO.delete(roleDAO.findById(id).get());
	}
	@Override
	public Role findById(Long id)throws Exception {
		return roleDAO.findById(id).orElseThrow(()->new Exception("Role is not exists" + id));
	}
	@Override
	public List<Role> findAll(){
		return roleDAO.findAll();
	}
	@Override
	public Role findByName(String name) {
		for(Role r : roleDAO.findAll())
			if(r.getRoleName().equals(name))
				return r;
		return null;
	}
}
