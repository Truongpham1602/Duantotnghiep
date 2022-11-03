package bangiay.com.dao;

import bangiay.com.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaDao extends JpaRepository<Media, Integer> {
}
