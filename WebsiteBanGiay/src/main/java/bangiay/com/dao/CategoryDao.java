package bangiay.com.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Category;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer>{

}
