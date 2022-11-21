package bangiay.com.dao;

import bangiay.com.DTO.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import bangiay.com.entity.Product;

import java.util.List;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer>{

	@Query(value ="WITH recursive GET_ALL_PRODUCT_BY_PARENT_ID\r\n"
			+ "AS \r\n"
			+ "(\r\n"
			+ "	SELECT C.ID,C.CREATED,C.CREATOR,C.MODIFIED,C.MODIFIER,C.NAMECATE,C.PAREN_ID FROM CATEGORY C WHERE C.id = ?1\r\n"
			+ "    UNION ALL\r\n"
			+ "    SELECT  C.ID,C.CREATED,C.CREATOR,C.MODIFIED,C.MODIFIER,C.NAMECATE,C.PAREN_ID FROM CATEGORY C INNER JOIN GET_ALL_PRODUCT_BY_PARENT_ID TEMP\r\n"
			+ "    ON TEMP.id = C.paren_id\r\n"
			+ ")SELECT * FROM PRODUCT P  WHERE P.CATEGORY_ID IN (\r\n"
			+ "SELECT ID FROM GET_ALL_PRODUCT_BY_PARENT_ID \r\n"
			+ ")",nativeQuery = true)
	java.util.List<Product> getProductByCategoryParent(Integer id);
	/*
	 * *	Tìm kiếm sản phẩm theo category cha 
	 * * 	Chú Thích :
	 * 			With Recursive : tạo bảng tạm cho 1 câu truy vấn, bảng tạm sẽ bị mất đi sau khi câu truy vấn đc chạy
	 * 			Union ALL : Gộp kết quả truy vấn của 2 câu lệnh, điều kiện : ( 2 câu truy vấn p trả về cùng số hàng, mỗi hàng phải cùng kiểu dữ liệu )
	 * 			Truy vấn phân cấp để lấy category cha và con
	 */

}
