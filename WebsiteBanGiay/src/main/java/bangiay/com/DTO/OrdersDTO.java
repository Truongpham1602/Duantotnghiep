package bangiay.com.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrdersDTO {
    private Integer id;
    private Integer voucherId;
    private String code;
    private Integer sizeId;
    private Integer userId;
    private Integer quantity;
    private Double price;
    private String nameRecipient;
    private String telephone;
    private String address;
    private java.sql.Timestamp effectFrom;
    private java.sql.Timestamp effectUntil;
    private java.sql.Timestamp created;
    private String creator;
    private java.sql.Timestamp modified;
    private String modifier;
    private Integer status;

}
