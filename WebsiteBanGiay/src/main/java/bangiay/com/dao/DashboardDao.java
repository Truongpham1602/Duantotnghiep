package bangiay.com.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.User;

@Repository

public interface DashboardDao extends CrudRepository<User, Integer> {
//	@Query("SELECT COUNT(1) FROM USER")
//	long ();
	@Query("SELECT COUNT(u) FROM User u")
	long countUser();

}
