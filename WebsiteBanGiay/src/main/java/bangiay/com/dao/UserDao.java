package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.User;

@Repository
public interface UserDao extends JpaRepository<User, String>{

}
