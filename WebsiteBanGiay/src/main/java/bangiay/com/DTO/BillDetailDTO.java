package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDetailDTO {
    private Integer id;
    private Integer billId;
    private Integer sizeId;
    private Integer voucherId;
    private Integer quantity;
    private Double price;
}
