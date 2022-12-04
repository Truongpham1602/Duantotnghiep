package bangiay.com.service.impl;

import java.util.List;

import bangiay.com.DTO.RoleDTO;
import bangiay.com.utils.ObjectMapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import bangiay.com.dao.RoleDao;
import bangiay.com.entity.Role;
import bangiay.com.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	RoleDao roleDAO;

	@Override
	public Role create(Role role) {
		return roleDAO.save(role);
	}

	@Override
	public Role update(Role role, Integer id) {
		Role r = roleDAO.findById(id).get();
		r.setRoleName(role.getRoleName());
		return roleDAO.save(r);
	}

	@Override
	public void delete(Integer id) {
		roleDAO.delete(roleDAO.findById(id).get());
	}

	@Override
	public Role findById(Integer id) throws Exception {
		return roleDAO.findById(id).orElseThrow(() -> new Exception("Role is not exists" + id));
	}

	@Override
	public List<Role> findAll() {
		return roleDAO.findAll();
	}
	@Override
	public Page<RoleDTO> findAll(Pageable pageable) {

		return ObjectMapperUtils.mapEntityPageIntoDtoPage(roleDAO.findAll(pageable), RoleDTO.class);
	}

	@Override
	public Role findByName(String name) {
		for (Role r : roleDAO.findAll())
			if (r.getRoleName().equals(name))
				return r;
		return null;
	}

	@Override

	public List<Role> createAll(List<Role> role) {


		return roleDAO.saveAll(role);
	}
}
