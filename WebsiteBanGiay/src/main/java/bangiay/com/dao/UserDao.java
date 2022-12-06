package bangiay.com.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import bangiay.com.entity.User;




@Repository
public interface UserDao extends JpaRepository<User, Integer>{
//	@Query("SELECT * FROM User u WHERE u.email=?1 OR u.telephone=?1")
//	User getUserByEmailOrTelePhone(String account);
    User findByFullName(String fullname);
    //List<User> getUserByRole(Role role);
    @Query("SELECT u FROM User u WHERE u.status =1")
    Page<User> getPageWhereStatus(Pageable pageable);
    
}