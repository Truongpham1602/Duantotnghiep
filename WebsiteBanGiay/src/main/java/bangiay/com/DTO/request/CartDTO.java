package bangiay.com.DTO.request;

import java.util.List;

import lombok.Data;

@Data
public class CartDTO {
	private Integer id;
	private Integer quantity;
	private Integer user_id;
	private Integer size_id;
	private String creator;
	private String modifier;
	private Integer status;
	private Double price;
	private List<CartDTO> lstCartNoUser;
}
