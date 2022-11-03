package bangiay.com.DTO.request;

import java.sql.Timestamp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
	private Integer id;
	private Integer quantity;
	private Integer user_id;
	private Integer size_id;
	private Timestamp creator;
	private Timestamp modifier;
	private Integer status;
	private Double price;
}
