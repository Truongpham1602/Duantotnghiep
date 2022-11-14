package bangiay.com.dao;

import bangiay.com.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import bangiay.com.entity.User;

import java.util.List;


@Repository
public interface UserDao extends JpaRepository<User, Integer>{
    User findByFullName(String fullname);
    List<User> getUserByRole(Role role);

}