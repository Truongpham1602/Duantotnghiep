package bangiay.com.dao;

import bangiay.com.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface SizeDao extends JpaRepository<Size, Integer> {
}
