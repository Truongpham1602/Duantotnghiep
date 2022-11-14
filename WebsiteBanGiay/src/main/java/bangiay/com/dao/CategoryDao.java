package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer>{
	@Query(value = "WITH RECURSIVE category_temp_table \r\n"
			+ " as \r\n"
			+ " (\r\n"
			+ " SELECT c.id,c.created,c.creator,c.modified,c.modifier,c.namecate,c.paren_id\r\n"
			+ "	FROM category c \r\n"
			+ "    Where c.paren_id = ?1 \r\n"
			+ "UNION ALL\r\n"
			+ "SELECT c.id,c.created,c.creator,c.modified,c.modifier,c.namecate,c.paren_id\r\n"
			+ "	FROM category c \r\n"
			+ "    INNER JOIN category_temp_table temp on temp.id=c.paren_id\r\n"
			+ " )\r\n"
			+ " select * from category_temp_table;",nativeQuery = true)
	List<Category> findAllByParentId(Integer id);
	
}
