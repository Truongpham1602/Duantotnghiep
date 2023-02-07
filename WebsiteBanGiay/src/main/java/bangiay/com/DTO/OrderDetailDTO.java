package bangiay.com.DTO;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDTO implements Serializable {
	private Integer id;
	private Integer orderId;
	private Integer voucherId;
	private Integer sizeId;
	private Integer quantity;
	private Double price;
	private String name_Product;
	private String color_Product;
	private String sizeName;
	private String image;
}
