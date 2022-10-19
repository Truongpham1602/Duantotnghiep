package bangiay.com.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import bangiay.com.entity.BillDetail;
import bangiay.com.entity.Product;

@Repository
public interface Bill_Detail_Dao extends JpaRepository<BillDetail, Long>{
//	@Query(value="SELECT b FROM billdetail b desc")
//	public List<Product> GetProductDESC();
}
