package bangiay.com.dao;

import bangiay.com.entity.Size;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface SizeDao extends JpaRepository<Size, Integer> {
	@Query("select o from Size o where o.product.id=?1")
	List<Size> findSizeByProduct_id(Integer product_id);
}
