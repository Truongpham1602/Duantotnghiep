package bangiay.com.dao;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ', p.created, ' ', p.creator, ' ', p.modified, ' ', p.modifier, '') LIKE %?1% and p.status =1 AND p.quantity > 0")
	public List<Product> search(String keyword, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.status =1 AND p.quantity > 0")
	public List<Product> findByStatus();

	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ') LIKE %?1% and p.category.id = ?2 and p.status =1 AND p.quantity > 0")
	public List<Product> searchClient(String keyword, Integer cate_Id, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.name = ?1 and p.status =1 AND p.quantity > 0")
	public List<Product> findByName(String name);

	@Query("SELECT p FROM Product p WHERE p.name=?1 and p.color=?2 and p.status =1 AND p.quantity > 0")
	public Product findByColorAndName(String name, String color);

	@Query("SELECT p FROM Product p WHERE concat_ws(p.category.namecate, ' ', p.color, ' ', p.name, ' ', "
			+ "p.price, ' ', p.quantity, ' ', p.description, ' ') LIKE %?1% and p.status =1 AND p.quantity > 0")
	public List<Product> searchClient(String keyword, Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.status =1")
	Page<Product> findPageWhereStatus(Pageable pageable);

	@Query(value = "SELECT * FROM `product` p WHERE p.status =1 AND p.quantity > 0 order by CREATED desc limit 5", nativeQuery = true)
	List<Product> findTop5New();

	@Query(value = "SELECT p.*, count(p.ID) FROM bill_detail b join size s on b.SIZE_ID = s.ID join product p on p.ID = s.PRODUCT_ID WHERE p.status =1 AND P.quantity > 0 group by p.ID order by count(p.ID) desc limit 3", nativeQuery = true)
	List<Product> findTop3Bill();

	// Count all product
	@Query("SELECT COUNT(p) FROM Product p")
	long countAllProduct();

	@Query(value = "SELECT p.ID, p.NAME, d.ORDER_QUANTITY, d.TOTAL, (SELECT url FROM media WHERE PRODUCT_ID = p.ID LIMIT 1) as image FROM product p LEFT JOIN size s ON p.ID = s.PRODUCT_ID LEFT JOIN ("
			+ "SELECT od.SIZE_ID,SUM(od.QUANTITY) as ORDER_QUANTITY, SUM(od.QUANTITY*od.PRICE) as TOTAL FROM order_detail od, orders o WHERE o.status = 4 AND od.ORDER_ID = o.id "
			+ ") as d ON s.ID = d.SIZE_ID" + " ORDER BY d.TOTAL DESC", nativeQuery = true)
	List<Map<String, Object>> getListProductOrderByRevenue();
}
