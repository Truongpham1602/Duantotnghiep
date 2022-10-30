package bangiay.com.dao;

import bangiay.com.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface BillDao extends JpaRepository<Bill, Integer> {
}
