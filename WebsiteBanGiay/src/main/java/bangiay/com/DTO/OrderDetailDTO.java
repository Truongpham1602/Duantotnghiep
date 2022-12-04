package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO {
	private Integer id;
	private Integer orderId;
	private Integer voucherId;
	private String code;
	private Integer sizeId;
	private Integer quantity;
	private Double price;

}
