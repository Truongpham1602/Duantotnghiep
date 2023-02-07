package bangiay.com.DTO;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCancelDTO implements Serializable {
	private Integer id;
	private String reason = "";
	private Integer status;
}
