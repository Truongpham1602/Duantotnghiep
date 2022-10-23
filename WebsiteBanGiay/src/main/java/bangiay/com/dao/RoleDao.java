package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Role;

@Repository
public interface RoleDao extends JpaRepository<Role, Long>{

}
