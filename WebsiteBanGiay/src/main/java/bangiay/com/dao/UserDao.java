package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import bangiay.com.entity.User;




@Repository
public interface UserDao extends JpaRepository<User, Long>{
//	@Query("SELECT * FROM User u WHERE u.email=?1 OR u.telephone=?1")
//	User getUserByEmailOrTelePhone(String account);
}