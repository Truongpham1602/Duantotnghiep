package bangiay.com.DTO;

import lombok.Data;

@Data
public class BillDetailDTO {
    private Integer id;
    private Integer billId;
    private Integer productId;
    private Integer  VoucherId;
    private Double quantity;
    private Double price;
    private String discount;

}
